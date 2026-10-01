#!/usr/bin/env python3
"""Build Ken Burns loops for the Process panel (MP4 when ffmpeg exists, else GIF)."""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "img" / "process"
OUT_DIR = ROOT / "public" / "video" / "process"

FRAMES = 30
DURATION_MS = 80
ZOOM_END = 1.09

MAPPING = {
    "saas-step-1.png": "domain",
    "saas-step-2.png": "apis",
    "saas-step-3.png": "ship",
}


def ken_burns_frames(path: Path) -> list[Image.Image]:
    base = Image.open(path).convert("RGB")
    width, height = base.size
    frames: list[Image.Image] = []

    for i in range(FRAMES):
        t = i / max(FRAMES - 1, 1)
        scale = 1.0 + (ZOOM_END - 1.0) * t
        new_w = int(width * scale)
        new_h = int(height * scale)
        resized = base.resize((new_w, new_h), Image.Resampling.LANCZOS)
        offset_x = int((new_w - width) * (0.35 + 0.3 * t))
        offset_y = int((new_h - height) * (0.25 + 0.2 * t))
        cropped = resized.crop((offset_x, offset_y, offset_x + width, offset_y + height))
        frames.append(cropped)

    return frames


def write_gif(frames: list[Image.Image], out: Path) -> None:
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION_MS,
        loop=0,
        optimize=True,
    )


def write_mp4(frames: list[Image.Image], out: Path, ffmpeg: str) -> None:
    tmp = out.with_suffix(".frames")
    tmp.mkdir(parents=True, exist_ok=True)
    try:
        for i, frame in enumerate(frames):
            frame.save(tmp / f"frame_{i:03d}.jpg", quality=88)
        fps = max(1, round(1000 / DURATION_MS))
        subprocess.run(
            [
                ffmpeg,
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
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    ffmpeg = shutil.which("ffmpeg")

    for src_name, slug in MAPPING.items():
        src = SRC_DIR / src_name
        if not src.is_file():
            raise SystemExit(f"Missing source image: {src}")
        frames = ken_burns_frames(src)
        gif_out = OUT_DIR / f"{slug}.gif"
        write_gif(frames, gif_out)
        print(f"Wrote {gif_out.relative_to(ROOT)}")

        mp4_out = OUT_DIR / f"{slug}.mp4"
        if ffmpeg:
            write_mp4(frames, mp4_out, ffmpeg)
            print(f"Wrote {mp4_out.relative_to(ROOT)}")
        else:
            print(f"Skip {mp4_out.name} (ffmpeg not on PATH)")


if __name__ == "__main__":
    main()
