#!/usr/bin/env python3
"""Write the front page band's network pieces as standalone SVG files.

Nine are cut out of the designer's hero artwork (docs/front-page-reference/source/designer-hero.svg)
with the element selections and view boxes that the reference build (source/build.py, its SPRITES
table) uses. The two portraits carry the designer's clipPath. Three were drawn later, from build.py's
own() calls, each in a -18 -18 36 36 view box: phone, lock, consent-badge.

    python3 -I docs/design-system-2/tools/extract_network_pieces.py

Writes the twelve files to docs/design-system-2/project/assets/Network/. Standard library only.
"""
import pathlib
import re
import xml.etree.ElementTree as ET

HERE = pathlib.Path(__file__).resolve().parent
SOURCE = HERE.parent.parent / "front-page-reference" / "source" / "designer-hero.svg"
OUT = HERE.parent / "project" / "assets" / "Network"

SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
raw = SOURCE.read_text(encoding="utf-8")
root = ET.fromstring(raw)
everything = list(root.iter())
CLIPS = {m.group(1): m.group(0) for m in re.finditer(r'<clipPath id="([ij])">.*?</clipPath>', raw, flags=re.S)}

K = 0.6  # the reference's display scale of the designer's pieces, used for the width and height


def tag(el):
    return el.tag.split("}")[-1]


def circ(cx, cy):
    return next(e for e in everything if tag(e) == "circle" and e.get("cx") == cx and e.get("cy") == cy)


def path(prefix):
    return next(e for e in everything if tag(e) == "path" and e.get("d", "").startswith(prefix))


def rect(x):
    return next(e for e in everything if tag(e) == "rect" and e.get("x") == x)


def group_of(child):
    return next(e for e in everything if tag(e) == "g" and child in list(e))


def ser(el):
    return ET.tostring(el, encoding="unicode").replace(f' xmlns="{SVG}"', "")


# file: (elements, centre x, centre y, half width, half height) in the designer's coordinates
SPRITES = {
    "globe": ([circ("1310.08", "233.03"), root.find(f".//{{{SVG}}}g[@id='k']")], 1310.08, 233.03, 33, 33),
    "music-note": ([circ("1650.34", "483.19"), group_of(rect("1649.25"))], 1650.34, 483.19, 33, 33),
    "chart": ([circ("1627.89", "181.96"), group_of(rect("1607.37"))], 1627.89, 181.96, 33, 33),
    "funnel": ([circ("427.56", "426.56"), path("M444.21,420.1")], 427.56, 426.56, 33, 33),
    "switch": ([group_of(rect("153.08"))], 174.85, 118.54, 22.5, 12.5),
    "tick": ([circ("522.23", "343.62"), group_of(rect("524.71"))], 522.23, 343.62, 21.5, 21.5),
    "portrait-woman": ([circ("1095.05", "534.42"), group_of(circ("1094.27", "535.46"))], 1095.05, 534.42, 33, 33),
    "portrait-man": ([circ("204.87", "510.88"), group_of(circ("204.81", "511.23"))], 204.87, 510.88, 33, 33),
    "map-pin": ([path("M790.62,65.45")], 777.04, 68.0, 14, 17),
}

# The pieces drawn later: build.py's PHONE, LOCK and BADGE, with the stroke and disc of its own() calls.
STROKE = '<g fill="none" stroke="{ink}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{body}</g>'
PHONE = '<rect x="-7" y="-13" width="14" height="26" rx="3.6" fill="#fff"/><path d="M-2 8.6 H2"/>'
LOCK = ('<path d="M-3.6 -1.4 V-4.8 a3.6 3.6 0 0 1 7.2 0 V-1.4"/><rect x="-6.2" y="-1.4" width="12.4" height="9.8" rx="2" fill="#fff"/>'
        '<circle cx="0" cy="3.4" r="1.5" fill="#4272ef" stroke="none"/>')
BADGE = ('<path d="M0 -8.6 L7 -5.9 V-0.8 C7 3.9 3.9 7.2 0 8.6 C-3.9 7.2 -7 3.9 -7 -0.8 V-5.9 Z" fill="#fff"/>'
         '<path d="M-3.1 0 L-0.8 2.3 L3.4 -2.3"/>')
OWN = {
    "phone": ("", STROKE.format(ink="#4272ef", sw=2.8, body=PHONE)),
    "lock": ('<circle r="17.5" fill="#4272ef"/>', STROKE.format(ink="#fff", sw=2.0, body=LOCK)),
    "consent-badge": ("", STROKE.format(ink="#4272ef", sw=1.7, body=BADGE)),
}


def wrap(view_box, w, h, inner, defs=""):
    d = f"<defs>{defs}</defs>" if defs else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:g}" height="{h:g}" viewBox="{view_box}">'
            f"{d}{inner}</svg>\n")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    files = {}
    for name, (els, cx, cy, hw, hh) in SPRITES.items():
        inner = "".join(ser(e) for e in els)
        used = "".join(c for cid, c in CLIPS.items() if f"url(#{cid})" in inner)
        files[name] = wrap(f"{cx-hw:.2f} {cy-hh:.2f} {2*hw:g} {2*hh:g}", round(2 * hw * K, 1), round(2 * hh * K, 1), inner, used)
    for name, (back, body) in OWN.items():
        files[name] = wrap("-18 -18 36 36", 36, 36, back + body)
    for name, text in files.items():
        (OUT / f"{name}.svg").write_text(text, encoding="utf-8")
        print(f"wrote {name}.svg")


if __name__ == "__main__":
    main()
