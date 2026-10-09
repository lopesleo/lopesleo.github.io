"""Recorta a Fusion Pixel 12px (OFL) com os caracteres que a página usa em japonês e chinês.

    python guardiao/fonts.py [pasta_dos_ttf]

Gera public/guardiao/assets/fonts/FusionPixel-{ja,zh,zht}.woff2 (+ .chars.txt, que o build.mjs
usa para avisar quando um texto novo tem caractere fora do recorte). Os .ttf vêm do release da
fonte (github.com/TakWolf/fusion-pixel-font); por padrão usa o cache do repositório do jogo.
Precisa de: pip install fonttools brotli
"""
import json
import pathlib
import re
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "public/guardiao/assets/fonts"
SRC = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("D:/dev/Dalmo-game/p2/guardiao/tools/.cache/fusion-pixel")
TTF = {
    "ja": "fusion-pixel-12px-proportional-ja.ttf",
    "zh": "fusion-pixel-12px-proportional-zh_hans.ttf",
    "zht": "fusion-pixel-12px-proportional-zh_tw.ttf",
}


def strings_of(code):
    """Todo texto do idioma: o catálogo .mjs (lido como texto) + lendas e chefes."""
    src = (HERE / f"i18n/{code}.mjs").read_text("utf-8")
    text = "".join(re.findall(r'"((?:[^"\\]|\\.)*)"', src))
    for f in ("legends.json", "bosses.json"):
        for item in json.loads((HERE / "data" / f).read_text("utf-8")):
            text += json.dumps(item.get(code, {}), ensure_ascii=False)
    return text


BASE = "".join(chr(c) for c in range(0x20, 0x7F)) + "·—–×…“”‘’「」『』、。！？：；（）＋＝・"
for code, ttf in TTF.items():
    chars = sorted(set(BASE + strings_of(code)) - {"\n", "\r", "\t"})
    txt = "".join(chars)
    (OUT / f"FusionPixel-{code}.chars.txt").write_text(txt, "utf-8")
    subprocess.run(
        [
            sys.executable, "-m", "fontTools.subset", str(SRC / ttf),
            f"--text-file={OUT / f'FusionPixel-{code}.chars.txt'}",
            "--flavor=woff2", "--layout-features=*", "--no-hinting",
            f"--output-file={OUT / f'FusionPixel-{code}.woff2'}",
        ],
        check=True,
    )
    size = (OUT / f"FusionPixel-{code}.woff2").stat().st_size
    print(f"{code}: {len(chars)} caracteres, {size // 1024} KB")
