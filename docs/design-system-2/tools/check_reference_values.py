#!/usr/bin/env python3
"""Check that every colour and font size the front page reference uses has a token.

Reads the <style> block of docs/front-page-reference/index.html, skips the rules whose
selector names .proto (the reference's own switcher bar) or .nav (the header, which keeps
its own structure), and collects every hex colour and every font size in px: from
font-size, from the font shorthand, and from the custom properties that a font-size reads
through var() (the title's --fs). Each one that no token in project/tokens.json matches
exactly is printed. Colours are compared with the light theme's colour tokens, after
writing both as six lowercase digits (#fff is #ffffff); sizes with the website's type
styles (the Slides groups are left out, since the reference is a web page).

    python3 -I docs/design-system-2/tools/check_reference_values.py

Exits 1 if it printed anything, 0 otherwise.
"""
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
TOKENS = HERE.parent / "project" / "tokens.json"
REFERENCE = HERE.parent.parent / "front-page-reference" / "index.html"
SKIP = (".proto", ".nav")

HEX = re.compile(r"#[0-9a-fA-F]{3,8}\b")
PX = r"(\d+(?:\.\d+)?)px"


def rules(css):
    """(selector, declarations) for every rule, descending into @media blocks."""
    out, i = [], 0
    while True:
        start = css.find("{", i)
        if start < 0:
            return out
        prelude = css[i:start].strip()
        depth, j = 1, start + 1
        while depth:
            depth += {"{": 1, "}": -1}.get(css[j], 0)
            j += 1
        body = css[start + 1:j - 1]
        if prelude.startswith("@media"):
            out += rules(body)
        else:
            out.append((prelude, body))
        i = j


def declarations(body):
    for decl in body.split(";"):
        if ":" in decl:
            prop, value = decl.split(":", 1)
            yield prop.strip(), value.strip()


def six(hex_colour):
    h = hex_colour.lower()
    return "#" + "".join(c * 2 for c in h[1:]) if len(h) == 4 else h


def main():
    html = REFERENCE.read_text(encoding="utf-8")
    css = re.search(r"<style>(.*?)</style>", html, flags=re.S).group(1)
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    kept = [(sel, body) for sel, body in rules(css) if not any(s in sel for s in SKIP)]

    colours, sizes, size_vars = {}, {}, set()
    for sel, body in kept:
        for prop, value in declarations(body):
            for h in HEX.findall(value):
                colours.setdefault(six(h), []).append(sel)
            if prop == "font-size":
                m = re.fullmatch(PX, value)
                if m:
                    sizes.setdefault(m.group(1) + "px", []).append(sel)
                size_vars.update(re.findall(r"var\((--[\w-]+)\)", value))
            elif prop == "font":
                m = re.search(r"(?:^|\s)" + PX + r"(?=[\s/])", value)
                if m:
                    sizes.setdefault(m.group(1) + "px", []).append(sel)
    for sel, body in kept:
        for prop, value in declarations(body):
            m = re.fullmatch(PX, value)
            if prop in size_vars and m:
                sizes.setdefault(m.group(1) + "px", []).append(f"{sel} {prop}")

    t = json.loads(TOKENS.read_text(encoding="utf-8"))
    first = t["color"]["themes"][0]["id"]
    token_colours = set()
    for tok in t["color"]["tokens"]:
        v = tok["value"]
        v = v.get(first) if isinstance(v, dict) else v
        if isinstance(v, str) and HEX.fullmatch(v):
            token_colours.add(six(v))
    token_sizes = {s["fontSize"] for g in t["type"]["groups"] if not g["name"].startswith("Slides")
                   for s in g["styles"]}

    missing = [(c, sels) for c, sels in colours.items() if c not in token_colours]
    missing += [(s, sels) for s, sels in sizes.items() if s not in token_sizes]
    for value, sels in missing:
        print(f"{value:<9} no token; used by {', '.join(dict.fromkeys(sels))}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
