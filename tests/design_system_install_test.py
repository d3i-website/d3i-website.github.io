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


if __name__ == "__main__":
    unittest.main()
