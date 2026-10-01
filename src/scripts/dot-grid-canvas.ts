const TOTAL_SIZE = 10;
const DOT_RADIUS = 1;
const COLOR: readonly [number, number, number] = [10, 10, 10];
const OPACITIES = [0, 0, 0.01, 0.02, 0.03, 0.05, 0.07, 0.1, 0.13, 0.17] as const;
const BASE_OPACITY = 0.05;

type Pointer = { x: number; y: number } | null;

function opacityAtDistance(distance: number, interactive: boolean): number {
  if (!interactive) {
    return BASE_OPACITY;
  }
  const index = Math.min(OPACITIES.length - 1, Math.floor(distance / TOTAL_SIZE));
  return OPACITIES[index] ?? BASE_OPACITY;
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number,
  pointer: Pointer,
  interactive: boolean,
): void {
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  for (let y = 0; y <= cssHeight + TOTAL_SIZE; y += TOTAL_SIZE) {
    for (let x = 0; x <= cssWidth + TOTAL_SIZE; x += TOTAL_SIZE) {
      let opacity = BASE_OPACITY;
      if (pointer) {
        const distance = Math.hypot(x - pointer.x, y - pointer.y);
        opacity = opacityAtDistance(distance, interactive);
      } else if (interactive) {
        opacity = BASE_OPACITY;
      }

      if (opacity <= 0) continue;

      ctx.fillStyle = `rgba(${COLOR[0]}, ${COLOR[1]}, ${COLOR[2]}, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function initDotGridCanvas(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(".dot-grid__canvas");
  if (!canvas || canvas.dataset.dotGridInit === "true") return;

  canvas.dataset.dotGridInit = "true";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const interactive = !reducedMotion;

  let pointer: Pointer = null;
  let frame = 0;

  const scheduleDraw = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  };

  const draw = (): void => {
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;
    if (cssWidth <= 0 || cssHeight <= 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawGrid(ctx, cssWidth, cssHeight, pointer, interactive);
  };

  scheduleDraw();

  window.addEventListener("resize", scheduleDraw, { passive: true });

  if (interactive) {
    window.addEventListener(
      "pointermove",
      (event) => {
        pointer = { x: event.clientX, y: event.clientY };
        scheduleDraw();
      },
      { passive: true },
    );

    window.addEventListener(
      "pointerleave",
      () => {
        pointer = null;
        scheduleDraw();
      },
      { passive: true },
    );
  }
}
