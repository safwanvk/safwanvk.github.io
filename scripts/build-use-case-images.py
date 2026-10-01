#!/usr/bin/env python3
"""
Build use-case card images from raw photography.

Raw inputs:
  assets/use-cases/raw/{slug}-a.jpg + {slug}-b.jpg

Outputs:
  public/img/use-cases/{slug}.jpg          — stacked composite (legacy / fallback)
  public/img/use-cases/{slug}-top.jpg      — top half 864×576
  public/img/use-cases/{slug}-bottom.jpg   — bottom half 864×576
  public/img/use-cases/healthcare-single.jpg — featured center column 864×1152 from healthcare-a
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "assets" / "use-cases" / "raw"
OUT_DIR = ROOT / "public" / "img" / "use-cases"

OUT_W = 864
OUT_H = 1152
HALF_H = OUT_H // 2

PAIRS: dict[str, tuple[str, str]] = {
    "api-platforms": ("api-platforms-a.jpg", "api-platforms-b.jpg"),
    "healthcare": ("healthcare-a.jpg", "healthcare-b.jpg"),
    "ops": ("ops-a.jpg", "ops-b.jpg"),
}


def fit_cover(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    img = img.convert("RGB")
    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    new_w = int(src_w * scale)
    new_h = int(src_h * scale)
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def save_jpeg(img: Image.Image, out_path: Path) -> None:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=88, optimize=True)
    print(f"Wrote {out_path.relative_to(ROOT)}")


def stack_pair(top_path: Path, bottom_path: Path, out_path: Path) -> tuple[Image.Image, Image.Image]:
    top = fit_cover(Image.open(top_path), OUT_W, HALF_H)
    bottom = fit_cover(Image.open(bottom_path), OUT_W, HALF_H)
    canvas = Image.new("RGB", (OUT_W, OUT_H))
    canvas.paste(top, (0, 0))
    canvas.paste(bottom, (0, HALF_H))
    save_jpeg(canvas, out_path)
    return top, bottom


def main() -> None:
    missing: list[str] = []
    for slug, (top_name, bottom_name) in PAIRS.items():
        top_path = RAW_DIR / top_name
        bottom_path = RAW_DIR / bottom_name
        if not top_path.is_file():
            missing.append(str(top_path.relative_to(ROOT)))
        if not bottom_path.is_file():
            missing.append(str(bottom_path.relative_to(ROOT)))
    if missing:
        raise SystemExit("Missing raw images:\n  " + "\n  ".join(missing))

    for slug, (top_name, bottom_name) in PAIRS.items():
        top_path = RAW_DIR / top_name
        bottom_path = RAW_DIR / bottom_name
        top_img, bottom_img = stack_pair(
            top_path, bottom_path, OUT_DIR / f"{slug}.jpg"
        )
        save_jpeg(top_img, OUT_DIR / f"{slug}-top.jpg")
        save_jpeg(bottom_img, OUT_DIR / f"{slug}-bottom.jpg")

    healthcare_single = fit_cover(Image.open(RAW_DIR / "healthcare-a.jpg"), OUT_W, OUT_H)
    save_jpeg(healthcare_single, OUT_DIR / "healthcare-single.jpg")


if __name__ == "__main__":
    main()
