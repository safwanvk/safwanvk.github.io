import { initDotGridCanvas } from "./dot-grid-canvas";
import { initFooterWatermark } from "./footer-watermark";

function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  const onScroll = (): void => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function getHeaderProbeY(header: HTMLElement): number {
  const rect = header.getBoundingClientRect();
  return rect.bottom - 1;
}

function getHeaderStackHeight(): number {
  const bar = document.querySelector<HTMLElement>(".availability-bar");
  const header = document.querySelector<HTMLElement>(".site-header");
  let height = 0;
  if (bar) {
    height += bar.getBoundingClientRect().height;
  }
  if (header) {
    height += header.getBoundingClientRect().height;
  }
  return height;
}

function initHeaderOnDark(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  const darkSections = document.querySelectorAll<HTMLElement>('[data-section="dark"]');
  if (!header || darkSections.length === 0) return;

  const intersecting = new Set<Element>();
  let observer: IntersectionObserver | undefined;

  const syncHeaderTheme = (): void => {
    header.classList.toggle("site-header--on-dark", intersecting.size > 0);
  };

  const mountObserver = (): void => {
    observer?.disconnect();
    intersecting.clear();

    const topInset = getHeaderStackHeight();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.add(entry.target);
          } else {
            intersecting.delete(entry.target);
          }
        });
        syncHeaderTheme();
      },
      {
        root: null,
        rootMargin: `${-topInset}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    darkSections.forEach((section) => observer?.observe(section));
  };

  mountObserver();
  window.addEventListener("resize", mountObserver, { passive: true });
}

function initNavScrollSpy(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]");
  if (!header || navLinks.length === 0) return;

  const sections = Array.from(navLinks)
    .map((link) => {
      const id = link.getAttribute("href")?.replace(/^#/, "");
      if (!id) return null;
      const el = document.getElementById(id);
      return el ? { link, el } : null;
    })
    .filter((entry): entry is { link: HTMLAnchorElement; el: HTMLElement } => entry !== null);

  const update = (): void => {
    const probeY = getHeaderProbeY(header);
    let activeHref: string | null = null;

    sections.forEach(({ link, el }) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= probeY && rect.bottom >= probeY) {
        activeHref = link.getAttribute("href");
      }
    });

    navLinks.forEach((link) => {
      link.removeAttribute("aria-current");
      if (activeHref && link.getAttribute("href") === activeHref) {
        link.setAttribute("aria-current", "page");
      }
    });
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
}

function initMobileNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-mobile-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function bindProcessVideoReady(video: HTMLVideoElement): void {
  const layer = video.closest<HTMLElement>("[data-process-layer]");
  if (!layer) return;

  const markMp4 = (): void => {
    layer.classList.add("has-mp4");
  };

  video.addEventListener("loadeddata", markMp4, { once: true });
  video.addEventListener("canplay", markMp4, { once: true });
  video.addEventListener("error", () => {
    layer.classList.remove("has-mp4");
  });
}

function playProcessLayer(layer: HTMLElement | null): void {
  if (!layer || prefersReducedMotion()) return;
  const video = layer.querySelector<HTMLVideoElement>("[data-process-video]");
  if (video && layer.classList.contains("has-mp4")) {
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }
}

function pauseProcessLayer(layer: HTMLElement): void {
  const video = layer.querySelector<HTMLVideoElement>("[data-process-video]");
  if (!video) return;
  video.pause();
}

function initProcessSteps(): void {
  const root = document.querySelector<HTMLElement>("[data-process-root]");
  if (!root) return;

  const steps = root.querySelectorAll<HTMLButtonElement>("[data-process-step]");
  const desktopMock = root.querySelector<HTMLElement>(".process-mock--desktop");
  const layers = desktopMock
    ? desktopMock.querySelectorAll<HTMLElement>("[data-process-layer]")
    : [];
  const captionNodes = root.querySelectorAll<HTMLElement>("[data-process-caption]");

  root.querySelectorAll<HTMLVideoElement>("[data-process-video]").forEach((video) => {
    bindProcessVideoReady(video);
    if (prefersReducedMotion()) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  });

  const activate = (index: number): void => {
    steps.forEach((step, i) => {
      const active = i === index;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-selected", String(active));

      const mobileLayer = step.querySelector<HTMLElement>("[data-process-layer]");
      if (mobileLayer) {
        mobileLayer.classList.toggle("is-active", active);
        if (active) {
          playProcessLayer(mobileLayer);
        } else {
          pauseProcessLayer(mobileLayer);
        }
      }
    });

    layers.forEach((layer, i) => {
      const active = i === index;
      layer.classList.toggle("is-active", active);
      if (active) {
        playProcessLayer(layer);
      } else {
        pauseProcessLayer(layer);
      }
    });

    captionNodes.forEach((node, i) => {
      const visible = i === index;
      node.classList.toggle("is-visible", visible);
      node.setAttribute("aria-hidden", String(!visible));
    });
  };

  steps.forEach((step, index) => {
    step.addEventListener("click", () => activate(index));
    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(index);
      }
    });
  });

  const activeLayer = desktopMock?.querySelector<HTMLElement>(".process-mock__layer.is-active");
  playProcessLayer(activeLayer ?? null);
}

function closeAccordionItem(item: HTMLElement, root: HTMLElement): void {
  item.classList.remove("is-open");
  const trigger = item.querySelector<HTMLButtonElement>("[data-accordion-trigger]");
  if (trigger) {
    trigger.setAttribute("aria-expanded", "false");
  }
  const usesGlyph = root.classList.contains("accordion--dark");
  if (!usesGlyph) {
    const icon = item.querySelector<HTMLElement>(".accordion-trigger__icon");
    if (icon) {
      icon.textContent = "+";
    }
  }
}

function initAccordion(): void {
  document.querySelectorAll<HTMLElement>("[data-accordion-root]").forEach((root) => {
    const items = root.querySelectorAll<HTMLElement>("[data-accordion-item]");

    const usesGlyph = root.classList.contains("accordion--dark");

    items.forEach((item) => {
      const trigger = item.querySelector<HTMLButtonElement>("[data-accordion-trigger]");
      const icon = item.querySelector<HTMLElement>(".accordion-trigger__icon");
      if (!trigger) return;

      trigger.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");

        if (willOpen) {
          items.forEach((other) => {
            if (other !== item) {
              closeAccordionItem(other, root);
            }
          });
        }

        item.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
        if (!usesGlyph && icon) {
          icon.textContent = willOpen ? "−" : "+";
        }
      });
    });
  });
}

export function initSite(): void {
  initHeaderScroll();
  initHeaderOnDark();
  initNavScrollSpy();
  initMobileNav();
  initProcessSteps();
  initAccordion();
  initDotGridCanvas();
  initFooterWatermark();
}

initSite();
