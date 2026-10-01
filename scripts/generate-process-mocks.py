#!/usr/bin/env python3
"""Generate generic SaaS UI mock PNGs + JPG posters for the Process section (16:9)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "img" / "process"

W, H = 1280, 720
M = 24
R = 16

BG = "#f0f0f0"
SURFACE = "#ffffff"
INK = "#0a0a0a"
MUTED = "#737373"
LINE = "#e5e5e5"
PRIMARY = "#0a0a0a"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if Path(path).is_file():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def rounded_rect(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int, int, int],
    radius: int,
    fill: str,
    outline: str | None = None,
) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=1 if outline else 0)


def draw_window_chrome(draw: ImageDraw.ImageDraw, inner: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = inner
    rounded_rect(draw, (x0, y0, x1, y1), R, SURFACE, LINE)
    bar_h = 48
    draw.line((x0, y0 + bar_h, x1, y0 + bar_h), fill=LINE, width=1)
    for i, dot in enumerate(["#ff5f57", "#febc2e", "#28c840"]):
        cx = x0 + 20 + i * 18
        cy = y0 + bar_h // 2
        draw.ellipse((cx - 5, cy - 5, cx + 5, cy + 5), fill=dot)


def content_box() -> tuple[int, int, int, int]:
    return (M, M, W - M, H - M)


def mock_dashboard() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    outer = content_box()
    draw_window_chrome(draw, outer)
    x0, y0, x1, y1 = outer
    y0 += 48

    draw.text((x0 + 24, y0 + 20), "Good afternoon, Alex", fill=INK, font=load_font(32, bold=True))
    draw.text((x0 + 24, y0 + 62), "Here is what is happening in your workspace today.", fill=MUTED, font=load_font(17))

    cards_top = y0 + 108
    card_h = 96
    gap = 16
    inner_w = x1 - x0 - 48
    card_w = (inner_w - 2 * gap) // 3
    stats = [("Active users", "2,847"), ("Sessions", "18.2k"), ("Uptime", "99.9%")]
    for i, (label, value) in enumerate(stats):
        cx = x0 + 24 + i * (card_w + gap)
        rounded_rect(draw, (cx, cards_top, cx + card_w, cards_top + card_h), 12, BG, LINE)
        draw.text((cx + 16, cards_top + 14), label, fill=MUTED, font=load_font(14))
        draw.text((cx + 16, cards_top + 38), value, fill=INK, font=load_font(26, bold=True))

    list_top = cards_top + card_h + 24
    rounded_rect(draw, (x0 + 24, list_top, x1 - 24, y1 - 24), 12, BG, LINE)
    draw.text((x0 + 40, list_top + 16), "Recent activity", fill=INK, font=load_font(18, bold=True))
    for row in range(4):
        ry = list_top + 52 + row * 44
        draw.line((x0 + 40, ry + 36, x1 - 40, ry + 36), fill=LINE, width=1)
        draw.text((x0 + 40, ry + 8), f"Project update · {row + 1}h ago", fill=INK, font=load_font(15))
        draw.text((x1 - 120, ry + 8), "View", fill=MUTED, font=load_font(14))

    return img


def draw_stat_cards(
    draw: ImageDraw.ImageDraw,
    x0: int,
    y0: int,
    x1: int,
    cards_top: int,
    stats: list[tuple[str, str]],
) -> int:
    """Draw a row of three stat cards; returns y below the row."""
    card_h = 96
    gap = 16
    inner_w = x1 - x0 - 48
    card_w = (inner_w - 2 * gap) // 3
    for i, (label, value) in enumerate(stats):
        cx = x0 + 24 + i * (card_w + gap)
        rounded_rect(draw, (cx, cards_top, cx + card_w, cards_top + card_h), 12, BG, LINE)
        draw.text((cx + 16, cards_top + 14), label, fill=MUTED, font=load_font(14))
        draw.text((cx + 16, cards_top + 38), value, fill=INK, font=load_font(26, bold=True))
    return cards_top + card_h


def draw_status_pill(draw: ImageDraw.ImageDraw, x: int, y: int, text: str) -> None:
    font = load_font(12)
    pad_x = 10
    w = len(text) * 7 + pad_x * 2
    rounded_rect(draw, (x, y, x + w, y + 22), 11, BG, LINE)
    draw.text((x + pad_x, y + 4), text, fill=MUTED, font=font)


def mock_review() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    outer = content_box()
    draw_window_chrome(draw, outer)
    x0, y0, x1, y1 = outer
    y0 += 48

    draw.text((x0 + 24, y0 + 20), "Weekly overview", fill=INK, font=load_font(32, bold=True))
    draw.text(
        (x0 + 24, y0 + 62),
        "Track progress across your workspace.",
        fill=MUTED,
        font=load_font(17),
    )

    cards_top = y0 + 108
    stats = [("Tasks done", "128"), ("In review", "14"), ("On track", "92%")]
    after_cards = draw_stat_cards(draw, x0, y0, x1, cards_top, stats)

    mid_top = after_cards + 16
    half_gap = 16
    inner_w = x1 - x0 - 48
    half_w = (inner_w - half_gap) // 2
    for i, (title, sub) in enumerate([("Integrations", "6 connected"), ("Notifications", "3 unread")]):
        cx = x0 + 24 + i * (half_w + half_gap)
        rounded_rect(draw, (cx, mid_top, cx + half_w, mid_top + 72), 12, BG, LINE)
        draw.text((cx + 16, mid_top + 14), title, fill=INK, font=load_font(16, bold=True))
        draw.text((cx + 16, mid_top + 38), sub, fill=MUTED, font=load_font(14))

    list_top = mid_top + 72 + 16
    rounded_rect(draw, (x0 + 24, list_top, x1 - 24, y1 - 72), 12, BG, LINE)
    draw.text((x0 + 40, list_top + 16), "Work items", fill=INK, font=load_font(18, bold=True))
    rows = [
        ("Design system refresh", "Active", "2h ago"),
        ("Billing dashboard", "Review", "5h ago"),
        ("Mobile onboarding", "Active", "1d ago"),
        ("Analytics export", "Done", "2d ago"),
        ("Team permissions", "Review", "3d ago"),
    ]
    for row_i, (name, status, updated) in enumerate(rows):
        ry = list_top + 48 + row_i * 40
        if row_i < len(rows) - 1:
            draw.line((x0 + 40, ry + 32, x1 - 40, ry + 32), fill=LINE, width=1)
        draw.text((x0 + 40, ry + 6), name, fill=INK, font=load_font(15))
        draw_status_pill(draw, x1 - 280, ry + 4, status)
        draw.text((x1 - 120, ry + 8), updated, fill=MUTED, font=load_font(13))

    btn_w = 160
    btn_h = 44
    btn_x = x1 - 24 - btn_w
    btn_y = y1 - 24 - btn_h
    rounded_rect(draw, (btn_x, btn_y, btn_x + btn_w, btn_y + btn_h), 10, PRIMARY, None)
    draw.text((btn_x + 36, btn_y + 11), "Open board", fill=SURFACE, font=load_font(16, bold=True))

    return img


def mock_ready() -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    outer = content_box()
    draw_window_chrome(draw, outer)
    x0, y0, x1, y1 = outer
    y0 += 48

    draw.text((x0 + 24, y0 + 20), "Launch checklist", fill=INK, font=load_font(32, bold=True))
    draw.text(
        (x0 + 24, y0 + 62),
        "Everything ready for your next release.",
        fill=MUTED,
        font=load_font(17),
    )

    bar_y = y0 + 108
    bar_x0 = x0 + 24
    bar_x1 = x1 - 24
    rounded_rect(draw, (bar_x0, bar_y, bar_x1, bar_y + 10), 5, LINE, None)
    rounded_rect(draw, (bar_x0, bar_y, bar_x1, bar_y + 10), 5, PRIMARY, None)
    draw.text((bar_x0, bar_y + 18), "100% complete", fill=MUTED, font=load_font(14))

    preview_top = y0 + 148
    preview_h = 168
    preview_bottom = preview_top + preview_h
    rounded_rect(draw, (x0 + 24, preview_top, x1 - 24, preview_bottom), 12, BG, LINE)
    draw.text((x0 + 40, preview_top + 14), "Release preview", fill=INK, font=load_font(18, bold=True))

    tile_gap = 16
    tile_area_x0 = x0 + 40
    tile_area_x1 = x1 - 40
    tile_area_w = tile_area_x1 - tile_area_x0
    tile_w = (tile_area_w - 2 * tile_gap) // 3
    tile_top = preview_top + 48
    tile_bottom = preview_bottom - 16
    for i in range(3):
        tx = tile_area_x0 + i * (tile_w + tile_gap)
        rounded_rect(draw, (tx, tile_top, tx + tile_w, tile_bottom), 10, SURFACE, LINE)
        rounded_rect(draw, (tx + 12, tile_top + 12, tx + tile_w - 12, tile_top + 36), 6, BG, None)
        draw.line((tx + 12, tile_top + 48, tx + tile_w - 40, tile_top + 48), fill=LINE, width=1)
        draw.line((tx + 12, tile_top + 58, tx + tile_w - 80, tile_top + 58), fill=LINE, width=1)
        draw.line((tx + 12, tile_top + 68, tx + tile_w - 56, tile_top + 68), fill=LINE, width=1)

    grid_top = preview_bottom + 16
    grid_bottom = y1 - 72
    rounded_rect(draw, (x0 + 24, grid_top, x1 - 24, grid_bottom), 12, BG, LINE)
    checks = [
        ("Build passed", "All tests green"),
        ("Staging verified", "Smoke checks OK"),
        ("Monitoring on", "Alerts configured"),
        ("Rollback ready", "Previous version pinned"),
    ]
    cell_gap = 12
    inner_w = x1 - x0 - 48
    cell_w = (inner_w - cell_gap) // 2
    cell_h = (grid_bottom - grid_top - 32 - cell_gap) // 2
    for i, (title, sub) in enumerate(checks):
        col = i % 2
        row = i // 2
        cx = x0 + 24 + 16 + col * (cell_w + cell_gap)
        cy = grid_top + 16 + row * (cell_h + cell_gap)
        rounded_rect(draw, (cx, cy, cx + cell_w, cy + cell_h), 10, SURFACE, LINE)
        draw.text((cx + 14, cy + 12), title, fill=INK, font=load_font(15, bold=True))
        draw.text((cx + 14, cy + 34), sub, fill=MUTED, font=load_font(13))

    btn_w = 140
    btn_x = x1 - 24 - btn_w
    btn_y = y1 - 24 - 44
    rounded_rect(draw, (btn_x, btn_y, btn_x + btn_w, btn_y + 44), 10, PRIMARY, None)
    draw.text((btn_x + 32, btn_y + 11), "Continue", fill=SURFACE, font=load_font(15, bold=True))

    return img


MOCKS = [
    ("saas-step-1.png", mock_dashboard),
    ("saas-step-2.png", mock_review),
    ("saas-step-3.png", mock_ready),
]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for filename, builder in MOCKS:
        png_path = OUT_DIR / filename
        jpg_path = OUT_DIR / filename.replace(".png", ".jpg")
        image = builder()
        image.save(png_path, optimize=True)
        image.save(jpg_path, quality=90, optimize=True)
        print(f"Wrote {png_path.relative_to(ROOT)}")
        print(f"Wrote {jpg_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
