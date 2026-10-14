#!/usr/bin/env python3
"""Compile project/tokens.css from project/tokens.json.

The design-system artifact compiles the same file itself whenever its page saves; this
script makes the copy in the repository without the page, so a web page can link
tokens.css straight from a clone. Layout follows the artifact type's format: colours
and shadows per theme, then lengths, font stacks and one `--text-<style>` font
shorthand per type style, a `.<style>` class per style, and an @font-face per font file.

    python3 -I docs/design-system/tools/build_tokens_css.py
"""
import json
import pathlib

PROJECT = pathlib.Path(__file__).resolve().parent.parent / "project"


def ref(value):
    """An alias "{name}" becomes var(--name); anything else passes through."""
    if isinstance(value, str) and value.startswith("{") and value.endswith("}"):
        return "var(--" + value[1:-1] + ")"
    return value


def theme_block(tokens, theme, first):
    """Declarations for one theme. A token without a value for a later theme inherits
    the first theme's, so later blocks list only what they override."""
    out = []
    for tok in tokens:
        value = tok["value"]
        if isinstance(value, str):
            if theme == first:
                out.append(f"  --{tok['name']}: {ref(value)};")
        elif theme in value:
            out.append(f"  --{tok['name']}: {ref(value[theme])};")
    return out


def main():
    t = json.loads((PROJECT / "tokens.json").read_text())
    themes = [th["id"] for th in t["color"]["themes"]]
    first = themes[0]
    themed = t["color"]["tokens"] + t.get("shadow", {}).get("tokens", [])

    lines = [f"/* {t['name']} — generated from tokens.json */"]
    lines.append(f':root, [data-theme="{first}"] {{')
    lines += theme_block(themed, first, first)
    lines.append("}")
    for theme in themes[1:]:
        lines.append(f'[data-theme="{theme}"] {{')
        lines += theme_block(themed, theme, first)
        lines.append("}")

    lines.append(":root {")
    for family, block in t.items():
        if family in ("color", "shadow", "type") or not isinstance(block, dict) or "tokens" not in block:
            continue
        for tok in block["tokens"]:
            lines.append(f"  --{tok['name']}: {tok['value']};")
    for key, stack in t["type"]["families"].items():
        lines.append(f"  --font-{key}: {stack};")
    for group in t["type"]["groups"]:
        for s in group["styles"]:
            family = s.get("family") or group["family"]
            style = "italic " if s.get("fontStyle") == "italic" else ""
            lines.append(f"  --text-{s['name']}: {style}{s['fontWeight']} {s['fontSize']}/{s['lineHeight']} var(--font-{family});")
    lines.append("}")

    for group in t["type"]["groups"]:
        for s in group["styles"]:
            lines.append(f".{s['name']} {{ font: var(--text-{s['name']}); letter-spacing: {s.get('letterSpacing', '0')}; }}")

    for f in t["type"]["fonts"]:
        src = f["file"] if "/" in f["file"] else "fonts/" + f["file"]
        lines.append(
            f'@font-face {{ font-family: "{f["family"]}"; src: url("{src}") format("woff2"); '
            f'font-weight: {f["weight"]}; font-style: {f.get("style", "normal")}; font-display: swap; }}'
        )

    (PROJECT / "tokens.css").write_text("\n".join(lines) + "\n")
    print(f"wrote {PROJECT / 'tokens.css'}: {len(lines)} lines")


if __name__ == "__main__":
    main()
