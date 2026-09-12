"""Crop portrait-only squares from programme-material screenshots."""
from pathlib import Path

from PIL import Image

ASSETS = Path(
    r"C:\Users\asits\.cursor\projects\c-Users-asits-Projects-bks-orissa\assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "nap-profiles"


def crop_save(src: Path, box: tuple[int, int, int, int], dest: Path) -> None:
    im = Image.open(src).convert("RGB")
    portrait = im.crop(box)
    portrait = portrait.resize((640, 640), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    portrait.save(dest, "JPEG", quality=90, optimize=True)
    print(f"wrote {dest.name} box={box}")


def main() -> None:
    saroj_tapan = ASSETS / (
        "c__Users_asits_AppData_Roaming_Cursor_User_workspaceStorage_"
        "37e83f98c1064b0d4e7fcef0eedc560d_images_Screenshot_2026-09-12-18-35-37-56_"
        "c37d74246d9c81aa0bb824b57eaf7062-5025bfed-5728-439d-9fe4-8ba40465a049.jpg"
    )
    sandhya_malaya = ASSETS / (
        "c__Users_asits_AppData_Roaming_Cursor_User_workspaceStorage_"
        "37e83f98c1064b0d4e7fcef0eedc560d_images_Screenshot_2026-09-12-18-35-41-97_"
        "c37d74246d9c81aa0bb824b57eaf7062-f4ffc169-8f63-4cc2-aaca-659ddfbd5521.jpg"
    )
    kunja_mahendra = ASSETS / (
        "c__Users_asits_AppData_Roaming_Cursor_User_workspaceStorage_"
        "37e83f98c1064b0d4e7fcef0eedc560d_images_Screenshot_2026-09-12-18-35-49-95_"
        "c37d74246d9c81aa0bb824b57eaf7062-e668095a-b023-495a-b0a4-225133613c34.jpg"
    )

    # Portrait squares only — stop before the name column on the right.
    crops = [
        (saroj_tapan, (30, 118, 162, 250), "saroj-kumar-bhuyan.jpg"),
        (saroj_tapan, (30, 515, 162, 647), "tapan-kumar-dehury.jpg"),
        (sandhya_malaya, (30, 118, 162, 250), "sandhya-rani-kissan.jpg"),
        (sandhya_malaya, (30, 515, 162, 647), "malaya-kumar-deep.jpg"),
        (kunja_mahendra, (30, 118, 162, 250), "kunja-bihari-samant.jpg"),
        (kunja_mahendra, (30, 515, 162, 647), "mahendra-thakur.jpg"),
    ]
    for src, box, name in crops:
        crop_save(src, box, OUT / name)


if __name__ == "__main__":
    main()
