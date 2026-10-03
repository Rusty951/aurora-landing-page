"""Build the homepage's DM Sans-derived, y-smoothed font.

Requires fonttools[woff]. Run with an optional local copy of SOURCE_URL:
    python3 scripts/build-hero-font.py [source.woff2]
The source is pinned by checksum. Output remains under the SIL OFL 1.1.
"""

from hashlib import sha256
from io import BytesIO
from math import hypot
from pathlib import Path
import sys
from urllib.request import urlopen

from fontTools import subset
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


SOURCE_URL = "https://fonts.gstatic.com/s/dmsans/v17/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K6z9mXg.woff2"
SOURCE_SHA256 = "468d56b6b25b05b70190b6c233d773f6f1770e8579827ce022a57f03fa8002fb"
OUTPUT = Path(__file__).resolve().parents[1] / "rebrand/assets/fonts/aurora-hero-450.woff2"


def subtract(a, b):
    return (a[0] - b[0], a[1] - b[1])


def cross(a, b):
    return a[0] * b[1] - a[1] * b[0]


def intersection(a, b, c, d):
    first, second = subtract(b, a), subtract(d, c)
    ratio = cross(subtract(c, a), second) / cross(first, second)
    return (a[0] + ratio * first[0], a[1] + ratio * first[1])


def along(point, direction, distance):
    length = hypot(*direction)
    return tuple(point[i] + distance * direction[i] / length for i in (0, 1))


source = Path(sys.argv[1]).read_bytes() if len(sys.argv) > 1 else urlopen(SOURCE_URL, timeout=30).read()
assert sha256(source).hexdigest() == SOURCE_SHA256, "Unexpected font source; review before rebuilding."
font = instantiateVariableFont(TTFont(BytesIO(source)), {"wght": 450}, inplace=True)
cmap = font.getBestCmap()
y_name = cmap[ord("y")]
y = font["glyf"][y_name]
assert y.numberOfContours == 1 and len(y.coordinates) == 10
points = list(y.coordinates)
metrics = font["hmtx"][y_name]
other_glyphs = {
    cmap[ord(char)]: list(font["glyf"][cmap[ord(char)]].coordinates)
    for char in "Beond"
}

# Extend the two outer diagonals to their natural meeting point, replacing
# the short horizontal notch. A six-unit quadratic turn softens that join.
join = intersection(points[0], points[1], points[2], points[3])
enter = along(join, subtract(points[0], join), 6)
leave = along(join, subtract(points[3], join), 6)
pen = TTGlyphPen(None)
pen.moveTo(points[0])
pen.lineTo(enter)
pen.qCurveTo(join, leave)
for point in [points[3], points[4], points[5], points[7], points[8], points[9]]:
    pen.lineTo(point)
pen.closePath()
font["glyf"][y_name] = pen.glyph()
assert font["hmtx"][y_name] == metrics
assert all(list(font["glyf"][name].coordinates) == coords for name, coords in other_glyphs.items())

# Rename the derivative, retain the original copyright, and embed its license.
names = {
    1: "Aurora Hero Sans", 2: "Regular", 3: "1.000;AURORA;AuroraHeroSans-Regular",
    4: "Aurora Hero Sans", 5: "Version 1.000; DM Sans 4.004 derivative",
    6: "AuroraHeroSans-Regular", 16: "Aurora Hero Sans", 17: "Regular",
    13: (OUTPUT.parent / "OFL-DM-Sans.txt").read_text(),
    14: "https://openfontlicense.org/",
}
for name_id, value in names.items():
    font["name"].removeNames(nameID=name_id)
    font["name"].setName(value, name_id, 3, 1, 0x409)

options = subset.Options()
options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
options.name_languages = [0x409]
subsetter = subset.Subsetter(options=options)
subsetter.populate(text="Beyond")
subsetter.subset(font)
font.flavor = "woff2"
font.recalcTimestamp = False
font.save(OUTPUT)
print(f"Built {OUTPUT.name}: {OUTPUT.stat().st_size} bytes, weight 450, advance unchanged.")
