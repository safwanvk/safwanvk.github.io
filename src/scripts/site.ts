function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  if (!header) return;

  const onScroll = (): void => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
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

function initSkillsTabs(): void {
  const root = document.querySelector<HTMLElement>("[data-skills-tabs]");
  if (!root) return;

  const tabs = root.querySelectorAll<HTMLButtonElement>("[role='tab']");
  const panels = root.querySelectorAll<HTMLElement>("[role='tabpanel']");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.getAttribute("data-tab");
      if (!id) return;

      tabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      panels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === `panel-${id}`);
      });
    });
  });
}

function initAccordion(): void {
  document.querySelectorAll<HTMLElement>("[data-accordion-item]").forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>("[data-accordion-trigger]");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

export function initSite(): void {
  initHeaderScroll();
  initMobileNav();
  initSkillsTabs();
  initAccordion();
}

initSite();
