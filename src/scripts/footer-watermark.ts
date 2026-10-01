const FONT_FAMILY = "Geist Sans, system-ui, sans-serif";
const FONT_WEIGHT = 800;
const LETTER_SPACING_EM = -0.04;
const TARGET_WIDTH_RATIO = 0.99;
const PADDING_TOP = 2;
const PADDING_BOTTOM = 2;
const DOT_TILE_SIZE = 10;
const DOT_RADIUS = 1;
const POINTER_OPACITY_PEAK = 0.4;
const DEFAULT_WATERMARK_COLOR = "rgba(10, 10, 10, 0.4)";
/** Hover falloff floor (glyph dots stay visible; only shimmers on pointer). */
const POINTER_OPACITY_FLOOR_RATIO = 0.85;
const OPACITIES = [0, 0, 0.01, 0.02, 0.03, 0.05, 0.07, 0.1, 0.13, 0.17] as const;
const FONT_PROBE_SIZE = 48;
const FONT_PROBE_SPEC = `${FONT_WEIGHT} ${FONT_PROBE_SIZE}px ${FONT_FAMILY}`;

type LineMetrics = {
  ascent: number;
  descent: number;
};

type TextLayout = {
  y: number;
  metrics: LineMetrics;
};

type ViewportPointer = { x: number; y: number } | null;

let bandPointer: ViewportPointer = null;
let watermarkPeakOpacity = POINTER_OPACITY_PEAK;

function dotOpacityAtViewport(
  viewportX: number,
  viewportY: number,
  pointer: ViewportPointer,
): number {
  // GhostText fill is rgba(10,10,10,0.4) at rest — not page-grid BASE (0.05).
  if (!pointer) {
    return watermarkPeakOpacity;
  }
  const distance = Math.hypot(viewportX - pointer.x, viewportY - pointer.y);
  const index = Math.min(OPACITIES.length - 1, Math.floor(distance / DOT_TILE_SIZE));
  const ladder = OPACITIES[index] ?? 0.05;
  const floor = watermarkPeakOpacity * POINTER_OPACITY_FLOOR_RATIO;
  return Math.min(watermarkPeakOpacity, Math.max(floor, ladder * 2.5));
}

function createBandDotPattern(
  ctx: CanvasRenderingContext2D,
  cssWidth: number,
  cssHeight: number,
  bandRect: DOMRect,
  pointer: ViewportPointer,
): CanvasPattern | null {
  const tile = document.createElement("canvas");
  tile.width = Math.max(1, Math.ceil(cssWidth));
  tile.height = Math.max(1, Math.ceil(cssHeight));
  const tileCtx = tile.getContext("2d");
  if (!tileCtx) return null;

  const offsetX = ((bandRect.left % DOT_TILE_SIZE) + DOT_TILE_SIZE) % DOT_TILE_SIZE;
  const offsetY = ((bandRect.top % DOT_TILE_SIZE) + DOT_TILE_SIZE) % DOT_TILE_SIZE;

  for (let y = -DOT_TILE_SIZE; y <= tile.height + DOT_TILE_SIZE; y += DOT_TILE_SIZE) {
    for (let x = -DOT_TILE_SIZE; x <= tile.width + DOT_TILE_SIZE; x += DOT_TILE_SIZE) {
      const dotX = x + offsetX;
      const dotY = y + offsetY;
      const viewportX = bandRect.left + dotX;
      const viewportY = bandRect.top + dotY;
      const opacity = dotOpacityAtViewport(viewportX, viewportY, pointer);

      tileCtx.fillStyle = `rgba(10, 10, 10, ${opacity})`;
      tileCtx.beginPath();
      tileCtx.arc(dotX, dotY, DOT_RADIUS, 0, Math.PI * 2);
      tileCtx.fill();
    }
  }

  return ctx.createPattern(tile, "no-repeat");
}

function applyFont(ctx: CanvasRenderingContext2D, fontSize: number): void {
  ctx.font = `${FONT_WEIGHT} ${fontSize}px ${FONT_FAMILY}`;
  ctx.letterSpacing = `${LETTER_SPACING_EM}em`;
}

function textWidth(ctx: CanvasRenderingContext2D, text: string): number {
  return ctx.measureText(text).width;
}

function finiteMetric(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

function measureLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
): LineMetrics {
  applyFont(ctx, fontSize);
  const m = ctx.measureText(text);
  return {
    ascent: Math.max(
      finiteMetric(m.fontBoundingBoxAscent),
      finiteMetric(m.actualBoundingBoxAscent),
      fontSize * 0.78,
    ),
    descent: Math.max(
      finiteMetric(m.fontBoundingBoxDescent),
      finiteMetric(m.actualBoundingBoxDescent),
      fontSize * 0.22,
    ),
  };
}

function resolveWatermarkText(canvas: HTMLCanvasElement): string | null {
  const text = canvas.dataset.text?.trim();
  return text || null;
}

function resolveWatermarkPeakAlpha(canvas: HTMLCanvasElement): number {
  const raw = canvas.dataset.color?.trim() || DEFAULT_WATERMARK_COLOR;
  const match = raw.match(/rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/i);
  if (match) {
    const alpha = Number.parseFloat(match[1] ?? "");
    if (Number.isFinite(alpha)) {
      return alpha;
    }
  }
  return POINTER_OPACITY_PEAK;
}

/** Single-row baseline, locked to band bottom (full glyph must fit above). */
function textPosition(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  cssHeight: number,
): TextLayout {
  const metrics = measureLine(ctx, text, fontSize);
  const { descent } = metrics;
  const y = cssHeight - PADDING_BOTTOM - descent;

  return { y, metrics };
}

function fitsWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  cssWidth: number,
): boolean {
  applyFont(ctx, fontSize);
  return textWidth(ctx, text) <= cssWidth * TARGET_WIDTH_RATIO;
}

function fitsHeightBottomFullGlyph(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  cssHeight: number,
): boolean {
  const { y, metrics } = textPosition(ctx, text, fontSize, cssHeight);
  const { ascent, descent } = metrics;

  const lineTop = y - ascent;
  const lineBottom = y + descent;

  if (lineTop < PADDING_TOP) {
    return false;
  }

  if (lineBottom > cssHeight - PADDING_BOTTOM + 0.5) {
    return false;
  }

  return true;
}

function fitFontSizeForWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  cssWidth: number,
): number {
  let lo = 8;
  let hi = 800;

  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (fitsWidth(ctx, text, mid, cssWidth)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  let size = Math.floor(lo);
  while (size > 8 && !fitsWidth(ctx, text, size, cssWidth)) {
    size -= 1;
  }

  return size;
}

function fitFontSizeForHeightBottom(
  ctx: CanvasRenderingContext2D,
  text: string,
  cssHeight: number,
): number {
  let lo = 8;
  let hi = 800;

  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (fitsHeightBottomFullGlyph(ctx, text, mid, cssHeight)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  let size = Math.floor(lo);
  while (size > 8 && !fitsHeightBottomFullGlyph(ctx, text, size, cssHeight)) {
    size -= 1;
  }

  return size;
}

function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  cssWidth: number,
  cssHeight: number,
): number {
  const byWidth = fitFontSizeForWidth(ctx, text, cssWidth);
  const byHeight = fitFontSizeForHeightBottom(ctx, text, cssHeight);
  return Math.min(byWidth, byHeight);
}

function syncTextStyle(
  from: CanvasRenderingContext2D,
  to: CanvasRenderingContext2D,
): void {
  to.font = from.font;
  to.letterSpacing = from.letterSpacing;
  to.textAlign = from.textAlign;
  to.textBaseline = from.textBaseline;
}

function fontsReadyForDraw(): boolean {
  if (document.fonts.check(FONT_PROBE_SPEC)) {
    return true;
  }
  return document.fonts.status === "loaded";
}

/** y is alphabetic baseline (see textPosition). */
function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  pattern: CanvasPattern | null,
  cssWidth: number,
  cssHeight: number,
  halftoneLayer: HTMLCanvasElement,
): void {
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  if (pattern) {
    const layerCtx = halftoneLayer.getContext("2d");
    if (layerCtx) {
      layerCtx.setTransform(1, 0, 0, 1, 0, 0);
      layerCtx.clearRect(0, 0, cssWidth, cssHeight);
      syncTextStyle(ctx, layerCtx);
      layerCtx.fillStyle = "#000";
      layerCtx.fillText(text, x, y);
      layerCtx.globalCompositeOperation = "source-in";
      layerCtx.fillStyle = pattern;
      layerCtx.fillRect(0, 0, cssWidth, cssHeight);
      layerCtx.globalCompositeOperation = "source-over";
      ctx.drawImage(halftoneLayer, 0, 0);
    }
  }
}

function drawWatermark(canvas: HTMLCanvasElement): void {
  const text = resolveWatermarkText(canvas);
  const band = canvas.closest<HTMLElement>(".site-footer__watermark-band");
  if (!text || !band) return;

  const cssWidth = band.clientWidth;
  const cssHeight = band.clientHeight;
  if (cssWidth <= 0 || cssHeight <= 0) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(cssWidth * dpr);
  canvas.height = Math.round(cssHeight * dpr);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  if (!fontsReadyForDraw()) {
    return;
  }

  const fontSize = fitFontSize(ctx, text, cssWidth, cssHeight);
  applyFont(ctx, fontSize);

  const { y } = textPosition(ctx, text, fontSize, cssHeight);
  const x = cssWidth / 2;
  const bandRect = band.getBoundingClientRect();
  const pattern = createBandDotPattern(ctx, cssWidth, cssHeight, bandRect, bandPointer);

  const halftoneLayer = document.createElement("canvas");
  halftoneLayer.width = Math.max(1, Math.ceil(cssWidth));
  halftoneLayer.height = Math.max(1, Math.ceil(cssHeight));

  drawText(ctx, text, x, y, pattern, cssWidth, cssHeight, halftoneLayer);
}

async function ensureFonts(): Promise<void> {
  try {
    await document.fonts.load(FONT_PROBE_SPEC);
    await document.fonts.ready;
  } catch {
    /* use fallback metrics */
  }
}

export function initFooterWatermark(): void {
  const canvas = document.querySelector<HTMLCanvasElement>(".site-footer__watermark-canvas");
  if (!canvas || canvas.dataset.watermarkInit === "true") return;

  canvas.dataset.watermarkInit = "true";
  const band = canvas.closest<HTMLElement>(".site-footer__watermark-band");
  if (!band) return;

  watermarkPeakOpacity = resolveWatermarkPeakAlpha(canvas);

  let frame = 0;
  const scheduleDraw = (): void => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      void ensureFonts().then(() => drawWatermark(canvas));
    });
  };

  scheduleDraw();

  document.fonts.addEventListener("loadingdone", scheduleDraw);

  const observer = new ResizeObserver(scheduleDraw);
  observer.observe(band);
  window.addEventListener("resize", scheduleDraw, { passive: true });
  window.addEventListener("scroll", scheduleDraw, { passive: true });

  const onPointerMove = (event: PointerEvent): void => {
    bandPointer = { x: event.clientX, y: event.clientY };
    scheduleDraw();
  };

  const onPointerLeave = (): void => {
    bandPointer = null;
    scheduleDraw();
  };

  band.addEventListener("pointermove", onPointerMove, { passive: true });
  band.addEventListener("pointerleave", onPointerLeave, { passive: true });
}
