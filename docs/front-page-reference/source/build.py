"""Builds the front page reference: the agreed design for the datadonation.eu front page, as one
self-contained HTML page. It is the page to test the real site against.

    python3 -I source/build.py source/designer-hero.svg index.html

Run it from this folder (docs/front-page-reference). The page loads its fonts from fonts/ and its
logos from assets/, and nothing from the network. The designer's pieces (icons, portraits, lines)
are cut out of source/designer-hero.svg by their coordinates, so that file must stay as delivered.

The page takes two query parameters, for clean screenshots:  ?bar=off  hides the dark bar at the
top, and  ?note=off  hides the note.

This file grew step by step during the design conversation and still carries a few unused helpers
from earlier versions. It is kept as it was so that it rebuilds the agreed page exactly."""
import re
import sys
import xml.etree.ElementTree as ET

SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
ET.register_namespace("xlink", "http://www.w3.org/1999/xlink")
src, out = sys.argv[1], sys.argv[2]
raw = open(src, encoding="utf-8").read()
root = ET.fromstring(raw)
clips = "".join(re.findall(r'<clipPath id="[ij]">.*?</clipPath>', raw, flags=re.S))
everything = list(root.iter())


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


K = 0.6  # display scale of the designer's pieces

# name: (elements, centre x, centre y, half width, half height) in the designer's coordinates
SPRITES = {
    "globe": ([circ("1310.08", "233.03"), root.find(f".//{{{SVG}}}g[@id='k']")], 1310.08, 233.03, 33, 33),
    "music": ([circ("1650.34", "483.19"), group_of(rect("1649.25"))], 1650.34, 483.19, 33, 33),
    "bars": ([circ("1627.89", "181.96"), group_of(rect("1607.37"))], 1627.89, 181.96, 33, 33),
    "funnel": ([circ("427.56", "426.56"), path("M444.21,420.1")], 427.56, 426.56, 33, 33),
    "toggle": ([group_of(rect("153.08"))], 174.85, 118.54, 22.5, 12.5),
    "check": ([circ("522.23", "343.62"), group_of(rect("524.71"))], 522.23, 343.62, 21.5, 21.5),
    "avatar-f": ([circ("1095.05", "534.42"), group_of(circ("1094.27", "535.46"))], 1095.05, 534.42, 33, 33),
    "avatar-m": ([circ("204.87", "510.88"), group_of(circ("204.81", "511.23"))], 204.87, 510.88, 33, 33),
    "pin": ([path("M790.62,65.45")], 777.04, 68.0, 14, 17),
    "burst-yellow": ([path("M1279.05,45.22")], 1277.57, 57.62, 14, 14),
}


import copy
_ring = copy.deepcopy(circ("204.87", "510.88"))
_ring.set("style", "fill: #87c5eb;")
SPRITES["avatar-m-sky"] = ([_ring, group_of(circ("204.81", "511.23"))], 204.87, 510.88, 33, 33)


def pos(x, y, tx=None, ty=None):
    """x is a percentage of the region's width, or any CSS length; y is px with the thread at y=146.
    tx, ty are the tablet position."""
    css = lambda v: v if isinstance(v, str) else f"{v}%"
    st = f"--x:{css(x)};--y:{y}px;"
    if tx is not None:
        st += f"--tx:{css(tx)};--ty:{ty}px;"
    return st


def sprite(name, x, y, cls="", tx=None, ty=None, k=None):
    els, cx, cy, hw, hh = SPRITES[name]
    k = k or K
    return (f'<svg class="sp sp--{name} {cls}" style="{pos(x, y, tx, ty)}" width="{2*hw*k:.1f}" height="{2*hh*k:.1f}" '
            f'viewBox="{cx-hw:.2f} {cy-hh:.2f} {2*hw} {2*hh}" aria-hidden="true">' + "".join(ser(e) for e in els) + "</svg>")


def node(x, y, cls="", tx=None, ty=None):
    return f'<i class="nd {cls}" style="{pos(x, y, tx, ty)}"></i>'


def own(body, size, x, y, cls="", disc=None, sw=2.0, ink="#4272ef", tx=None, ty=None):
    """One of the new D3I icons. disc: None bare, 'faint', 'white' or 'blue'. sw is the line width in a 36-unit box."""
    back = {"faint": '<circle r="17.5" fill="#fff" opacity=".16"/>', "white": '<circle r="17.5" fill="#fff"/>',
            "blue": '<circle r="17.5" fill="#4272ef"/>', None: ""}[disc]
    return (f'<svg class="sp {cls}" style="{pos(x, y, tx, ty)}" width="{size}" height="{size}" viewBox="-18 -18 36 36" aria-hidden="true">{back}'
            f'<g fill="none" stroke="{ink}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">{body}</g></svg>')


def hline(left, right, y, cls=""):
    """A horizontal line that stretches with the region. left and right are CSS lengths from each edge."""
    return f'<i class="hl {cls}" style="left:{left};right:{right};--y:{y}px"></i>'


VIDEO = '<rect x="-8.5" y="-6" width="17" height="12" rx="2.6"/><path d="M-2.2 -3 L3.4 0 L-2.2 3 Z" fill="#4272ef" stroke-width="1.2"/>'
HEALTH = '<path d="M-11 1.5 H-5.5 L-2.2 -6.5 L2.2 7.5 L5.2 1.5 H11"/>'
PHONE = '<rect x="-7" y="-13" width="14" height="26" rx="3.6" fill="#fff"/><path d="M-2 8.6 H2"/>'
LOCK = '<path d="M-3.6 -1.4 V-4.8 a3.6 3.6 0 0 1 7.2 0 V-1.4"/><rect x="-6.2" y="-1.4" width="12.4" height="9.8" rx="2" fill="#fff"/><circle cx="0" cy="3.4" r="1.5" fill="#4272ef" stroke="none"/>'
MESSAGES = '<path d="M-11 -9 H11 a2.5 2.5 0 0 1 2.5 2.5 V4.5 a2.5 2.5 0 0 1 -2.5 2.5 H-2 L-8 12.5 V7 H-11 a2.5 2.5 0 0 1 -2.5 -2.5 V-6.5 a2.5 2.5 0 0 1 2.5 -2.5 Z" fill="#ff5e5e" stroke="none"/>'
CONSENT = '<path d="M0 -8.6 L7 -5.9 V-0.8 C7 3.9 3.9 7.2 0 8.6 C-3.9 7.2 -7 3.9 -7 -0.8 V-5.9 Z"/><path d="M-3.1 0 L-0.8 2.3 L3.4 -2.3"/>'

def bend(x1, y1, x2, y2):
    """From a horizontal run at (x1, y1) to a horizontal run at (x2, y2), in the designer's own shape:
    their rounded corner, a straight diagonal, their rounded corner. The proportions and the corner
    curves are taken from the lines in the hero artwork (corner 27.36 by 18.04, diagonal 22.45 by 54.3)."""
    dx, dy = x2 - x1, y2 - y1
    cw, ch = dx * 0.3545, dy * 0.1996
    return (f"c{cw * .435:.2f},0 {cw * .829:.2f},{ch * .394:.2f} {cw:.2f},{ch:.2f} "
            f"l{dx - 2 * cw:.2f},{dy - 2 * ch:.2f} "
            f"c{cw * .171:.2f},{ch * .606:.2f} {cw * .565:.2f},{ch:.2f} {cw:.2f},{ch:.2f}")


# The story, left of the headline: the designer's own left-hand cluster, redrawn into the band.
# Their lines are reused as drawn. Across, the drawing stretches with the space (x is a share of the
# designer's 560 units); down, it is scaled to 300px (y * KY + OY), which is deeper than the band:
# the lower part hangs below the band's edge onto the white page, where the lines turn sky blue.
#   person and map pin (bottom) climb an S-bend to a line that rises to the main line at the chart;
#   the phone starts the main line; the switch starts a dotted line that climbs over the lock,
#   comes down past the message bubble and lands on the main line;
#   from the main line a branch drops to the tick, which sits on the dotted circle round the funnel;
#   the main line carries on, comes down, and becomes the line under the headline.
AW = 560.0                                   # width of the designer's cluster, in their units
KY, OY = 0.544, -17.2
PX = lambda x: f"{x / AW * 100:.2f}%"
PY = lambda y: round(y * KY + OY, 1)
EDGE = 224.0                                 # the band's lower edge on the left, from 1280px
CXP, CY, R = PX(427.5), EDGE, 64             # the funnel sits on that edge; its circle is a true circle, 64px
TICK_Y = PY(343.73)                          # the tick, on that circle, where the branch arrives
TICK_DX = round((R ** 2 - (CY - TICK_Y) ** 2) ** .5, 1)
LAND_X, LAND_Y = 556.0, 146.0                # where the main line lands on the headline's line
# the S-bend's straight stretch runs from (61.84, 430.82) to (45.81, 472.47); this is where it crosses the edge
PIN_X = 61.84 - 16.03 * (((EDGE - OY) / KY) - 430.82) / 41.65
ART = (
    '<svg class="story__lines" viewBox="0 0 560 300" preserveAspectRatio="none" aria-hidden="true">'
    f'<g transform="translate(0 {OY}) scale(1 {KY})">'
    '<path class="dot" d="M197.79,119.6h75.94c11.91,0,22.67-7.1,27.36-18.04l9.69-22.6c4.69-10.95,15.45-18.04,27.36-18.04h121.14c20.03,0,34.35,19.39,28.45,38.54l-28.63,88.28c-5.9,19.15,8.42,38.54,28.45,38.54"/>'
    '<path d="M-60,392.04h267.33c11.8,0,22.48-6.97,27.24-17.76l62.9-130.16c4.76-10.8,15.44-17.76,27.24-17.76h195.29"/>'
    '<path d="M123.66,226.37H344.07"/>'
    '<path d="M33.39,392.28c20.03,0,34.35,19.39,28.45,38.54l-16.03,41.65c-5.9,19.15,8.42,38.54,28.45,38.54h126.23"/>'
    '<path d="M408.52,227.16l-31.81,78.03c-5.9,19.15,8.42,38.54,28.45,38.54h64.84"/>'
    '</g>'
    f'<path d="M520 {PY(226.36)} {bend(520, PY(226.36), LAND_X, LAND_Y)}"/>'
    '</svg>'
    f'<svg class="sp cl" style="{pos(CXP, CY)}" width="2" height="2" viewBox="-1 -1 2 2" aria-hidden="true">'
    f'<circle class="ring" r="{R}"/></svg>')

story = "\n        ".join([
    # the line art twice: white where it lies on the sky band, sky blue where it hangs onto the page
    f'<div class="story__clip story__clip--sky"><div>{ART}</div></div>',
    f'<div class="story__clip story__clip--page"><div>{ART}</div></div>',
    sprite("toggle", PX(174.85), PY(118.54)),
    own(LOCK, 28, PX(405.7), PY(61), "", "blue", 2.0, "#fff"),
    node(PX(212), PY(226.37)),
    own(PHONE, 42, f"calc({PX(123.66)} - 4px)", PY(226.37), "", None, 2.8),
    sprite("bars", PX(355.13), PY(226.37)),
    node(PX(409.07), PY(226.37)),
    node(PX(507.58), PY(226.37)),
    node(PX(PIN_X), EDGE, "nd--yellow"),
    sprite("pin", PX(PIN_X), EDGE - 11),
    sprite("avatar-m-sky", PX(204.87), PY(511.01)),
    sprite("funnel", CXP, CY),
    sprite("check", f"calc({CXP} + {TICK_DX}px)", TICK_Y),
])

# Left of the headline: the story from 1280px; below that, for now, only the person and the funnel on the line.
left = "\n      ".join([
    f'<div class="story xl">\n        {story}\n      </div>',
    # first compression, 1000 to 1279px: two levels. Upper: the phone starts a line that comes down
    # onto the headline's line just before the title. Lower: the person and the funnel on that line.
    '<div class="midnet lt-xl desk"><svg class="story__lines" style="height:276px" viewBox="0 0 100 276" preserveAspectRatio="none" aria-hidden="true">'
    f'<path d="M12 80 H62 {bend(62, 80, 97, 146)}"/></svg></div>',
    own(PHONE, 40, 12, 80, "lt-xl desk", None, 2.8),
    node(40, 80, "lt-xl desk"),
    sprite("avatar-m", 12, 146, "lt-xl", tx=22, ty=146),
    sprite("funnel", 46, 146, "lt-xl", tx=72, ty=146),
])
# The right of the headline. It knows nothing about the note, which lies on top of it.
#
# THE ANCHOR is the one point the two share. It is where the note's arrow disc is centred:
#     across: max(248px, 55% of the space right of the headline);  down: 196px from the band's top.
# The background keeps a node there (the designer's cross disc, smaller than the arrow disc). With
# the note on, the arrow disc sits over it; with the note off, the background's own piece shows.
ANCHOR_X, ANCHOR_Y = "max(248px, 55%)", 196.0

_ring = copy.deepcopy(circ("1095.05", "534.42"))
_ring.set("style", "fill: #87c5eb;")
SPRITES.update({
    "avatar-f-sky": ([_ring, group_of(circ("1094.27", "535.46"))], 1095.05, 534.42, 33, 33),
    "burst-coral": ([path("M1526.06,352.9")], 1524.58, 365.3, 14, 14),
    "bag-a": ([circ("1421.38", "347.32"), path("M1426.35,357.57")], 1421.38, 347.32, 21.5, 21.5),
    "bag-b": ([circ("1496.75", "83.52"), path("M1501.72,93.77")], 1496.75, 83.52, 21.5, 21.5),
    "xdisc": ([circ("1649.14", "86.44"), group_of(rect("1648.12"))], 1649.14, 86.44, 21.5, 21.5),
})

# The upper strand: the woman, the dotted line that leads to her, and the line beyond her that
# leaves the page. It is the designer's lower-right piece turned half a turn. Its other movement
# (music note, drop, low line, climb) has moved to the lower part, below.
X1 = lambda x: f"{6 + (1650.34 - x) * 0.13326:.2f}%"       # the woman at 80% of the space
Y1 = lambda y: round(26 + (534.42 - y) * 0.5, 1)           # the woman's centre 26px below the top edge
PART1 = (
    '<svg class="story__lines" viewBox="0 0 100 276" preserveAspectRatio="none" aria-hidden="true">'
    '<g transform="translate(225.925 293.21) scale(-0.13326 -0.5)">'
    '<path class="dot" d="M1127.72,535.93h90.3c11.91,0,22.67-7.1,27.36-18.04l22.45-54.3c4.69-10.95,15.45-18.04,27.36-18.04h76.16"/>'
    '<path d="M867.63,601.87l7.11-14.92c14.84-31.16,46.28-51.02,80.8-51.02h167.31"/>'
    '</g></svg>')

# The lower part carries the line from the text. It mirrors the left side, where the main line comes
# down onto the headline's line just before the title's first node:
#   just after the title's last node the line drops to the height of the note's coral corner node
#   and runs to it; from the anchor the line goes on through the bag and down to the globe.
# The drop is drawn in fixed pixels from the start of the space; right of the anchor the line
# stretches with the room there is.
CORNER_Y = ANCHOR_Y + 30   # the coral node on the note's lower-left corner: 232px left of the anchor, 30px below it
DROP = (
    '<svg class="story__lines" style="width:2px;height:276px" viewBox="0 0 2 276" preserveAspectRatio="none" aria-hidden="true">'
    f'<path d="M-30 146 H-28 {bend(-28, 146, 16, CORNER_Y - 1)}"/></svg>')
# the line then runs along that height to the note's corner, where the background keeps a node
LOW_LINE = hline("16px", f"calc(100% - {ANCHOR_X} + 182px)", CORNER_Y - 1)
# With the note off, the background joins that node to the anchor by its own step. Every part of it
# lies under the note's paper or its arrow disc, so it never shows when the note is on.
BRIDGE = (
    '<svg class="story__lines" style="width:2px;height:276px" viewBox="0 0 2 276" preserveAspectRatio="none" aria-hidden="true">'
    f'<path d="M-182 {CORNER_Y - 1} {bend(-182, CORNER_Y - 1, -134, ANCHOR_Y - 1)} H-6 L0 {ANCHOR_Y}"/></svg>')
LOW_RIGHT = hline("0px", "39px", ANCHOR_Y)

# The upward part joins the lower part to the woman. From a node on the background's step, left of
# the anchor, a line climbs to a middle level (118px), runs right past a node, and climbs to the woman.
# The first climb is drawn in fixed pixels from the anchor, the second in fixed pixels from the woman,
# and the level between them stretches.
MID_Y = 118.5
FIX = '<svg class="story__lines" style="left:{left};width:2px;height:276px" viewBox="0 0 2 276" preserveAspectRatio="none" aria-hidden="true"><path d="{d}"/></svg>'
CLIMB1 = FIX.format(left=ANCHOR_X, d=f"M-116 {ANCHOR_Y - 1} L-76 {MID_Y + 17} c3.76,-10.3 12.43,-17 22,-17")
MID_LINE = hline(f"calc({ANCHOR_X} - 54px)", "calc(20% + 58px)", MID_Y)
# the badge on its own: blue outline, white fill, blue tick, no bubble behind it
BADGE = ('<path d="M0 -8.6 L7 -5.9 V-0.8 C7 3.9 3.9 7.2 0 8.6 C-3.9 7.2 -7 3.9 -7 -0.8 V-5.9 Z" fill="#fff"/>'
         '<path d="M-3.1 0 L-0.8 2.3 L3.4 -2.3"/>')
CLIMB2 = FIX.format(left="80%", d=f"M-58 {MID_Y} c9.57,0 18.24,-6.7 22,-17 L0 26")
GLOBE_DROP = FIX.format(left="100%", d=f"M-40 {ANCHOR_Y} {bend(-40, ANCHOR_Y, -6, 236)} H0")

rstory = "\n        ".join([
    PART1,
    CLIMB1,
    MID_LINE,
    CLIMB2,
    own(BADGE, 52, f"calc({ANCHOR_X} - 116px)", ANCHOR_Y - 1, "front", None, 1.7),
    # a white node on the low run, as far past the drop as the title's first node is past the landing on the left
    node("49px", CORNER_Y - 1),
    node(f"calc(({ANCHOR_X} + 80% - 112px) / 2)", MID_Y),
    DROP,
    LOW_LINE,
    sprite("music", X1(1371.35), Y1(445.55)),
    node(X1(989.02), Y1(535.93)),
    sprite("avatar-f", X1(1095.05), Y1(534.42)),
    '<div class="rpart2">\n          ' + "\n          ".join([
        BRIDGE,
        LOW_RIGHT,
        GLOBE_DROP,
        sprite("globe", "100%", 236),
        sprite("bars", "0%", ANCHOR_Y, "anchor", k=36 / 65.36),
    ]) + '\n        </div>',
])
right = "\n      ".join([
    f'<div class="rstory xl">\n        {rstory}\n      </div>',
    # first compression, 1000 to 1279px: after the title the line drops to a low line that ends at the
    # globe; above, a dotted line climbs from a node to the woman, and her line leaves the page.
    '<div class="midnet lt-xl desk">'
    + FIX.format(left="0", d=f"M-30 146 H-28 {bend(-28, 146, 16, 214)}")
    + '<svg class="story__lines" style="height:276px" viewBox="0 0 100 276" preserveAspectRatio="none" aria-hidden="true">'
    f'<path class="dot" d="M14 104 H26 {bend(26, 104, 48, 68)} H62"/><path d="M62 68 H104"/></svg></div>',
    hline("16px", "22%", 214, "lt-xl desk"),
    node(14, 104, "lt-xl desk"),
    node(88, 68, "lt-xl desk"),
    sprite("globe", 78, 214, "lt-xl desk"),
    sprite("avatar-f", 62, 68, "lt-xl", tx=32, ty=146),
    sprite("globe", 75, 146, "lt-xl tab-only"),
])

CARD_TEXT = [
    ("For newcomers", "What is data donation?",
     "Data donation allows researchers to collect digital traces by asking participants to donate their own data."),
    ("For researchers", "Prepare a study",
     "Guidance for preparing your study, from design to ethics to FAIR practices."),
    ("For developers", "Open-source software",
     "Free, open-source tools that collect donated data right in the participant's browser."),
]


def go_disc(size):
    return (f'<svg class="go" width="{size}" height="{size}" viewBox="-18 -18 36 36" aria-hidden="true"><circle r="18" fill="#4272ef"/>'
            '<path d="M-8 0 h16 M1.5 -6.5 l6.5 6.5 l-6.5 6.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>')


# the topic icon for each card: one of the hero's icons, in a white ring disc
ICONS = {
    "funnel": ([path("M444.21,420.1")], 427.56, 426.56),
    "bars": ([group_of(rect("1607.37"))], 1626.2, 181.96),
    "toggle": ([group_of(rect("153.08"))], 174.85, 118.54),
}


def icon_node(name, size=30):
    els, cx, cy = ICONS[name]
    return (f'<svg class="go ic" width="{size}" height="{size}" viewBox="{cx-33:.2f} {cy-33:.2f} 66 66" aria-hidden="true">'
            f'<circle cx="{cx}" cy="{cy}" r="31.3" fill="#fff" stroke="#4272ef" stroke-width="3.3"/>'
            f'<g class="ic-blue">{"".join(ser(e) for e in els)}</g></svg>')


CARD_ICON = ["funnel", "bars", "toggle"]
CARD_LABEL = {"a": "A", "b": "B", "c": "C", "d": "D"}


def card_section(kind):
    cells = "\n    ".join(
        f'<article class="cd"><span class="eb">{eb}</span><h3 class="serif hd"><span>{hd}</span></h3><p class="bo">{body}</p>'
        f'<div class="rt">{icon_node(CARD_ICON[i])}<i class="rt__line"></i>{go_disc(30)}</div></article>'
        for i, (eb, hd, body) in enumerate(CARD_TEXT))
    return (f'<section class="cardsec" data-kind="{kind}"><p class="cardsec__label">{CARD_LABEL[kind]}</p>\n'
            f'  <main class="cards cards--{kind}">\n    {cells}\n  </main></section>')


CARDS_HTML = card_section("b")

NEWS_ITEMS = [
    ("Nov", "9", "Ready to reproduce: export your data donation study"),
    ("Nov", "3", "Building a Shared Knowledge Base for Data Donation: Join the DDP Tracker Initiative"),
    ("Oct", "12", "Data Donation Early Career Network"),
    ("Oct", "9", "D3I and TDCC RIGHTS at the Data Donation Symposium 2026 in Berlin"),
]
EVENT_ITEMS = [
    ("Nov", "20", "Unlocking Data: Exploring research opportunities on online platforms", "Webinar"),
    ("Nov", "24", "ODISSEI Conference 2026 – Special Edition: 10 Years of ODISSEI", "Jaarbeursplein 6 3521 AL"),
    ("Dec", "7–8", "New Directions in Social Media Research Conference", "St John's College, University of Cambridge"),
    ("May", "10–13", "Digital Footprints 2027: Transforming Health for People and Planet", "Bristol, UK · 2027"),
]
LOGOS = [("uvalogo_regular_compact_p_en.png", "University of Amsterdam"), ("Logo_RU_EN_RGB.png", "Radboud University"),
         ("UU_logo_2021_EN_RGB.png", "Utrecht University"), ("vu-transparant.png", "Vrije Universiteit Amsterdam"),
         ("Tilburg_University_logo.svg", "Tilburg University"), ("EUR_stacked_colour.png", "Erasmus University Rotterdam")]


def list_head(title, more):
    return (f'<div class="lhead"><h2 class="serif ltitle">{title}</h2>'
            f'<span class="more">{more}<i class="more__dots"></i>{go_disc(24)}</span></div>')


def list_rows(items):
    rows = []
    for it in items:
        m, d, t = it[:3]
        where = f'<p class="where">{it[3]}</p>' if len(it) > 3 else ""
        rows.append(f'<article class="row"><p class="date"><span>{m}</span><b class="serif">{d}</b></p>'
                    f'<div><h3 class="row__title"><span>{t}</span></h3>{where}</div><span class="row__arrow" aria-hidden="true">→</span></article>')
    return "".join(rows)


REST_HTML = f"""
<p class="outro outro--mid">You can also subscribe to our <a>newsletter</a> or reach out to one of our <a>team</a> members if you have any questions!</p>

<section class="lists">
  <div>{list_head("Latest news", "More")}{list_rows(NEWS_ITEMS)}</div>
  <div>{list_head("Upcoming events", "More")}{list_rows(EVENT_ITEMS)}</div>
</section>

<footer class="foot">
  <p class="foot__line">A service provided by <img src="assets/odissei.png" alt="ODISSEI" style="height:26px"> and supported by <img src="assets/Eyra_logo_300px.png" alt="Eyra" style="height:22px"></p>
  <p class="foot__label">Project partners</p>
  <div class="foot__logos">{"".join(f'<img src="assets/{f}" alt="{a}">' for f, a in LOGOS)}</div>
  <p class="foot__copy">&copy; 2026 datadonation.eu</p>
</footer>
"""


html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Front page reference</title>
<style>
  @font-face {{ font-family: "Nunito Sans"; src: url("fonts/NunitoSans-VariableFont_wght.woff2") format("woff2"); font-weight: 200 1000; }}
  @font-face {{ font-family: "Libre Caslon Condensed"; src: url("fonts/LibreCaslonCondensed-latin-ext.woff2") format("woff2"); font-weight: 400 700; unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF; }}
  @font-face {{ font-family: "Libre Caslon Condensed"; src: url("fonts/LibreCaslonCondensed-latin.woff2") format("woff2"); font-weight: 400 700; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }}
  :root {{ --ink: #252a34; --blue: #4272ef; --sky: #87c5eb; --coral: #ff5e5e; --line: #d5dae3; --gutter: 24px; --col: 72rem; --edge: max(var(--gutter), calc((100vw - var(--col)) / 2 + var(--gutter))); }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: #fff; color: #363b46; font: 400 16px/1.6 "Nunito Sans", system-ui, sans-serif; overflow-x: hidden; }}
  p {{ margin: 0; }}
  .proto {{ background: #252a34; color: #fff; font: 600 13px/1.4 "Nunito Sans", sans-serif; padding: 8px var(--gutter); display: flex; gap: 16px; justify-content: space-between; }}
  .serif {{ font-family: "Libre Caslon Condensed", serif; font-weight: 420; letter-spacing: 0; }}

  .nav {{ height: 60px; padding: 0 var(--edge); display: flex; align-items: center; justify-content: space-between; font: 600 15px/1 "Nunito Sans", sans-serif; color: var(--ink); }}
  .nav b {{ font-size: 17px; font-weight: 800; }}
  .nav span {{ display: flex; gap: 28px; }}
  .nav .menu {{ display: none; }}

  /* ---- the band ----
     --s      depth on the left (shallow side); --drop  how much deeper the right side is
     --step-x where the edge steps down; below 1280px that is just right of the notice,
              so the notice sits in the niche under the shallow side
     --fs     headline size; the headline is always two lines
     --half   half the width of the text column
     --thread y of the line that runs under the headline, across the whole band */
  .hero {{ --s: 195px; --fs: 50px; --half: 234px; --pad: 34px; --gap: 36px;
          --note-w: 60%; --step-w: 70px;
          --drop: 84px;
          --step-x: calc(var(--edge) + var(--note-w) + 16px);
          --d: calc(var(--s) + var(--drop));
          --deep-mid: calc((100% + var(--step-x) + var(--step-w)) / 2);
          --thread: calc(var(--pad) + var(--fs) * 2.06 + 9px);
          --rstart: calc(50% + var(--half) + var(--gap)); position: relative; }}
  .hero__band {{ position: relative; height: var(--d); }}

  /* the sky is three pieces, so the step can sit at a pixel position: a full-width strip,
     a deeper block on the right, and the curve between them */
  .sky {{ position: absolute; z-index: 0; background: var(--sky); }}
  .sky--top {{ left: 0; right: 0; top: 0; height: var(--s); }}
  .sky--deep {{ left: calc(var(--step-x) + var(--step-w) - 1px); right: 0; top: calc(var(--s) - 1px); height: calc(var(--drop) + 1px); }}
  .sky--step {{ background: none; left: var(--step-x); top: var(--s); width: var(--step-w); height: var(--drop); overflow: visible; }}
  .edge {{ position: absolute; z-index: 1; height: 1.5px; background: var(--blue); }}
  .edge--left {{ left: 0; width: calc(var(--step-x) + 1px); top: calc(var(--s) - .75px); }}
  .edge--right {{ left: calc(var(--step-x) + var(--step-w) - 1px); right: 0; top: calc(var(--d) - .75px); }}

  .hero__intro {{ position: relative; z-index: 2; width: calc(var(--half) * 2 + 40px); max-width: 100%; margin: 0 auto; padding-top: var(--pad); text-align: center; }}
  .hero__title {{ color: #fff; font-size: var(--fs); line-height: 1.03; margin: 0; white-space: nowrap; }}
  .hero__sub {{ color: var(--blue); font: 900 17px/1.4 "Nunito Sans", sans-serif; margin-top: 20px; }}

  /* the thread: one line across the band, between headline and subtitle */
  /* the thread runs from the person (left) to the researcher (right), not edge to edge.
     --pf and --wf are where those two sit, as fractions of their regions. */
  .hero__thread {{ --pf: .12; --wf: .5; position: absolute; z-index: 1; left: 0; right: 0; top: var(--thread); height: 0; }}
  .hero__thread b {{ position: absolute; top: -.5px; height: 1px; background: #fff; left: calc((50% - var(--half) - var(--gap)) * var(--pf)); right: calc((100% - var(--rstart)) * (1 - var(--wf))); }}
  .hero__thread i {{ position: absolute; top: 0; width: 9px; height: 9px; border-radius: 50%; background: #fff; transform: translate(-50%, -50%); }}
  .hero__thread i:first-child {{ left: calc(50% - var(--half) - 6px); }}
  .hero__thread i:last-child {{ left: calc(50% + var(--half) + 6px); }}

  /* network regions: drawn with the thread at y=146, then shifted to wherever the thread is */
  .hero__net {{ position: absolute; z-index: 1; top: calc(var(--thread) - 146px); height: 276px; }}
  .hero__net--l {{ left: 0; width: calc(50% - var(--half) - var(--gap)); }}
  .hero__net--r {{ left: var(--rstart); right: 0; }}
  .hero__net > svg.lines {{ position: absolute; left: 0; top: 0; width: 100%; height: 224px; overflow: visible; }}
  .lines path {{ fill: none; stroke: #fff; stroke-width: 1px; vector-effect: non-scaling-stroke; }}
  .lines path.dot {{ stroke-width: 1.6px; stroke-dasharray: .1 7; stroke-linecap: round; }}
  .sp, .nd {{ position: absolute; left: var(--x); top: var(--y); transform: translate(-50%, -50%); }}
  .nd {{ width: 9px; height: 9px; border-radius: 50%; background: #fff; }}
  .sp {{ overflow: visible; }}
  /* horizontal lines stretch with the region; solid or dotted, as in the hero */
  .hl {{ position: absolute; top: var(--y); height: 1px; margin-top: -.5px; background: #fff; }}
  .hl.dot {{ height: 2px; margin-top: -1px; background: radial-gradient(circle at 1px 1px, #fff .95px, transparent 1.1px) 0 0 / 7px 2px repeat-x; }}
  .xl, .xxl, .tab-only {{ display: none; }}
  .midnet {{ position: absolute; left: 0; top: 0; width: 100%; height: 276px; color: #fff; }}
  /* first compression: the headline's line ends at the title's last node, where the drop begins */
  @media (min-width: 1000px) and (max-width: 1279px) {{ .hero__thread b {{ right: calc(50% - var(--half) - 6px); }} }}
  /* the right-hand drawing fills the space right of the headline, clipped to the band */
  .rstory {{ position: absolute; left: 0; top: 0; width: 100%; height: 276px; color: #fff; }}
  .rstory .story__lines {{ height: 276px; }}
  .front {{ z-index: 2; }}
  /* part 1's lines twice: white on the band, sky blue where they rise above its top edge */
  .rclip {{ position: absolute; left: 0; width: 100%; overflow: hidden; pointer-events: none; }}
  .rclip > div {{ position: absolute; left: 0; width: 100%; height: 276px; }}
  .rclip--band {{ top: 0; height: 276px; color: #fff; }}
  .rclip--band > div {{ top: 0; }}
  .rclip--page {{ top: -60px; height: 60px; color: var(--sky); }}
  .rclip--page > div {{ top: 60px; }}
  .rclip--page .story__lines path {{ stroke-width: 1.5px; }}
  /* the woman straddles the top edge 11.8px below her top: white ring on the band, sky-blue ring above it */
  .half-band {{ clip-path: inset(11.8px 0 0 0); }}
  .half-page {{ clip-path: inset(0 0 27.8px 0); }}
  /* part 2 lives right of the anchor, and stretches with what room there is */
  .rpart2 {{ position: absolute; top: 0; height: 276px; left: max(248px, 55%); width: min(100% - max(248px, 55%) - 22px, 260px); }}
  body[data-note="off"] .note {{ display: none; }}
  /* the story fills the space left of the headline, up to the designer's own width, and is 300px
     deep: deeper than the band, so its lower part hangs below the band's edge onto the page */
  .story {{ --sw: min(100%, 560px); position: absolute; top: 0; left: 0; width: var(--sw); height: 300px; }}
  .story__clip {{ position: absolute; left: 0; width: 100%; overflow: hidden; pointer-events: none; }}
  .story__clip > div {{ position: absolute; left: 0; width: 100%; height: 300px; }}
  .story__clip--sky {{ top: 0; height: var(--s); color: #fff; }}
  .story__clip--sky > div {{ top: 0; }}
  .story__clip--page {{ top: var(--s); height: calc(300px - var(--s)); color: var(--sky); }}
  .story__clip--page > div {{ top: calc(var(--s) * -1); }}
  .story__lines {{ position: absolute; left: 0; top: 0; width: 100%; height: 300px; overflow: visible; }}
  .story__lines path, .story .ring {{ fill: none; stroke: currentColor; stroke-width: 1px; vector-effect: non-scaling-stroke; }}
  .story__clip--page .story__lines path, .story__clip--page .ring {{ stroke-width: 1.5px; }}
  .story__lines .dot, .story .ring {{ stroke-width: 1.6px; stroke-dasharray: .1 6.5; stroke-linecap: round; }}
  .story__clip--page .story__lines .dot, .story__clip--page .ring {{ stroke-width: 2px; }}
  .story .faint {{ fill: #fff; opacity: .16; }}
  .nd--yellow {{ background: #ffcf60; }}

  /* nodes on the edge line */
  .edge-nd {{ position: absolute; z-index: 3; width: 11px; height: 11px; border-radius: 50%; transform: translate(-50%, -50%); }}
  .edge-nd--ring {{ left: 12%; top: var(--s); background: #fff; border: 1.5px solid var(--blue); }}
  .edge-nd--coral {{ left: calc(var(--step-x) + var(--step-w) / 2); top: calc(var(--s) + var(--drop) / 2); background: var(--coral); }}
  .edge-nd--blue {{ left: var(--deep-mid); top: var(--d); background: var(--blue); }}
  .sp--edge {{ display: none; z-index: 3; border-radius: 50%; box-shadow: 0 0 0 1.5px var(--blue); }}

  /* the notice: below 1280px it sits in the niche under the shallow side ... */
  /* below 1280px the notice is plain text in the niche, with the arrow disc after it: no paper, no line */
  .note {{ position: absolute; z-index: 2; left: var(--edge); top: var(--s); width: var(--note-w); height: var(--drop); display: flex; align-items: center; font-family: "Nunito Sans", sans-serif; line-height: 1.3; }}
  .note__paper {{ width: 100%; }}
  .note__body {{ display: flex; align-items: center; gap: var(--ngap, 22px); }}
  .note__head {{ flex: none; }}
  .note__eyebrow {{ color: var(--coral); font-weight: 800; font-size: 14px; line-height: 18px; }}
  .note__title {{ color: var(--ink); font-weight: 800; font-size: 14px; line-height: 18px; white-space: nowrap; }}
  .note__text {{ flex: 1; color: var(--ink); font-weight: 300; font-size: 13.5px; line-height: 19px; }}
  .note svg {{ display: block; overflow: visible; }}
  .note .note__go {{ flex: none; margin-left: auto; }}
  /* the tab, the route along it and the corner disc belong to the full note only */
  .note__over {{ display: none; position: absolute; left: 0; right: 0; bottom: 0; }}
  .note .note__tab, .note .note__route, .note .note__link {{ display: none; }}
  .note__route {{ position: absolute; left: 0; top: 0; }}
  .note__route .dot {{ fill: none; stroke: var(--blue); stroke-width: 1.9; stroke-dasharray: .1 4.6; stroke-linecap: round; }}
  .note__run {{ position: absolute; left: 182px; right: 18px; top: -.75px; height: 1.5px; background: var(--blue); }}
  .note__disc {{ position: absolute; right: -18px; top: -18px; }}
  /* comparison: the note's line in sky blue */
  body[data-noteline="sky"] .note__route .dot {{ stroke: var(--sky); }}
  body[data-noteline="sky"] .note__route circle[fill="#fff"] {{ stroke: var(--sky); }}
  body[data-noteline="sky"] .note__run {{ background: var(--sky); }}
  .note__link {{ position: absolute; left: 22px; top: -2px; line-height: 30px; color: var(--blue); font-weight: 800; font-size: 14px; white-space: nowrap; }}

  .cards {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; padding: 40px var(--edge) 8px; }}
  /* no card border: the text stands on a line that carries two nodes, the topic's icon and the arrow */
  .cd {{ position: relative; display: flex; flex-direction: column; }}
  .cd .bo {{ font-size: 16px; line-height: 1.55; margin-bottom: 14px; }}
  .cd .go {{ display: block; flex: none; }}
  .ic-blue path {{ fill: #4272ef !important; }}
  /* the mark: icon node, dotted line, arrow node; half the card's width */
  .rt {{ margin: auto 0 0; width: min(50%, 180px); display: flex; align-items: center; height: 30px; }}
  .rt__line {{ flex: 1; height: 2px; background: radial-gradient(circle at 1px 1px, var(--blue) .95px, transparent 1.1px) 0 0 / 5px 2px repeat-x; }}
  /* B: the whole card centred */
  .cards--b .cd {{ text-align: center; }}
  .cards--b .rt {{ margin: auto auto 0; }}
  /* C: left-aligned, with a hairline between the cards */
  .cards--c .cd + .cd::before {{ content: ""; position: absolute; left: -14px; top: 0; bottom: 0; width: 1px; background: var(--line); }}
  /* prototype switcher */
  .cardsec {{ position: relative; }}
  .cardsec__label {{ display: none; }}
  body[data-show="b"] .cardsec:not([data-kind="b"]) {{ display: none; }}
  .proto button {{ font: inherit; color: #fff; background: none; border: 1px solid rgba(255, 255, 255, .45); padding: 2px 9px; margin-left: 4px; cursor: pointer; }}
  .proto button[aria-pressed="true"] {{ background: #fff; color: #252a34; }}
  .cd .eb {{ font: 700 11px/1 "Nunito Sans", sans-serif; letter-spacing: .12em; text-transform: uppercase; color: #626976; }}
  .cd .hd {{ color: var(--ink); font-size: 27px; line-height: 1.08; margin: 10px 0 8px; }}
  .cd .lnk {{ font: 700 14px/1.4 "Nunito Sans", sans-serif; color: var(--blue); }}

  /* closing line, the two lists, the footer */
  /* --sep is the white space that separates the three cards from the lists */
  body {{ --sep: clamp(84px, 10vw, 136px); }}
  .outro {{ text-align: center; font-size: 16px; }}
  .outro--mid {{ padding: 44px var(--edge) 0; }}
  /* the general link: the text keeps its colour and gets a dotted sky-blue underline, solid on hover */
  .outro a {{ color: inherit; font-weight: 700; cursor: pointer; text-decoration: underline dotted var(--sky); text-decoration-thickness: 2px; text-underline-offset: 4px; }}
  .outro a:hover {{ text-decoration-style: solid; }}
  .lists {{ display: grid; grid-template-columns: 1fr 1fr; gap: 56px; padding: var(--sep) var(--edge) 72px; font-size: 14px; line-height: 1.5; }}
  .lhead {{ display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }}
  .ltitle {{ color: var(--ink); font-size: 24px; line-height: 1.1; margin: 0; }}
  .more {{ display: flex; align-items: center; font: 700 14px/1 "Nunito Sans", sans-serif; color: #363b46; }}
  .more__dots {{ width: 28px; margin-left: 8px; height: 2px; background: radial-gradient(circle at 1px 1px, var(--sky) .95px, transparent 1.1px) 0 0 / 5px 2px repeat-x; }}
  .go {{ display: block; flex: none; }}
  .row {{ display: grid; grid-template-columns: 46px 1fr auto; gap: 16px; align-items: center; padding: 10px 0; border-top: 1px solid var(--line); }}
  .row:last-child {{ border-bottom: 1px solid var(--line); }}
  .date {{ text-align: center; }}
  .date span {{ display: block; font: 700 11px/1 "Nunito Sans", sans-serif; letter-spacing: .12em; text-transform: uppercase; color: #626976; }}
  .date b {{ display: block; color: var(--ink); font-size: 22px; line-height: 1.05; margin-top: 3px; white-space: nowrap; }}
  .row__title {{ color: var(--ink); font: 600 16px/1.6 "Nunito Sans", sans-serif; margin: 0; }}
  .where {{ font: 700 13px/1.4 "Nunito Sans", sans-serif; color: #626976; }}
  /* a dotted blue underline marks a title as a link, in the lists and on the three cards */
  .row {{ cursor: pointer; }}
  .row__arrow {{ display: none; }}
  .row__title span, body[data-cards="u"] .cd .hd span {{ text-decoration: underline dotted var(--sky); text-decoration-thickness: 2px; text-underline-offset: 5px; }}
  .row:hover .row__title span, body[data-cards="u"] .cd:hover .hd span {{ text-decoration-style: solid; }}
  body[data-cards="u"] .rt {{ display: none; }}
  body[data-cards="u"] .cd .bo {{ margin-bottom: 0; }}
  body[data-cards="u"] .cd {{ cursor: pointer; }}
  .foot {{ border-top: 1px solid var(--line); padding: 32px var(--edge) 40px; font-size: 14px; color: var(--ink); }}
  .foot__line {{ display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-weight: 700; padding-bottom: 22px; border-bottom: 1px solid var(--line); }}
  .foot__label {{ font-weight: 700; margin: 22px 0 14px; }}
  .foot__logos {{ display: flex; align-items: center; gap: 34px; flex-wrap: wrap; }}
  .foot__logos img {{ height: 30px; width: auto; max-width: 150px; object-fit: contain; }}
  .foot__copy {{ margin-top: 26px; color: #626976; font-size: 13px; }}
  .nav i {{ font-style: normal; }}
  .nav b small {{ display: block; font: 400 13px/1.2 "Nunito Sans", sans-serif; color: #626976; margin-top: 3px; }}
  @media (max-width: 899px) {{ .lists {{ grid-template-columns: 1fr; gap: 44px; }} }}

  /* ... and from 1280px, the designer's card inside the band, right of the text */
  @media (min-width: 1280px) {{
    .hero {{ --s: 224px; --drop: 52px; --step-x: calc(50% - 35px);
            /* the anchor, in the band's own coordinates: where the note's arrow disc is centred */
            --anchor-x: calc(50% + var(--half) + var(--gap) + max(248px, (50% - var(--half) - var(--gap)) * .55));
            --anchor-y: 196px; }}
    /* the note hangs from the anchor: its arrow disc is centred there, and it grows upwards with its text */
    .note {{ left: calc(var(--anchor-x) - 232px); top: auto; bottom: calc(var(--d) - var(--anchor-y) - 30px); width: 232px; height: auto; display: block; }}
    .note__paper {{ filter: drop-shadow(0 2px 10px rgba(39, 100, 173, .16)); }}
    .note__body {{ display: block; background: #f3f9fd; padding: 22px 22px 14px; }}
    .note__title {{ margin-bottom: 7px; }}
    .note__over {{ display: block; height: 30px; }}
    .note .note__tab, .note .note__route {{ display: block; }}
    .note .note__link {{ display: inline; }}
    .note .note__go {{ display: none; }}
    .xl {{ display: block; }}
    .lt-xl {{ display: none; }}
    .hero__thread b {{ left: calc(min(50% - var(--half) - var(--gap), 560px) * .9929); right: calc(50% - var(--half) - 6px); }}
  }}

  @media (min-width: 1600px) {{ .xxl {{ display: block; }} }}

  /* tablet: fewer icons, smaller headline, the notice loses its body */
  @media (max-width: 999px) {{
    .hero {{ --s: 176px; --note-w: 230px; --drop: 64px; --fs: 40px; --half: 188px; --pad: 28px; --gap: 28px; }}
    .hero__sub {{ font-size: 15.5px; }}
    .desk {{ display: none; }}
    .tab-only {{ display: block; }}
    .sp, .nd {{ left: var(--tx, var(--x)); top: var(--ty, var(--y)); }}
    .hero__thread {{ --pf: .22; --wf: .75; }}
    .note__text {{ display: none; }}
    .cards {{ grid-template-columns: repeat(2, 1fr); gap: 20px; }}
    .cards .cd:last-child {{ grid-column: 1 / -1; }}
    .nav span i {{ display: none; }}
    .nav span .menu {{ display: block; }}
  }}

  /* phone: no icons; the thread, the stepped edge, one icon riding it */
  @media (max-width: 599px) {{
    .hero {{ --s: 171px; --note-w: 222px; --ngap: 14px; --step-w: 40px; --fs: 34px; --half: 160px; --pad: 26px; }}
    .hero__net {{ display: none; }}
    .hero__thread b {{ left: 0; right: 0; }}
    .hero__sub {{ padding: 0 var(--gutter); }}
    .sp--edge {{ display: block; left: var(--deep-mid); top: var(--d); }}
    .edge-nd--blue {{ display: none; }}
    .cards {{ grid-template-columns: 1fr; }}
  }}
</style>
</head>
<body data-show="b" data-cards="u" data-noteline="blue" data-note="on">
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>{clips}</defs></svg>

<div class="proto"><span>Front page reference. &nbsp; Note: <button data-k="note" data-v="on">on</button><button data-k="note" data-v="off">off</button></span><span id="w"></span></div>

<header class="nav"><b>datadonation.eu<small>Data donation for research</small></b><span><i>Data donation</i><i>Prepare a study</i><i>Software</i><i>Community &amp; Events</i><i>News</i><i>About D3I</i><i class="menu">Menu</i></span></header>

<section class="hero">
 <div class="hero__band">
  <i class="sky sky--top"></i><i class="sky sky--deep"></i>
  <svg class="sky sky--step" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 -2 H102 V100 H100 C50 100 50 0 0 0 Z" fill="#87c5eb"/>
    <path d="M0 0 C50 0 50 100 100 100" fill="none" stroke="#4272ef" stroke-width="1.5" vector-effect="non-scaling-stroke"/>
  </svg>
  <i class="edge edge--left"></i><i class="edge edge--right"></i>

  <div class="hero__thread" aria-hidden="true"><i></i><b></b><i></i></div>

  <div class="hero__net hero__net--l" aria-hidden="true">
      {left}
  </div>
  <div class="hero__net hero__net--r" aria-hidden="true">
      {right}
  </div>

  <div class="hero__intro">
    <h1 class="serif hero__title">Open Infrastructure for<br>Data Donation Research</h1>
    <p class="hero__sub">Digital Trace Data, donated to science by citizens.</p>
  </div>

  <i class="edge-nd edge-nd--coral"></i><i class="edge-nd edge-nd--blue"></i>
  {sprite("globe", 0, 0, "sp--edge")}
 </div>

  <aside class="note">
    <div class="note__paper">
      <div class="note__body">
        <div class="note__head"><p class="note__eyebrow">Position</p><p class="note__title">GDPR Omnibus Proposal</p></div>
        <p class="note__text">The European Omnibus Act poses a direct risk to fundamental human rights and to data donation as a research method.</p>
        <svg class="note__go" width="36" height="36" viewBox="-18 -18 36 36" aria-hidden="true"><circle r="18" fill="#4272ef"/><path d="M-8 0 h16 M1.5 -6.5 l6.5 6.5 l-6.5 6.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <svg class="note__tab" width="169" height="30" viewBox="0 0 169 30" aria-hidden="true">
        <path fill="#f3f9fd" d="M0 0 H168.3 c-6.55 0 -12.47 3.9 -15.05 9.93 l-4.2 10.15 c-2.57 6.03 -8.5 9.93 -15.05 9.93 H0 Z"/>
      </svg>
    </div>
    <div class="note__over">
      <svg class="note__route" width="184" height="30" viewBox="0 0 184 30" aria-hidden="true">
        <path class="dot" d="M0 30 H134 c6.55 0 12.48-3.9 15.05-9.93 l4.2-10.15 c2.58-6.03 8.5-9.93 15.05-9.93 H174"/>
        <circle cx="0" cy="30" r="4.5" fill="#ff5e5e"/>
        <circle cx="178" cy="0" r="4.2" fill="#fff" stroke="#4272ef" stroke-width="1.4"/>
      </svg>

      <i class="note__run"></i>
      <svg class="note__disc" width="36" height="36" viewBox="-18 -18 36 36" aria-hidden="true">
        <circle r="18" fill="#4272ef"/>
        <path d="M-8 0 h16 M1.5 -6.5 l6.5 6.5 l-6.5 6.5" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="note__link">Read our letter</span>
    </div>
  </aside>
</section>

{CARDS_HTML}
{REST_HTML}

<script>
  (function () {{
    var w = document.getElementById('w');
    function show() {{ w.textContent = window.innerWidth + 'px wide'; }}
    window.addEventListener('resize', show); show();
    var btns = document.querySelectorAll('.proto button');
    function paint() {{ btns.forEach(function (b) {{ b.setAttribute('aria-pressed', document.body.dataset[b.dataset.k] === b.dataset.v); }}); }}
    btns.forEach(function (b) {{ b.addEventListener('click', function () {{ document.body.dataset[b.dataset.k] = b.dataset.v; paint(); }}); }});
    paint();
    var q = new URLSearchParams(location.search);
    if (q.get('note')) {{ document.body.dataset.note = q.get('note'); paint(); }}
    if (q.get('bar') === 'off') {{ document.querySelector('.proto').style.display = 'none'; }}
  }})();
</script>
</body>
</html>
"""
open(out, "w", encoding="utf-8").write(html)
print(len(html), "bytes")
