"""Extract leadership/district portraits from programme PDF pages.

Prefer rendered PNGs in tmp-pdf-pages/ (from second.pdf). Falls back to
rendering the PDF with PyMuPDF when those PNGs are missing.

Crops keep full heads (no aggressive square force-crop).
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "nap-profiles"
TMP_PAGES = ROOT / "tmp-pdf-pages"
DEFAULT_PDF = Path(r"C:\Users\asits\Downloads\Mobile Devices\second.pdf")
TARGET_HEIGHT = 900

# Boxes are for 2x-rendered pages (1584x1224), page numbers 1-based.
# Inset on the right to avoid the name-column gutter.
PROFILES = [
    (7, "saroj-kumar-bhuyan-v3.jpg", (33, 238, 602, 986)),
    (8, "tapan-kumar-dehury-v3.jpg", (83, 291, 560, 860)),
    (9, "sandhya-rani-kissan-v3.jpg", (83, 291, 555, 860)),
    (10, "malaya-kumar-deep-v3.jpg", (83, 291, 555, 860)),
    (11, "kunja-bihari-samant-v3.jpg", (83, 291, 555, 880)),
    (12, "mahendra-thakur-v3.jpg", (110, 320, 464, 870)),
]


def ensure_page_png(page_no: int) -> Path:
    dest = TMP_PAGES / f"page-{page_no:02d}.png"
    if dest.exists():
        return dest
    import pymupdf

    if not DEFAULT_PDF.exists():
        raise SystemExit(f"Missing {dest} and PDF not found at {DEFAULT_PDF}")
    TMP_PAGES.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(DEFAULT_PDF)
    page = doc[page_no - 1]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=False)
    pix.save(dest)
    return dest


def pad_headroom(crop: Image.Image) -> Image.Image:
    pad_top = max(24, int(crop.height * 0.12))
    pad_side = max(12, int(crop.width * 0.04))
    pad_bottom = max(12, int(crop.height * 0.04))
    bg = crop.getpixel((crop.width // 2, min(4, crop.height - 1)))
    canvas = Image.new(
        "RGB",
        (crop.width + pad_side * 2, crop.height + pad_top + pad_bottom),
        bg,
    )
    canvas.paste(crop, (pad_side, pad_top))
    return canvas


def fit_height(im: Image.Image, height: int = TARGET_HEIGHT) -> Image.Image:
    ratio = height / im.height
    width = max(1, int(round(im.width * ratio)))
    return im.resize((width, height), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for page_no, filename, box in PROFILES:
        page_path = ensure_page_png(page_no)
        page = Image.open(page_path).convert("RGB")
        portrait = fit_height(pad_headroom(page.crop(box)))
        dest = OUT / filename
        portrait.save(dest, "JPEG", quality=92, optimize=True)
        print(f"wrote {dest.name} size={portrait.size}")


if __name__ == "__main__":
    main()
