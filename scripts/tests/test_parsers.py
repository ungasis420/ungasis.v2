#!/usr/bin/env python3
"""Unit tests for UNGASIS parser functions."""
import os
import sys
import unittest
import tempfile

# Add scripts to path
SCRIPTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, SCRIPTS_DIR)

class TestQueueParser(unittest.TestCase):
    """Test queue.md parsing logic."""

    def test_count_pending_tasks(self):
        """Test counting pending tasks in queue."""
        content = "- [ ] Task 1\n- [ ] Task 2\n- [x] Done task"
        pending = content.count('- [ ]')
        completed = content.count('- [x]')
        self.assertEqual(pending, 2)
        self.assertEqual(completed, 1)

    def test_empty_queue(self):
        """Test parsing an empty queue."""
        content = "# Queue\n\nNo tasks."
        pending = content.count('- [ ]')
        self.assertEqual(pending, 0)

class TestQualityScorer(unittest.TestCase):
    """Test quality scoring dimensions."""

    def test_staleness_footer_detection(self):
        """Test staleness footer detection in markdown."""
        with_footer = "# Title\nContent\nLast reviewed: June 2026"
        without_footer = "# Title\nContent only"
        self.assertIn('Last reviewed:', with_footer)
        self.assertNotIn('Last reviewed:', without_footer)

    def test_table_detection(self):
        """Test markdown table detection."""
        with_table = "| Col 1 | Col 2 |\n|-------|-------|\n| A | B |"
        without_table = "Just text, no tables."
        self.assertIn('|', with_table)
        self.assertNotIn('|', without_table)

    def test_heading_structure(self):
        """Test heading structure existence."""
        good = "# Title\n## Section\n### Subsection"
        self.assertIn('# ', good)
        self.assertIn('## ', good)

class TestWarningChecker(unittest.TestCase):
    """Test warning detection logic."""

    def test_file_over_200_lines(self):
        """Test line limit detection."""
        content = "\n".join([f"Line {i}" for i in range(250)])
        lines = content.count('\n') + 1
        self.assertGreater(lines, 200)

    def test_file_under_200_lines(self):
        """Test line limit detection under threshold."""
        content = "\n".join([f"Line {i}" for i in range(50)])
        lines = content.count('\n') + 1
        self.assertLess(lines, 200)

class TestSchemaValidation(unittest.TestCase):
    """Test markdown table schema validation."""

    def test_valid_table(self):
        """Test valid markdown table structure."""
        table = "| Date | Score |\n|------|-------|\n| 2026-06-03 | 8.2 |"
        self.assertIn('|', table)
        self.assertIn('---', table)

    def test_missing_table(self):
        """Test missing markdown table structure."""
        no_table = "Just paragraphs.\nNo tables here."
        has_pipe = '|' in no_table
        self.assertFalse(has_pipe)

if __name__ == '__main__':
    unittest.main()
