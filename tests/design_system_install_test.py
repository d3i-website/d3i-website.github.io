"""docs/design-system-2/tools/install_copy.py and the placeholder upload ids.

A picture recorded before its first upload, that a preview must still point at, carries a
placeholder id (the MD5 of its bytes) and "placeholder": true in design-system.json. A copy
always uploads it, and the staged index keeps no placeholder flag.

    python3 -I -m unittest discover -s tests -p design_system_install_test.py
"""
import hashlib
import json
import pathlib
import subprocess
import sys
import tempfile
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
TOOL = ROOT / "docs/design-system-2/tools/install_copy.py"
PROJECT = ROOT / "docs/design-system-2/project"


def repo_index():
    return json.loads((PROJECT / "design-system.json").read_text())


def records(index):
    """(key "Group/name", record) for every image the index records, in tile order."""
    for group in index["groups"]:
        grp = index["assetGroups"][group]
        for name in grp.get("order") or list(grp["files"]):
            yield f"{group}/{name}", grp["files"][name]


def run(*args):
    return subprocess.run([sys.executable, "-I", str(TOOL), *args], capture_output=True, text=True, check=True)


def fake_id(path):
    return hashlib.sha1(("upload:" + str(path)).encode()).hexdigest()[:32]


class Placeholders(unittest.TestCase):
    def setUp(self):
        self.placeholders = {key: rec for key, rec in records(repo_index()) if rec.get("placeholder")}
        self.assertTrue(self.placeholders, "the index records no placeholder ids")

    def test_placeholder_records_carry_an_id(self):
        for key, rec in self.placeholders.items():
            self.assertRegex(rec.get("blob", ""), r"^[0-9a-f]{32}$", key)

    def test_placeholders_are_always_uploaded(self):
        # An existing copy that records every file at its current size, the placeholders included
        # and unflagged: everything else is reused, the placeholders are uploaded all the same.
        existing = repo_index()
        for _, rec in records(existing):
            rec.pop("placeholder", None)
            rec.setdefault("blob", "0" * 32)
        with tempfile.TemporaryDirectory() as tmp:
            path = pathlib.Path(tmp) / "existing.json"
            path.write_text(json.dumps(existing))
            out = run("batches", "--existing-index", str(path)).stdout
        listed = [p for line in out.splitlines() if line.startswith("[") for p in json.loads(line)]
        expected = [str(PROJECT / "assets" / key) for key in self.placeholders]
        self.assertEqual(sorted(listed), sorted(expected))

    def test_stage_clears_placeholders(self):
        lines = []
        for key, _ in records(repo_index()):
            path = PROJECT / "assets" / key
            i = fake_id(path)
            lines.append(f'- "{path}" ({path.stat().st_size} bytes, image/webp) → "/_blob/{i}" (id {i})')
        with tempfile.TemporaryDirectory() as tmp:
            uploads = pathlib.Path(tmp) / "uploads.txt"
            uploads.write_text("\n".join(lines))
            out = pathlib.Path(tmp) / "out"
            run("stage", "--uploads", str(uploads), "--out", str(out), "--by", "Test")
            staged = json.loads((out / "project/design-system.json").read_text())
            text = "\n".join(p.read_text() for p in (out / "project/components").rglob("preview.html"))
        for key, rec in records(staged):
            self.assertNotIn("placeholder", rec, key)
        for key, rec in self.placeholders.items():
            new = fake_id(PROJECT / "assets" / key)
            self.assertEqual(dict(records(staged))[key]["blob"], new, key)
            self.assertNotIn(rec["blob"], text, f"{key}: a preview still points at the placeholder")
        self.assertIn(fake_id(PROJECT / "assets/News/export-study-crate-card.webp"), text)


def batch_arrays(*extra):
    out = run("batches", *extra)
    return [json.loads(line) for line in out.stdout.splitlines() if line.startswith("[")]


def uploads_text(skip=()):
    lines = []
    for key, _ in records(repo_index()):
        path = PROJECT / "assets" / key
        if key in skip:
            continue
        i = fake_id(path)
        lines.append(f'- "{path}" ({path.stat().st_size} bytes, image/x) \u2192 "/_blob/{i}" (id {i})')
    return "\n".join(lines)


class Network(unittest.TestCase):
    def test_batches_include_network(self):
        arrays = batch_arrays()
        for arr in arrays:
            self.assertLessEqual(len(arr), 25)
        listed = [p for arr in arrays for p in arr]
        for p in listed:
            self.assertTrue(pathlib.Path(p).is_absolute() and pathlib.Path(p).is_file(), p)
        network = sorted(str(p) for p in (PROJECT / "assets/Network").glob("*.svg"))
        self.assertEqual(len(network), 21)
        self.assertLessEqual(set(network), set(listed))
        self.assertEqual(len(listed), len(set(listed)))
        self.assertEqual(len(listed), sum(1 for _ in records(repo_index())))

    def test_recorded_sizes_match_files(self):
        for key, rec in records(repo_index()):
            self.assertEqual(rec["size"], (PROJECT / "assets" / key).stat().st_size, key)

    def test_stage_with_fake_uploads(self):
        with tempfile.TemporaryDirectory() as tmp:
            uploads = pathlib.Path(tmp) / "uploads.txt"
            uploads.write_text(uploads_text())
            out = pathlib.Path(tmp) / "out"
            run("stage", "--uploads", str(uploads), "--out", str(out), "--by", "Test")
            publish = json.loads((out / "publish.json").read_text())
            staged = json.loads((out / "project/design-system.json").read_text())
        files = publish["files"]
        for key in files:
            self.assertNotIn(key, {"project/tokens.css", "project/manifest.json"})
            self.assertFalse(key.startswith("project/api/"), key)
        self.assertEqual(files["project/components/index.d.ts"]["contentType"], "text/plain")
        for path in (PROJECT / "assets/Network").glob("*.svg"):
            self.assertEqual(staged["assetGroups"]["Network"]["files"][path.name]["blob"], fake_id(path))

    def test_title_defaults_and_resync_keeps_it(self):
        with tempfile.TemporaryDirectory() as tmp:
            uploads = pathlib.Path(tmp) / "uploads.txt"
            uploads.write_text(uploads_text())
            out = pathlib.Path(tmp) / "out"
            run("stage", "--uploads", str(uploads), "--out", str(out), "--by", "Test")
            staged = json.loads((out / "project/design-system.json").read_text())
            self.assertEqual(staged["title"], "datadonation.eu 2026", "the default title")
            staged["title"] = "My copy"
            existing = pathlib.Path(tmp) / "existing.json"
            existing.write_text(json.dumps(staged))
            again = pathlib.Path(tmp) / "again"
            run("stage", "--existing-index", str(existing), "--uploads", str(uploads), "--out", str(again), "--by", "Test",
                "--title", "Ignored")
            resynced = json.loads((again / "project/design-system.json").read_text())
        self.assertEqual(resynced["title"], "My copy", "a re-sync keeps the copy's title")

    def test_stage_refuses_missing_upload(self):
        victim = "Network/globe.svg"
        with tempfile.TemporaryDirectory() as tmp:
            uploads = pathlib.Path(tmp) / "uploads.txt"
            uploads.write_text(uploads_text(skip={victim}))
            r = subprocess.run([sys.executable, "-I", str(TOOL), "stage", "--uploads", str(uploads),
                                "--out", str(pathlib.Path(tmp) / "out"), "--by", "Test"], capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn(victim, r.stderr)


class SvgNormalization(unittest.TestCase):
    """The artifact store rewrites SVGs on upload, so the stored size can differ from the file's."""
    SVG = "Network/lock.svg"
    PNG = "Logos/eyra.png"

    def uploads(self, tmp, key, reported, mime):
        lines = []
        for k, _ in records(repo_index()):
            path = PROJECT / "assets" / k
            i = fake_id(path)
            size = reported if k == key else path.stat().st_size
            kind = mime if k == key else "image/x"
            lines.append(f'- "{path}" ({size} bytes, {kind}) \u2192 "/_blob/{i}" (id {i})')
        f = pathlib.Path(tmp) / "uploads.txt"
        f.write_text("\n".join(lines))
        return f

    def test_stage_accepts_svg_normalization(self):
        repo_size = (PROJECT / "assets" / self.SVG).stat().st_size
        with tempfile.TemporaryDirectory() as tmp:
            uploads = self.uploads(tmp, self.SVG, repo_size + 27, "image/svg+xml")
            out = pathlib.Path(tmp) / "out"
            run("stage", "--uploads", str(uploads), "--out", str(out), "--by", "Test")
            staged = json.loads((out / "project/design-system.json").read_text())
        rec = dict(records(staged))[self.SVG]
        self.assertEqual(rec["size"], repo_size + 27)
        self.assertEqual(rec["source_size"], repo_size)
        self.assertNotIn("source_size", dict(records(staged))["Network/globe.svg"])

    def test_stage_rejects_raster_size_change(self):
        repo_size = (PROJECT / "assets" / self.PNG).stat().st_size
        with tempfile.TemporaryDirectory() as tmp:
            uploads = self.uploads(tmp, self.PNG, repo_size + 1, "image/png")
            r = subprocess.run([sys.executable, "-I", str(TOOL), "stage", "--uploads", str(uploads),
                                "--out", str(pathlib.Path(tmp) / "out"), "--by", "Test"], capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn(self.PNG, r.stderr)

    def existing_listing(self, source_size):
        existing = repo_index()
        for key, rec in records(existing):
            rec.pop("placeholder", None)
            rec.setdefault("blob", "0" * 32)
        rec = dict(records(existing))[self.SVG]
        rec["size"] = rec["size"] + 27
        rec["source_size"] = source_size(rec["size"] - 27)
        with tempfile.TemporaryDirectory() as tmp:
            path = pathlib.Path(tmp) / "existing.json"
            path.write_text(json.dumps(existing))
            out = run("batches", "--existing-index", str(path)).stdout
        return [p for line in out.splitlines() if line.startswith("[") for p in json.loads(line)]

    def test_resync_reuses_normalized_svg(self):
        self.assertNotIn(str(PROJECT / "assets" / self.SVG), self.existing_listing(lambda repo: repo))

    def test_resync_reuploads_edited_svg(self):
        self.assertIn(str(PROJECT / "assets" / self.SVG), self.existing_listing(lambda repo: repo - 5))


if __name__ == "__main__":
    unittest.main()
