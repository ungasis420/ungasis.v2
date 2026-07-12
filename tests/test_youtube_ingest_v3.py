"""Synthetic unit tests for scripts/youtube-ingest-v3.py.

All fixtures live under tempfile.TemporaryDirectory(). Never reads
raw/youtube or knowledge/wiki. Loads the hyphenated script via importlib.
"""
import importlib.util
import io
import json
import os
import re
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parent.parent
SCRIPT_PATH = ROOT / "scripts" / "youtube-ingest-v3.py"

_spec = importlib.util.spec_from_file_location("youtube_ingest_v3", SCRIPT_PATH)
yiv3 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(yiv3)


def make_manifest_entry(file, sha256, ingest="pending", chunk_ids=None,
                         ingested_at=None, source="local-note"):
    return {
        "source": source,
        "file": file,
        "sha256": sha256,
        "kind": "transcript",
        "ingest": ingest,
        "chunk_ids": chunk_ids or [],
        "ingested_at": ingested_at,
        "usage_scope": "personal-use-only",
        "license_note": "YouTube ToS: no redistribution",
    }


class RepoFixtureMixin:
    def make_repo(self, td):
        raw_dir = Path(td) / "raw" / "youtube"
        wiki_dir = Path(td) / "knowledge" / "wiki" / "youtube"
        raw_dir.mkdir(parents=True)
        wiki_dir.mkdir(parents=True)
        manifest_path = raw_dir / "manifest.yml"
        ingest_log = Path(td) / ".ungasis" / "tracking" / "ingest-log.jsonl"
        wiki_log = Path(td) / "knowledge" / "wiki" / "log.md"
        return raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log


class SlugTests(unittest.TestCase):
    def test_basic_slug(self):
        self.assertEqual(yiv3.compute_slug("Karpathy Talk: LLMs 101"),
                          "karpathy-talk-llms-101")

    def test_empty_fallback(self):
        self.assertEqual(yiv3.compute_slug("!!!"), "untitled")
        self.assertEqual(yiv3.compute_slug(""), "untitled")

    def test_truncate_80_chars(self):
        long_stem = "a" * 200
        slug = yiv3.compute_slug(long_stem)
        self.assertLessEqual(len(slug), 80)


class SlugOwnershipTests(unittest.TestCase):
    def test_free_slug_returns_base(self):
        self.assertEqual(yiv3.choose_base_slug("nick-saraev", "raw/youtube/nick.txt", {}),
                          "nick-saraev")

    def test_same_source_reuses_its_slug(self):
        owners = {"mars-token": "raw/youtube/mars.txt"}
        got = yiv3.choose_base_slug("mars-token", "raw/youtube/mars.txt", owners)
        self.assertEqual(got, "mars-token")

    def test_different_source_gets_collision_suffix(self):
        owners = {"mars-token": "raw/youtube/OTHER.txt"}
        got = yiv3.choose_base_slug("mars-token", "raw/youtube/mars.txt", owners)
        self.assertEqual(got, "mars-token-2")

    def test_multiple_different_source_collisions_increment(self):
        owners = {
            "mars-token": "raw/youtube/OTHER1.txt",
            "mars-token-2": "raw/youtube/OTHER2.txt",
        }
        got = yiv3.choose_base_slug("mars-token", "raw/youtube/mars.txt", owners)
        self.assertEqual(got, "mars-token-3")

    def test_ambiguous_ownership_raises(self):
        owners = {"mars-token": None}  # unreadable frontmatter
        with self.assertRaises(yiv3.AmbiguousOwnershipError):
            yiv3.choose_base_slug("mars-token", "raw/youtube/mars.txt", owners)

    def test_chunk_page_stem_uses_distinct_separator(self):
        self.assertEqual(yiv3.chunk_page_stem("mars-token", 0), "mars-token")
        self.assertEqual(yiv3.chunk_page_stem("mars-token", 1), "mars-token--c2")
        self.assertEqual(yiv3.chunk_page_stem("mars-token", 2), "mars-token--c3")


class Sha256Tests(unittest.TestCase):
    def test_stable_across_calls(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td) / "sample.txt"
            p.write_text("hello world " * 50, encoding="utf-8")
            h1 = yiv3.sha256_file(p)
            h2 = yiv3.sha256_file(p)
            self.assertEqual(h1, h2)
            self.assertEqual(len(h1), 64)

    def test_changes_with_content(self):
        with tempfile.TemporaryDirectory() as td:
            p = Path(td) / "sample.txt"
            p.write_text("version one", encoding="utf-8")
            h1 = yiv3.sha256_file(p)
            p.write_text("version two", encoding="utf-8")
            h2 = yiv3.sha256_file(p)
            self.assertNotEqual(h1, h2)


class ManifestValidationTests(unittest.TestCase):
    def test_valid_entry_no_errors(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64)
        self.assertEqual(yiv3.validate_manifest_entry(entry), [])

    def test_missing_fields_detected(self):
        entry = {"file": "raw/youtube/a.txt"}
        errors = yiv3.validate_manifest_entry(entry)
        self.assertIn("missing field: sha256", errors)
        self.assertIn("missing field: ingest", errors)

    def test_invalid_ingest_state(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="bogus")
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("invalid ingest state" in e for e in errors))

    def test_invalid_sha256_format(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "not-a-hash")
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("invalid sha256 format" in e for e in errors))

    def test_wrong_usage_scope_rejected(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64)
        entry["usage_scope"] = "public"
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("usage_scope" in e for e in errors))

    def test_wrong_license_note_rejected(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64)
        entry["license_note"] = "anything goes"
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("license_note" in e for e in errors))

    def test_done_without_chunk_ids_rejected(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="done",
                                     ingested_at="2026-01-01T00:00:00Z")
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("chunk_ids" in e for e in errors))

    def test_pending_with_chunk_ids_rejected(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="pending",
                                     chunk_ids=["w-0001"])
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("chunk_ids" in e for e in errors))

    def test_duplicate_file_entries_rejected(self):
        entries = [
            make_manifest_entry("raw/youtube/a.txt", "a" * 64),
            make_manifest_entry("raw/youtube/a.txt", "b" * 64),
        ]
        errors = yiv3.validate_manifest_entries(entries)
        self.assertTrue(any("duplicate file" in e for e in errors))

    def test_manifest_roundtrip(self):
        entries = [
            make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="done",
                                 chunk_ids=["w-0001", "w-0002"], ingested_at="2026-01-01T00:00:00Z"),
            make_manifest_entry("raw/youtube/b.txt", "b" * 64),
        ]
        text = yiv3.format_manifest_text(entries)
        parsed = yiv3.parse_manifest_text(text)
        self.assertEqual(len(parsed), 2)
        self.assertEqual(parsed[0]["file"], "raw/youtube/a.txt")
        self.assertEqual(parsed[0]["chunk_ids"], ["w-0001", "w-0002"])
        self.assertEqual(parsed[1]["chunk_ids"], [])

    def test_roundtrip_matches_independent_fixture(self):
        """Parse a hand-authored manifest string (not produced by
        format_manifest_text) to avoid mirroring the implementation."""
        fixture = (
            'entries:\n'
            '- source: "https://youtu.be/example123"\n'
            '  file: raw/youtube/example-transcript.txt\n'
            '  sha256: "' + ("0" * 64) + '"\n'
            '  kind: transcript\n'
            '  ingest: done\n'
            '  chunk_ids:\n'
            '    - w-0001\n'
            '    - w-0002\n'
            '  ingested_at: "2026-07-06T12:00:00Z"\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        parsed = yiv3.parse_manifest_text(fixture)
        self.assertEqual(len(parsed), 1)
        entry = parsed[0]
        self.assertEqual(entry["source"], "https://youtu.be/example123")
        self.assertEqual(entry["file"], "raw/youtube/example-transcript.txt")
        self.assertEqual(entry["chunk_ids"], ["w-0001", "w-0002"])
        self.assertEqual(entry["usage_scope"], "personal-use-only")
        self.assertEqual(yiv3.validate_manifest_entry(entry), [])


class ManifestFailClosedTests(unittest.TestCase):
    def test_missing_entries_header_rejected(self):
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text("not_entries:\n- file: x\n")

    def test_unknown_field_rejected(self):
        text = 'entries:\n- file: raw/youtube/a.txt\n  bogus_field: value\n'
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_bad_indentation_rejected(self):
        text = 'entries:\n- file: raw/youtube/a.txt\n sha256: abc\n'  # 1-space indent
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_content_before_first_entry_rejected(self):
        text = 'entries:\nfile: raw/youtube/a.txt\n'
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_line_without_colon_rejected(self):
        text = 'entries:\n- source local-note\n'
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_duplicate_field_in_entry_rejected(self):
        text = ('entries:\n- file: raw/youtube/a.txt\n  file: raw/youtube/b.txt\n')
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)


class ManifestFieldTypeTests(unittest.TestCase):
    """Only chunk_ids is a list field. sha256/ingested_at are nullable
    scalars; source/file/kind/ingest/usage_scope/license_note are required
    (non-null) scalars. These hand-authored fixtures avoid mirroring the
    implementation by never going through format_manifest_text()."""

    def _fixture(self, ingested_at_line, sha256_line, chunk_ids_lines,
                 ingest="pending"):
        return (
            'entries:\n'
            '- source: "https://youtu.be/x"\n'
            '  file: raw/youtube/a.txt\n'
            f'  {sha256_line}\n'
            '  kind: transcript\n'
            f'  ingest: {ingest}\n'
            f'{chunk_ids_lines}'
            f'  {ingested_at_line}\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )

    def test_ingested_at_null_parses_to_none(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertIsNone(entry["ingested_at"])

    def test_sha256_null_parses_to_none(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertIsNone(entry["sha256"])

    def test_chunk_ids_empty_list_form_parses_to_empty_list(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["chunk_ids"], [])

    def test_multiline_chunk_ids_parses_to_list_of_str(self):
        chunk_lines = "  chunk_ids:\n    - w-0001\n    - w-0002\n"
        text = self._fixture('ingested_at: "2026-01-01T00:00:00Z"', "sha256: null",
                              chunk_lines, ingest="done")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["chunk_ids"], ["w-0001", "w-0002"])
        self.assertTrue(all(isinstance(c, str) for c in entry["chunk_ids"]))

    def test_format_parse_roundtrip_preserves_exact_field_types(self):
        entries = [
            make_manifest_entry("raw/youtube/a.txt", None, ingest="pending",
                                 chunk_ids=[], ingested_at=None),
            make_manifest_entry("raw/youtube/b.txt", "b" * 64, ingest="done",
                                 chunk_ids=["w-0001"], ingested_at="2026-01-01T00:00:00Z"),
        ]
        text = yiv3.format_manifest_text(entries)
        parsed = yiv3.parse_manifest_text(text)
        self.assertIsNone(parsed[0]["sha256"])
        self.assertIsNone(parsed[0]["ingested_at"])
        self.assertEqual(parsed[0]["chunk_ids"], [])
        self.assertIsInstance(parsed[0]["chunk_ids"], list)
        self.assertEqual(parsed[1]["chunk_ids"], ["w-0001"])
        self.assertIsInstance(parsed[1]["ingested_at"], str)
        self.assertIsInstance(parsed[1]["sha256"], str)

    def test_required_scalar_null_rejected(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n",
                              ingest="")  # forces "ingest:" -> null via blank value
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_source_null_rejected(self):
        text = (
            'entries:\n'
            '- source: null\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: null\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_ingested_at_list_syntax_rejected(self):
        text = (
            'entries:\n'
            '- source: "x"\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: null\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at:\n'
            '    - w-0001\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_sha256_list_syntax_rejected(self):
        text = (
            'entries:\n'
            '- source: "x"\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256:\n'
            '    - ' + ("a" * 64) + '\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_chunk_ids_scalar_string_rejected(self):
        text = self._fixture("ingested_at: null", "sha256: null",
                              "  chunk_ids: w-0001\n")
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_list_item_outside_chunk_ids_rejected_after_scalar_field(self):
        text = (
            'entries:\n'
            '- source: "x"\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: null\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '    - stray_item\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_validate_manifest_entry_rejects_non_string_ingested_at(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="pending")
        entry["ingested_at"] = 12345
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("ingested_at" in e for e in errors))

    def test_validate_manifest_entry_rejects_non_list_chunk_ids(self):
        entry = make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="pending")
        entry["chunk_ids"] = "w-0001"
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("chunk_ids" in e for e in errors))

    # -- R4: quoted vs unquoted sentinel distinction ------------------------

    def test_unquoted_sha256_null_parses_to_none(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertIsNone(entry["sha256"])

    def test_quoted_sha256_null_parses_to_literal_string_then_invalid_format(self):
        text = self._fixture("ingested_at: null", 'sha256: "null"', "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["sha256"], "null")
        self.assertIsInstance(entry["sha256"], str)
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("invalid sha256 format" in e for e in errors))

    def test_quoted_sha256_empty_string_parses_to_empty_string(self):
        text = self._fixture("ingested_at: null", 'sha256: ""', "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["sha256"], "")
        self.assertIsInstance(entry["sha256"], str)

    def test_unquoted_ingested_at_null_parses_to_none(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertIsNone(entry["ingested_at"])

    def test_quoted_ingested_at_null_parses_to_literal_string(self):
        text = self._fixture('ingested_at: "null"', "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["ingested_at"], "null")
        self.assertIsInstance(entry["ingested_at"], str)
        # A literal "null" is a non-empty string, so it passes the
        # type/emptiness checks (it is not treated as the None sentinel).
        # It DOES still trip the unrelated ingest-state consistency rule
        # (ingest=pending requires null ingested_at) — that is correct,
        # separate behavior, not a type/format defect.
        errors = yiv3.validate_manifest_entry(entry)
        self.assertFalse(any("must be null or a string" in e for e in errors))
        self.assertFalse(any("empty string" in e for e in errors))

    def test_quoted_ingested_at_empty_string_fails_validation(self):
        text = self._fixture('ingested_at: ""', "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["ingested_at"], "")
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("ingested_at" in e and "empty" in e for e in errors))

    def test_quoted_required_scalar_empty_string_parses_then_rejected_by_validation(self):
        text = (
            'entries:\n'
            '- source: ""\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: null\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        entry = yiv3.parse_manifest_text(text)[0]
        # Parser accepts the literal empty string (not misreported as null).
        self.assertEqual(entry["source"], "")
        errors = yiv3.validate_manifest_entry(entry)
        self.assertTrue(any("source" in e and "empty" in e for e in errors))
        self.assertFalse(any("null" in e for e in errors))

    def test_quoted_bracket_list_marker_remains_literal_string_on_scalar_field(self):
        text = (
            'entries:\n'
            '- source: "[]"\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: null\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["source"], "[]")
        self.assertIsInstance(entry["source"], str)

    def test_unquoted_bracket_list_marker_rejected_on_scalar_field(self):
        text = (
            'entries:\n'
            '- source: "x"\n'
            '  file: raw/youtube/a.txt\n'
            '  sha256: []\n'
            '  kind: transcript\n'
            '  ingest: pending\n'
            '  chunk_ids: []\n'
            '  ingested_at: null\n'
            '  usage_scope: personal-use-only\n'
            '  license_note: "YouTube ToS: no redistribution"\n'
        )
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_chunk_ids_unquoted_empty_list_remains_empty_list(self):
        text = self._fixture("ingested_at: null", "sha256: null", "  chunk_ids: []\n")
        entry = yiv3.parse_manifest_text(text)[0]
        self.assertEqual(entry["chunk_ids"], [])
        self.assertIsInstance(entry["chunk_ids"], list)

    def test_chunk_ids_quoted_bracket_marker_rejected(self):
        text = self._fixture("ingested_at: null", "sha256: null",
                              '  chunk_ids: "[]"\n')
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_unmatched_leading_quote_rejected(self):
        text = self._fixture("ingested_at: null", 'sha256: "abc', "  chunk_ids: []\n")
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_unmatched_trailing_quote_rejected(self):
        text = self._fixture("ingested_at: null", 'sha256: abc"', "  chunk_ids: []\n")
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)


class ChunkingTests(unittest.TestCase):
    def test_chunk_size_and_overlap(self):
        words = [f"word{i}" for i in range(120)]
        text = " ".join(words)
        chunks = yiv3.chunk_text(text, chunk_tokens=50, overlap=10)
        first_words = chunks[0].split()
        second_words = chunks[1].split()
        self.assertEqual(len(first_words), 50)
        self.assertEqual(first_words[-10:], second_words[:10])

    def test_short_text_single_chunk(self):
        text = "just a few words here"
        chunks = yiv3.chunk_text(text, chunk_tokens=50, overlap=10)
        self.assertEqual(len(chunks), 1)
        self.assertEqual(chunks[0], text)

    def test_empty_text_no_chunks(self):
        self.assertEqual(yiv3.chunk_text("   "), [])

    def test_exact_boundary_no_infinite_loop(self):
        words = [f"w{i}" for i in range(100)]
        text = " ".join(words)
        chunks = yiv3.chunk_text(text, chunk_tokens=50, overlap=10)
        # step=40; i=0 -> [0:50]; i=40 -> [40:90] (i+50=90<100); i=80 -> [80:100] break
        self.assertEqual(len(chunks), 3)
        self.assertEqual(chunks[-1].split(), words[80:100])


class TranscriptPathValidationTests(unittest.TestCase):
    def test_valid_path_accepted(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            raw_dir.mkdir(parents=True)
            f = raw_dir / "ok.txt"
            f.write_text("hello", encoding="utf-8")
            resolved = yiv3.validate_transcript_path(str(f), raw_dir)
            self.assertEqual(resolved, f.resolve())

    def test_traversal_outside_raw_dir_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            raw_dir.mkdir(parents=True)
            outside = Path(td) / "outside.txt"
            outside.write_text("hello", encoding="utf-8")
            traversal_path = raw_dir / ".." / ".." / "outside.txt"
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(traversal_path), raw_dir)

    def test_missing_path_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            raw_dir.mkdir(parents=True)
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(raw_dir / "nope.txt"), raw_dir)

    def test_directory_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            (raw_dir / "subdir").mkdir(parents=True)
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(raw_dir / "subdir"), raw_dir)

    def test_wrong_extension_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            raw_dir.mkdir(parents=True)
            f = raw_dir / "notes.md"
            f.write_text("hello", encoding="utf-8")
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(f), raw_dir)

    def test_watch_list_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            raw_dir.mkdir(parents=True)
            f = raw_dir / yiv3.WATCH_LIST_NAME
            f.write_text("hello", encoding="utf-8")
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(f), raw_dir)

    def test_outside_sibling_directory_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir = Path(td) / "raw" / "youtube"
            other_dir = Path(td) / "raw" / "other"
            raw_dir.mkdir(parents=True)
            other_dir.mkdir(parents=True)
            f = other_dir / "sneaky.txt"
            f.write_text("hello", encoding="utf-8")
            with self.assertRaises(ValueError):
                yiv3.validate_transcript_path(str(f), raw_dir)


class PlanAndExecuteTests(RepoFixtureMixin, unittest.TestCase):
    def test_repeated_plan_zero_new_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "sample-video.txt"
            transcript.write_text("synthetic transcript content. " * 30, encoding="utf-8")

            entries = []
            plan1 = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            result1 = yiv3.execute_plan(plan1, entries, wiki_dir=wiki_dir,
                                         manifest_path=manifest_path,
                                         ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertGreater(len(result1["pages_written"]), 0)

            entries_after = yiv3.read_manifest(manifest_path)
            plan2 = yiv3.plan_run([transcript], entries_after, raw_dir=raw_dir)
            self.assertTrue(all(item["action"] == "skip" for item in plan2))
            result2 = yiv3.execute_plan(plan2, entries_after, wiki_dir=wiki_dir,
                                         manifest_path=manifest_path,
                                         ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(len(result2["pages_written"]), 0)

    def test_dry_run_zero_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "another-video.txt"
            transcript.write_text("synthetic transcript content. " * 30, encoding="utf-8")

            entries = []
            plan = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")
            self.assertFalse(wiki_dir.exists() and any(wiki_dir.glob("*.md")))
            self.assertFalse(manifest_path.exists())

    def test_empty_transcript_skipped_not_ingested(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "tiny.txt"
            transcript.write_text("too short", encoding="utf-8")

            entries = []
            plan = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            result = yiv3.execute_plan(plan, entries, wiki_dir=wiki_dir,
                                        manifest_path=manifest_path,
                                        ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(result["pages_written"], [])
            self.assertIn("tiny.txt", [Path(s).name for s in result["skipped"]])

    def test_jsonl_log_schema(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "log-check.txt"
            transcript.write_text("synthetic transcript content. " * 30, encoding="utf-8")

            entries = []
            plan = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            yiv3.execute_plan(plan, entries, wiki_dir=wiki_dir,
                               manifest_path=manifest_path,
                               ingest_log_path=ingest_log, wiki_log_path=wiki_log)

            lines = ingest_log.read_text(encoding="utf-8").strip().splitlines()
            self.assertEqual(len(lines), 1)
            record = json.loads(lines[0])
            self.assertEqual(set(record.keys()), {"file", "sha256", "status", "reason", "ts"})
            self.assertEqual(record["status"], "success")

    def test_non_utf8_failure_no_partial_output(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "bad-encoding.txt"
            transcript.write_bytes(b"\xff\xfe not valid utf-8 " * 20)

            entries = []
            plan = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            result = yiv3.execute_plan(plan, entries, wiki_dir=wiki_dir,
                                        manifest_path=manifest_path,
                                        ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(result["pages_written"], [])
            self.assertTrue(any("bad-encoding.txt" in f for f in result["failed"]))
            self.assertFalse(any(wiki_dir.glob("*.md")))
            entries_after = yiv3.read_manifest(manifest_path)
            matching = [e for e in entries_after if e.get("file", "").endswith("bad-encoding.txt")]
            self.assertEqual(matching, [])

    def test_no_url_network_path(self):
        source = SCRIPT_PATH.read_text(encoding="utf-8")
        for forbidden in ("urllib", "requests", "socket", "http.client", "ftplib"):
            self.assertNotIn(forbidden, source)


class SlugReuseAndCollisionIntegrationTests(RepoFixtureMixin, unittest.TestCase):
    def test_changed_same_source_reuses_slug_and_removes_owned_old_pages(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "growing-video.txt"

            # First version: long enough for 2 chunks (chunk_tokens default 500,
            # so use enough words to force 2 chunks by monkeypatching chunk size
            # via direct execute_plan call is complex; instead verify single-chunk
            # reuse, which already proves same-file-slug-reuse across content change.
            transcript.write_text("first version content. " * 30, encoding="utf-8")
            entries = []
            plan1 = yiv3.plan_run([transcript], entries, raw_dir=raw_dir)
            result1 = yiv3.execute_plan(plan1, entries, wiki_dir=wiki_dir,
                                         manifest_path=manifest_path,
                                         ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(len(result1["pages_written"]), 1)
            first_page = Path(result1["pages_written"][0])
            self.assertEqual(first_page.stem, "growing-video")

            # Change content -> different sha256, same filename. The prior
            # entry is ingest=done, so plan_run correctly refuses until an
            # explicit rollback resets it to pending (spec §11 workflow).
            transcript.write_text("second, completely different version content. " * 30,
                                   encoding="utf-8")
            entries_after = yiv3.read_manifest(manifest_path)
            plan_refuse = yiv3.plan_run([transcript], entries_after, raw_dir=raw_dir)
            self.assertEqual(plan_refuse[0]["action"], "refuse")

            old_chunk_ids = entries_after[0]["chunk_ids"]
            yiv3.rollback_chunks(old_chunk_ids, entries_after, wiki_dir)
            self.assertFalse(first_page.exists())  # rollback removed the owned page

            plan2 = yiv3.plan_run([transcript], entries_after, raw_dir=raw_dir)
            self.assertEqual(plan2[0]["action"], "ingest")  # now pending -> re-ingest allowed
            result2 = yiv3.execute_plan(plan2, entries_after, wiki_dir=wiki_dir,
                                         manifest_path=manifest_path,
                                         ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(len(result2["pages_written"]), 1)
            second_page = Path(result2["pages_written"][0])
            # Same slug reused, not a "-2" duplicate.
            self.assertEqual(second_page.stem, "growing-video")
            self.assertEqual(second_page, first_page)
            # Only one page for this source exists in wiki_dir (no leftover duplicate).
            all_pages = list(wiki_dir.glob("*.md"))
            self.assertEqual(len(all_pages), 1)

    def test_two_different_sources_collision_uses_suffix(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            t1 = raw_dir / "same-name.txt"
            t1.write_text("first source content here. " * 30, encoding="utf-8")

            entries = []
            plan1 = yiv3.plan_run([t1], entries, raw_dir=raw_dir)
            result1 = yiv3.execute_plan(plan1, entries, wiki_dir=wiki_dir,
                                         manifest_path=manifest_path,
                                         ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(Path(result1["pages_written"][0]).stem, "same-name")

            # Force a synthetic ownership collision: a second, unrelated source
            # whose computed slug would also be "same-name" (simulated directly
            # via choose_base_slug rather than crafting two files with the same
            # stem, since discover_transcripts globs unique filenames).
            owners = yiv3.scan_wiki_ownership(wiki_dir)
            got = yiv3.choose_base_slug("same-name", "raw/youtube/OTHER-FILE.txt", owners)
            self.assertEqual(got, "same-name-2")


class RollbackTests(RepoFixtureMixin, unittest.TestCase):
    def test_rollback_deletes_only_owned_pages(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            page_a = wiki_dir / "a.md"
            page_a.write_text(yiv3.build_page("raw/youtube/a.txt", "a" * 64, "w-0001",
                                               "2026-01-01T00:00:00+00:00", "body a"),
                               encoding="utf-8")
            page_b = wiki_dir / "b.md"
            page_b.write_text(yiv3.build_page("raw/youtube/b.txt", "b" * 64, "w-0002",
                                               "2026-01-01T00:00:00+00:00", "body b"),
                               encoding="utf-8")
            entries = [
                make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="done",
                                     chunk_ids=["w-0001"], ingested_at="2026-01-01T00:00:00Z"),
                make_manifest_entry("raw/youtube/b.txt", "b" * 64, ingest="done",
                                     chunk_ids=["w-0002"], ingested_at="2026-01-01T00:00:00Z"),
            ]
            result = yiv3.rollback_chunks(["w-0001"], entries, wiki_dir)
            self.assertEqual(result["deleted_pages"], [str(page_a)])
            self.assertFalse(page_a.exists())
            self.assertTrue(page_b.exists())
            self.assertEqual(entries[0]["ingest"], "pending")
            self.assertEqual(entries[1]["ingest"], "done")

    def test_rollback_ignores_coincidental_chunk_id_wrong_source(self):
        """A page sharing the chunk_id string but with a source that isn't
        one of the affected manifest entries must NOT be deleted."""
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            rogue_page = wiki_dir / "rogue.md"
            rogue_page.write_text(yiv3.build_page("raw/youtube/UNRELATED.txt", "c" * 64,
                                                   "w-0001", "2026-01-01T00:00:00+00:00",
                                                   "body"), encoding="utf-8")
            entries = [
                make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="done",
                                     chunk_ids=["w-0001"], ingested_at="2026-01-01T00:00:00Z"),
            ]
            result = yiv3.rollback_chunks(["w-0001"], entries, wiki_dir)
            self.assertEqual(result["deleted_pages"], [])
            self.assertTrue(rogue_page.exists())


class AtomicWriteTests(unittest.TestCase):
    def test_replace_failure_leaves_no_temp_or_partial_output(self):
        with tempfile.TemporaryDirectory() as td:
            target = Path(td) / "page.md"
            tmp_path = Path(td) / "page.md.tmp"
            with mock.patch.object(Path, "replace", side_effect=OSError("simulated failure")):
                with self.assertRaises(OSError):
                    yiv3.write_text_atomic(target, "content")
            self.assertFalse(target.exists())
            self.assertFalse(tmp_path.exists())

    def test_successful_write_leaves_no_temp_file(self):
        with tempfile.TemporaryDirectory() as td:
            target = Path(td) / "page.md"
            yiv3.write_text_atomic(target, "content")
            self.assertTrue(target.exists())
            self.assertFalse((Path(td) / "page.md.tmp").exists())


class MainCliTests(RepoFixtureMixin, unittest.TestCase):
    def _run_main(self, argv, monkeypatch_paths):
        """Patch module-level path constants and run main(argv), capturing exit code."""
        with mock.patch.multiple(
            yiv3,
            RAW_DIR=monkeypatch_paths["raw_dir"],
            MANIFEST_PATH=monkeypatch_paths["manifest_path"],
            WIKI_YT_DIR=monkeypatch_paths["wiki_dir"],
            INGEST_LOG=monkeypatch_paths["ingest_log"],
            WIKI_LOG=monkeypatch_paths["wiki_log"],
        ):
            with redirect_stdout(io.StringIO()):
                return yiv3.main(argv)

    def test_dry_run_end_to_end_zero_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            (raw_dir / "clip.txt").write_text("synthetic content here. " * 30, encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--dry-run", "--init"], paths)
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertFalse(any(wiki_dir.glob("*.md")))

    def test_resume_without_manifest_is_validation_error(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--resume"], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_resume_nothing_to_resume(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            yiv3.write_manifest(manifest_path, [
                make_manifest_entry("raw/youtube/done.txt", "a" * 64, ingest="done",
                                     chunk_ids=["w-0001"], ingested_at="2026-01-01T00:00:00Z"),
            ])
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            buf = io.StringIO()
            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(buf):
                    code = yiv3.main(["--resume"])
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertEqual(buf.getvalue().strip(), "NOTHING TO RESUME")
            self.assertFalse(any(wiki_dir.glob("*.md")))
            self.assertFalse(ingest_log.exists())

    def test_resume_with_init_is_invalid_combination(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--resume", "--init"], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_resume_with_transcript_is_invalid_combination(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "x.txt"
            f.write_text("hello", encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--resume", "--transcript", str(f)], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_resume_init_dry_run_is_invalid_combination(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--resume", "--init", "--dry-run"], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_resume_transcript_dry_run_is_invalid_combination(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "x.txt"
            f.write_text("hello", encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--resume", "--transcript", str(f), "--dry-run"], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_missing_manifest_without_init_is_validation_error(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main([], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_bad_transcript_path_is_validation_error(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--init", "--transcript", str(raw_dir / "nope.txt")], paths)
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

    def test_successful_ingest_end_to_end_exit_ok(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            (raw_dir / "clip.txt").write_text("synthetic content here. " * 30, encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--init"], paths)
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertTrue(any(wiki_dir.glob("*.md")))

    def test_refusal_is_logged_to_jsonl(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "clip.txt"
            transcript.write_text("original content here. " * 30, encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            # First run ingests it and records a sha in the manifest.
            code1 = self._run_main(["--init"], paths)
            self.assertEqual(code1, yiv3.EXIT_OK)
            # Mutate content without going through the tool -> sha mismatch on next plan.
            transcript.write_text("mutated content here instead. " * 30, encoding="utf-8")
            code2 = self._run_main([], paths)
            self.assertEqual(code2, yiv3.EXIT_VALIDATION_ERROR)
            lines = ingest_log.read_text(encoding="utf-8").strip().splitlines()
            records = [json.loads(l) for l in lines]
            self.assertTrue(any(r["reason"] == "sha_mismatch" and r["status"] == "failed"
                                 for r in records))

    def test_normal_dry_run_with_refusal_is_validation_error_and_writes_nothing(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            transcript = raw_dir / "clip.txt"
            transcript.write_text("original content here. " * 30, encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code1 = self._run_main(["--init"], paths)
            self.assertEqual(code1, yiv3.EXIT_OK)
            manifest_before = manifest_path.read_text(encoding="utf-8")
            log_lines_before = ingest_log.read_text(encoding="utf-8").count("\n")

            transcript.write_text("mutated content here instead. " * 30, encoding="utf-8")
            code2 = self._run_main(["--dry-run"], paths)
            # A dry-run plan containing a refusal is a validation error
            # (spec §2b: "SHA refusal ... 2"), even though it still
            # performs zero writes (dry-run never logs or promotes).
            self.assertEqual(code2, yiv3.EXIT_VALIDATION_ERROR)
            self.assertEqual(ingest_log.read_text(encoding="utf-8").count("\n"), log_lines_before)
            self.assertEqual(manifest_path.read_text(encoding="utf-8"), manifest_before)

    def test_valid_normal_dry_run_is_exit_ok_zero_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            (raw_dir / "clip.txt").write_text("content here. " * 30, encoding="utf-8")
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            code = self._run_main(["--init", "--dry-run"], paths)
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertFalse(any(wiki_dir.glob("*.md")))
            self.assertFalse(ingest_log.exists())


class ManifestSourcePathIdentityTests(unittest.TestCase):
    """validate_manifest_source_path must treat the manifest 'file:' value
    as an exact repo-relative identity — never truncated, never remapped."""

    def _make_root(self, td):
        root = Path(td)
        raw_dir = root / "raw" / "youtube"
        raw_dir.mkdir(parents=True)
        return root, raw_dir

    def test_traversal_rejected_even_when_same_basename_exists_in_raw_dir(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            client_dir = root / "client"
            client_dir.mkdir()
            (client_dir / "clip.txt").write_text("secret client content", encoding="utf-8")
            # A same-named, unrelated file legitimately lives in raw_dir too.
            (raw_dir / "clip.txt").write_text("legit content", encoding="utf-8")

            with self.assertRaises(ValueError):
                yiv3.validate_manifest_source_path("../../client/clip.txt", root, raw_dir)

    def test_absolute_outside_path_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            outside = Path(td) / "outside.txt"
            outside.write_text("hello", encoding="utf-8")
            with self.assertRaises(ValueError):
                yiv3.validate_manifest_source_path(str(outside), root, raw_dir)

    def test_nested_path_resolves_to_exact_nested_file(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            sub = raw_dir / "sub"
            sub.mkdir()
            nested = sub / "clip.txt"
            nested.write_text("nested content", encoding="utf-8")

            resolved = yiv3.validate_manifest_source_path(
                "raw/youtube/sub/clip.txt", root, raw_dir)
            self.assertEqual(resolved, nested.resolve())

    def test_nested_path_never_falls_back_to_root_same_named_file(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            sub = raw_dir / "sub"
            sub.mkdir()
            nested = sub / "clip.txt"
            nested.write_text("nested content", encoding="utf-8")
            root_level = raw_dir / "clip.txt"
            root_level.write_text("root-level content (different file)", encoding="utf-8")

            resolved = yiv3.validate_manifest_source_path(
                "raw/youtube/sub/clip.txt", root, raw_dir)
            self.assertEqual(resolved, nested.resolve())
            self.assertNotEqual(resolved, root_level.resolve())

    def test_two_same_basename_paths_never_collapse(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            (raw_dir / "a").mkdir()
            (raw_dir / "b").mkdir()
            file_a = raw_dir / "a" / "clip.txt"
            file_b = raw_dir / "b" / "clip.txt"
            file_a.write_text("content A", encoding="utf-8")
            file_b.write_text("content B", encoding="utf-8")

            resolved_a = yiv3.validate_manifest_source_path(
                "raw/youtube/a/clip.txt", root, raw_dir)
            resolved_b = yiv3.validate_manifest_source_path(
                "raw/youtube/b/clip.txt", root, raw_dir)
            self.assertNotEqual(resolved_a, resolved_b)
            self.assertEqual(resolved_a, file_a.resolve())
            self.assertEqual(resolved_b, file_b.resolve())

    def test_symlink_escape_rejected_when_supported(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            outside = root / "outside_target.txt"
            outside.write_text("outside content", encoding="utf-8")
            link_path = raw_dir / "linked.txt"
            try:
                os.symlink(outside, link_path)
            except (OSError, NotImplementedError):
                self.skipTest("symlink creation not supported/permitted on this OS")

            with self.assertRaises(ValueError):
                yiv3.validate_manifest_source_path("raw/youtube/linked.txt", root, raw_dir)

    def test_empty_value_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            with self.assertRaises(ValueError):
                yiv3.validate_manifest_source_path("", root, raw_dir)

    def test_error_message_references_original_stored_value(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            stored = "../../client/clip.txt"
            with self.assertRaises(ValueError) as ctx:
                yiv3.validate_manifest_source_path(stored, root, raw_dir)
            self.assertIn(stored, str(ctx.exception))

    def test_resume_preflight_rejects_traversal_end_to_end(self):
        """Integration check: the actual resume_preflight() call path (not
        just the isolated validator) must reject a traversal manifest
        entry rather than silently substituting a same-named raw_dir file."""
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            client_dir = root / "client"
            client_dir.mkdir()
            (client_dir / "clip.txt").write_text("secret", encoding="utf-8")
            (raw_dir / "clip.txt").write_text("legit", encoding="utf-8")

            with mock.patch.object(yiv3, "ROOT", root):
                entries = [make_manifest_entry("../../client/clip.txt", "", ingest="pending")]
                plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "invalid")

    def test_resume_preflight_uses_exact_nested_path(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            sub = raw_dir / "sub"
            sub.mkdir()
            nested = sub / "clip.txt"
            nested.write_text("nested content here. " * 30, encoding="utf-8")

            with mock.patch.object(yiv3, "ROOT", root):
                entries = [make_manifest_entry("raw/youtube/sub/clip.txt", "", ingest="pending")]
                plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")
            self.assertEqual(plan[0]["path"], nested.resolve())


class ReservedWindowsDeviceNameTests(unittest.TestCase):
    """validate_manifest_source_path must reject Windows reserved device
    names (CON, PRN, AUX, NUL, COM1-9, LPT1-9) regardless of case or a
    trailing extension like '.txt' — these are unsafe filenames on
    Windows even when they look like an ordinary text file."""

    def _make_root(self, td):
        root = Path(td)
        raw_dir = root / "raw" / "youtube"
        raw_dir.mkdir(parents=True)
        return root, raw_dir

    def test_reserved_device_names_rejected(self):
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            for name in ("CON.txt", "prn.txt", "AUX.txt", "NUL.txt",
                         "COM1.txt", "LPT1.txt"):
                with self.assertRaises(ValueError, msg=name):
                    yiv3.validate_manifest_source_path(
                        f"raw/youtube/{name}", root, raw_dir)

    def test_resume_preflight_refuses_reserved_device_name_source(self):
        """spec §2a PREFLIGHT: a reserved source such as CON.txt must be
        refused before any write, exercised via the real resume_preflight()
        call path rather than the isolated validator."""
        with tempfile.TemporaryDirectory() as td:
            root, raw_dir = self._make_root(td)
            with mock.patch.object(yiv3, "ROOT", root):
                entries = [make_manifest_entry("raw/youtube/CON.txt", "",
                                                ingest="pending")]
                plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "invalid")
            self.assertIn("reserved device name", plan[0]["reason"])


class ResumeTests(RepoFixtureMixin, unittest.TestCase):
    def test_select_only_pending_and_error_in_manifest_order(self):
        entries = [
            make_manifest_entry("raw/youtube/a.txt", "a" * 64, ingest="done",
                                 chunk_ids=["w-0001"], ingested_at="2026-01-01T00:00:00Z"),
            make_manifest_entry("raw/youtube/b.txt", "b" * 64, ingest="pending"),
            make_manifest_entry("raw/youtube/c.txt", "c" * 64, ingest="skipped"),
            make_manifest_entry("raw/youtube/d.txt", "d" * 64, ingest="error"),
        ]
        eligible = yiv3.select_resume_entries(entries)
        self.assertEqual([e["file"] for e in eligible],
                          ["raw/youtube/b.txt", "raw/youtube/d.txt"])

    def test_unlisted_files_are_never_discovered(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            # Only "listed.txt" is in the manifest; "unlisted.txt" exists on
            # disk but must never be picked up by --resume.
            (raw_dir / "listed.txt").write_text("content. " * 30, encoding="utf-8")
            (raw_dir / "unlisted.txt").write_text("content. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/listed.txt", "", ingest="pending")]
            eligible = yiv3.select_resume_entries(entries)
            plan = yiv3.resume_preflight(eligible, raw_dir)
            self.assertEqual(len(plan), 1)
            self.assertEqual(plan[0]["entry"]["file"], "raw/youtube/listed.txt")

    def test_hash_rule_null_stored_permits(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "x.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/x.txt", None, ingest="pending")]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")

    def test_hash_rule_matching_stored_permits(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "x.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            sha = yiv3.sha256_file(f)
            entries = [make_manifest_entry("raw/youtube/x.txt", sha, ingest="pending")]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")

    def test_hash_rule_mismatch_refuses(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "x.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/x.txt", "f" * 64, ingest="pending")]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "refuse")
            self.assertEqual(plan[0]["reason"], "sha_mismatch")

    def test_one_bad_eligible_path_blocks_whole_batch(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            good = raw_dir / "good.txt"
            good.write_text("content here. " * 30, encoding="utf-8")
            entries = [
                make_manifest_entry("raw/youtube/good.txt", "", ingest="pending"),
                make_manifest_entry("raw/youtube/missing.txt", "", ingest="pending"),
            ]
            plan = yiv3.resume_preflight(entries, raw_dir)
            actions = {p["entry"]["file"]: p["action"] for p in plan}
            self.assertEqual(actions["raw/youtube/good.txt"], "ingest")
            self.assertEqual(actions["raw/youtube/missing.txt"], "invalid")
            # main() must treat this as blocking the WHOLE batch, not just
            # the bad entry — verified via the end-to-end tests below.

    def test_state_transitions_success_short_runtime(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            ok_file = raw_dir / "ok.txt"
            ok_file.write_text("content here. " * 30, encoding="utf-8")
            short_file = raw_dir / "short.txt"
            short_file.write_text("too short", encoding="utf-8")
            bad_file = raw_dir / "bad.txt"
            bad_file.write_bytes(b"\xff\xfe not valid utf-8 " * 20)

            entries = [
                make_manifest_entry("raw/youtube/ok.txt", "", ingest="pending"),
                make_manifest_entry("raw/youtube/short.txt", "", ingest="error"),
                make_manifest_entry("raw/youtube/bad.txt", "", ingest="pending"),
            ]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertTrue(all(p["action"] == "ingest" for p in plan))
            yiv3.execute_resume(plan, entries, wiki_dir=wiki_dir, manifest_path=manifest_path,
                                 ingest_log_path=ingest_log, wiki_log_path=wiki_log)

            by_file = {e["file"]: e for e in entries}
            self.assertEqual(by_file["raw/youtube/ok.txt"]["ingest"], "done")
            self.assertEqual(by_file["raw/youtube/short.txt"]["ingest"], "skipped")
            self.assertEqual(by_file["raw/youtube/bad.txt"]["ingest"], "error")
            self.assertEqual(by_file["raw/youtube/bad.txt"]["chunk_ids"], [])
            self.assertIsNone(by_file["raw/youtube/bad.txt"]["ingested_at"])

    def test_failed_batch_preserves_all_original_states(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            good = raw_dir / "good.txt"
            good.write_text("content here. " * 30, encoding="utf-8")
            entries = [
                make_manifest_entry("raw/youtube/good.txt", "", ingest="pending"),
                make_manifest_entry("raw/youtube/missing.txt", "", ingest="error"),
            ]
            paths = dict(raw_dir=raw_dir, manifest_path=manifest_path, wiki_dir=wiki_dir,
                         ingest_log=ingest_log, wiki_log=wiki_log)
            yiv3.write_manifest(manifest_path, entries)

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(io.StringIO()):
                    code = yiv3.main(["--resume"])
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)

            entries_after = yiv3.read_manifest(manifest_path)
            by_file = {e["file"]: e for e in entries_after}
            # Neither entry was promoted; both preserved exactly as before.
            self.assertEqual(by_file["raw/youtube/good.txt"]["ingest"], "pending")
            self.assertEqual(by_file["raw/youtube/missing.txt"]["ingest"], "error")
            self.assertFalse(any(wiki_dir.glob("*.md")))

            # And the blocking failure was logged (not dry-run).
            lines = ingest_log.read_text(encoding="utf-8").strip().splitlines()
            records = [json.loads(l) for l in lines]
            self.assertTrue(any(r["file"] == "raw/youtube/missing.txt" for r in records))

    def test_resume_dry_run_writes_nothing_anywhere(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            yiv3.write_manifest(manifest_path, entries)
            manifest_before = manifest_path.read_text(encoding="utf-8")

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(io.StringIO()):
                    code = yiv3.main(["--resume", "--dry-run"])
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertFalse(any(wiki_dir.glob("*.md")))
            self.assertFalse(ingest_log.exists())
            self.assertFalse(wiki_log.exists())
            self.assertEqual(manifest_path.read_text(encoding="utf-8"), manifest_before)

    def test_resume_dry_run_with_blocking_refusal_is_validation_error_zero_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "f" * 64, ingest="pending")]
            yiv3.write_manifest(manifest_path, entries)
            manifest_before = manifest_path.read_text(encoding="utf-8")

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(io.StringIO()):
                    code = yiv3.main(["--resume", "--dry-run"])
            # A dry-run resume plan containing a sha_mismatch refusal is a
            # validation error (spec §2b), while still writing nothing.
            self.assertEqual(code, yiv3.EXIT_VALIDATION_ERROR)
            self.assertFalse(ingest_log.exists())
            self.assertEqual(manifest_path.read_text(encoding="utf-8"), manifest_before)

    def test_valid_resume_dry_run_is_exit_ok_zero_writes(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            yiv3.write_manifest(manifest_path, entries)
            manifest_before = manifest_path.read_text(encoding="utf-8")

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(io.StringIO()):
                    code = yiv3.main(["--resume", "--dry-run"])
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertFalse(any(wiki_dir.glob("*.md")))
            self.assertFalse(ingest_log.exists())
            self.assertEqual(manifest_path.read_text(encoding="utf-8"), manifest_before)

    def test_successful_resume_end_to_end(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            yiv3.write_manifest(manifest_path, entries)

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with redirect_stdout(io.StringIO()):
                    code = yiv3.main(["--resume"])
            self.assertEqual(code, yiv3.EXIT_OK)
            self.assertTrue(any(wiki_dir.glob("*.md")))
            entries_after = yiv3.read_manifest(manifest_path)
            self.assertEqual(entries_after[0]["ingest"], "done")

    def test_file_disappears_after_preflight_is_controlled_read_error(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")

            f.unlink()  # simulate disappearance between preflight and execution

            result = yiv3.execute_resume(plan, entries, wiki_dir=wiki_dir,
                                          manifest_path=manifest_path,
                                          ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(result["failed"], ["raw/youtube/clip.txt"])
            by_file = {e["file"]: e for e in entries}
            self.assertEqual(by_file["raw/youtube/clip.txt"]["ingest"], "error")
            self.assertEqual(by_file["raw/youtube/clip.txt"]["chunk_ids"], [])
            self.assertIsNone(by_file["raw/youtube/clip.txt"]["ingested_at"])

            lines = ingest_log.read_text(encoding="utf-8").strip().splitlines()
            records = [json.loads(l) for l in lines]
            self.assertTrue(any(r["reason"] == "read_error" for r in records))

    def test_mocked_os_error_on_read_is_controlled_failure(self):
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            plan = yiv3.resume_preflight(entries, raw_dir)
            self.assertEqual(plan[0]["action"], "ingest")

            with mock.patch.object(Path, "read_bytes", side_effect=PermissionError("denied")):
                result = yiv3.execute_resume(plan, entries, wiki_dir=wiki_dir,
                                              manifest_path=manifest_path,
                                              ingest_log_path=ingest_log, wiki_log_path=wiki_log)
            self.assertEqual(result["failed"], ["raw/youtube/clip.txt"])
            by_file = {e["file"]: e for e in entries}
            self.assertEqual(by_file["raw/youtube/clip.txt"]["ingest"], "error")

            lines = ingest_log.read_text(encoding="utf-8").strip().splitlines()
            records = [json.loads(l) for l in lines]
            self.assertTrue(any(r["reason"] == "read_error" for r in records))

    def test_resume_read_failure_end_to_end_sets_error_state(self):
        # read_bytes must succeed once (preflight's sha256_file call) and
        # only fail on the second call (the actual ingest-time read), so
        # this exercises _ingest_one_file's OSError path specifically.
        with tempfile.TemporaryDirectory() as td:
            raw_dir, wiki_dir, manifest_path, ingest_log, wiki_log = self.make_repo(td)
            f = raw_dir / "clip.txt"
            f.write_text("content here. " * 30, encoding="utf-8")
            entries = [make_manifest_entry("raw/youtube/clip.txt", "", ingest="pending")]
            yiv3.write_manifest(manifest_path, entries)

            original_read_bytes = Path.read_bytes
            calls = {"n": 0}

            def flaky_read_bytes(self, *a, **kw):
                calls["n"] += 1
                if calls["n"] == 1:
                    return original_read_bytes(self, *a, **kw)
                raise OSError("boom")

            with mock.patch.multiple(yiv3, RAW_DIR=raw_dir, MANIFEST_PATH=manifest_path,
                                      WIKI_YT_DIR=wiki_dir, INGEST_LOG=ingest_log,
                                      WIKI_LOG=wiki_log):
                with mock.patch.object(Path, "read_bytes", flaky_read_bytes):
                    with redirect_stdout(io.StringIO()):
                        code = yiv3.main(["--resume"])
            self.assertEqual(code, yiv3.EXIT_RUNTIME_ERROR)

            entries_after = yiv3.read_manifest(manifest_path)
            self.assertEqual(entries_after[0]["ingest"], "error")
            self.assertEqual(entries_after[0]["chunk_ids"], [])
            self.assertIsNone(entries_after[0]["ingested_at"])
            self.assertFalse(any(wiki_dir.glob("*.md")))

    def test_exit_code_3_is_unused(self):
        source = SCRIPT_PATH.read_text(encoding="utf-8")
        # EXIT_BLOCKED is reserved (spec §2b) but no code path may return it.
        returns = re.findall(r"return\s+(EXIT_\w+)", source)
        self.assertNotIn("EXIT_BLOCKED", returns)
        self.assertIn("EXIT_BLOCKED", source)  # constant still defined/reserved


class ManifestParseErrorFuzzTests(unittest.TestCase):
    def test_unclosed_quote_rejected(self):
        text = 'entries:\n- source: "unterminated\n'
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)

    def test_list_item_outside_list_field_rejected(self):
        text = 'entries:\n- file: raw/youtube/a.txt\n    - stray-item\n'
        with self.assertRaises(yiv3.ManifestSyntaxError):
            yiv3.parse_manifest_text(text)


class CliHelpTests(unittest.TestCase):
    def test_help_exits_zero(self):
        with self.assertRaises(SystemExit) as ctx:
            with redirect_stdout(io.StringIO()):
                yiv3.build_arg_parser().parse_args(["--help"])
        self.assertEqual(ctx.exception.code, 0)


if __name__ == "__main__":
    unittest.main()
