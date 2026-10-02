#!/usr/bin/env python3
"""Ken Burns loops for project wall cards (GIF always; MP4 when ffmpeg exists)."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "assets" / "projects" / "raw"
POSTER_DIR = ROOT / "public" / "img" / "projects"
OUT_DIR = ROOT / "public" / "video" / "projects"

OUT_W = 540
OUT_H = 960

FRAMES = 30
DURATION_MS = 80
ZOOM_END = 1.08

SLUGS = ("invest-os", "innoflow", "foodai", "medicare")


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


def ken_burns_frames(base: Image.Image) -> list[Image.Image]:
    width, height = base.size
    frames: list[Image.Image] = []
    for i in range(FRAMES):
        t = i / max(FRAMES - 1, 1)
        scale = 1.0 + (ZOOM_END - 1.0) * t
        new_w = int(width * scale)
        new_h = int(height * scale)
        resized = base.resize((new_w, new_h), Image.Resampling.LANCZOS)
        offset_x = int((new_w - width) * (0.32 + 0.28 * t))
        offset_y = int((new_h - height) * (0.22 + 0.18 * t))
        cropped = resized.crop((offset_x, offset_y, offset_x + width, offset_y + height))
        frames.append(cropped)
    return frames


def write_gif(frames: list[Image.Image], out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
    )


def write_mp4(frames: list[Image.Image], out: Path) -> None:
    tmp = out.with_suffix(".frames")
    tmp.mkdir(parents=True, exist_ok=True)
    try:
        for i, frame in enumerate(frames):
            frame.save(tmp / f"frame_{i:03d}.jpg", quality=88)
        fps = max(1, round(1000 / DURATION_MS))
        subprocess.run(
            [
                "ffmpeg",
                "-y",
                "-framerate",
                str(fps),
                "-i",
                str(tmp / "frame_%03d.jpg"),
                "-c:v",
                "libx264",
                "-pix_fmt",
                "yuv420p",
                "-movflags",
                "+faststart",
                str(out),
            ],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def main() -> None:
    missing: list[str] = []
    for slug in SLUGS:
        if not (RAW_DIR / f"{slug}.jpg").is_file():
            missing.append(str((RAW_DIR / f"{slug}.jpg").relative_to(ROOT)))
    if missing:
        raise SystemExit("Missing raw images:\n  " + "\n  ".join(missing))

    POSTER_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = shutil.which("ffmpeg")

    for slug in SLUGS:
        base = fit_cover(Image.open(RAW_DIR / f"{slug}.jpg"), OUT_W, OUT_H)
        poster_path = POSTER_DIR / f"{slug}.jpg"
        base.save(poster_path, "JPEG", quality=88, optimize=True)
        print(f"Wrote {poster_path.relative_to(ROOT)}")

        frames = ken_burns_frames(base)
        gif_out = OUT_DIR / f"{slug}.gif"
        write_gif(frames, gif_out)
        print(f"Wrote {gif_out.relative_to(ROOT)}")

        mp4_out = OUT_DIR / f"{slug}.mp4"
        if ffmpeg:
            write_mp4(frames, mp4_out)
            print(f"Wrote {mp4_out.relative_to(ROOT)}")
        else:
            print(f"Skip {mp4_out.name} (ffmpeg not on PATH)")


if __name__ == "__main__":
    main()
