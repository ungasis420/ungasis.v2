import pytest
import json
import os
import tempfile
import sys
from pathlib import Path
import importlib.util

scripts_dir = Path(__file__).parent
sys.path.insert(0, str(scripts_dir))

def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module

context_inject = load_module("context_inject", str(scripts_dir / "context-inject.py"))
session_pacer = load_module("session_pacer", str(scripts_dir / "session-pacer.py"))
verifier = load_module("verifier", str(scripts_dir / "verifier.py"))
task_router = load_module("task_router", str(scripts_dir / "task-router.py"))
wiki_lint = load_module("wiki_lint", str(scripts_dir / "wiki-lint.py"))

@pytest.fixture
def mock_graph_path():
    return str(scripts_dir / "test_fixtures" / "mock_graph.json")

@pytest.fixture
def mock_sessions_path():
    return str(scripts_dir / "test_fixtures" / "mock_sessions.jsonl")

def test_context_inject(mock_graph_path):
    with open(mock_graph_path, "r") as f:
        graph = json.load(f)
    
    nodes_by_id = {n["id"]: n for n in graph["nodes"]}
    keywords = context_inject.extract_keywords("SLA")
    
    score_sla = context_inject.score_node(nodes_by_id["SLA Calculator"], keywords)
    score_slash = context_inject.score_node(nodes_by_id["Slash Commands"], keywords)
    
    assert score_sla > score_slash
    assert score_slash == 0

def test_session_pacer(monkeypatch, capsys, tmp_path):
    from datetime import datetime
    today = datetime.now().date().isoformat()
    sessions_path = tmp_path / "sessions.jsonl"
    sessions_path.write_text(
        "\n".join(json.dumps({"timestamp": f"{today}T10:00:00Z", "estimated_tokens": tokens, "duration_minutes": minutes})
                  for tokens, minutes in [(1000, 10), (2000, 20), (1500, 15)]) + "\n"
    )

    monkeypatch.setattr(session_pacer, "LOG_FILE", str(sessions_path))
    monkeypatch.setattr(sys, "argv", ["session-pacer.py", "--json"])

    try:
        session_pacer.main()
    except SystemExit:
        pass

    captured = capsys.readouterr()
    data = json.loads(captured.out)

    assert data["hours_elapsed"] == 0.75

def test_verifier():
    with tempfile.NamedTemporaryFile(mode='w', suffix=".md", delete=False) as f_bad:
        f_bad.write("Content without footer.\n")
        bad_path = f_bad.name
        
    with tempfile.NamedTemporaryFile(mode='w', suffix=".md", delete=False) as f_good:
        f_good.write("Content\nLast reviewed: June 2026 | Review by: Sept | Owner: Mel\n")
        good_path = f_good.name
        
    try:
        with open(bad_path, 'r') as f:
            bad_lines = f.read().splitlines()
        with open(good_path, 'r') as f:
            good_lines = f.read().splitlines()
            
        assert verifier.check_staleness_footer(bad_path, bad_lines)[0] is False
        assert verifier.check_staleness_footer(good_path, good_lines)[0] is True
    finally:
        os.remove(bad_path)
        os.remove(good_path)

def test_task_router():
    route1 = task_router.route_task("edit src/App.tsx")
    assert route1["agent"] == "claude"
    
    route2 = task_router.route_task("create new component")
    assert route2["agent"] == "agy"

def test_wiki_lint(monkeypatch):
    with tempfile.TemporaryDirectory() as tmpdir:
        tmp_wiki = Path(tmpdir)
        monkeypatch.setattr(wiki_lint, "WIKI", tmp_wiki)
        monkeypatch.setattr(wiki_lint, "SUBFOLDERS", ("gotchas",))
        
        (tmp_wiki / "index.md").write_text("- gotchas/good1.md — Good\n- gotchas/good2.md — Good\n- gotchas/bad.md — Bad")
        
        gotchas = tmp_wiki / "gotchas"
        gotchas.mkdir()
        
        (gotchas / "good1.md").write_text("---\ncreated: 2026-06-13\n---\n" + "A"*50)
        (gotchas / "good2.md").write_text("---\ncreated: 2026-06-13\n---\n" + "B"*50)
        (gotchas / "bad.md").write_text("a")
        
        monkeypatch.setattr(sys, "argv", ["wiki-lint.py", "--json"])
        out_json = tmp_wiki / "out.json"
        monkeypatch.setattr(wiki_lint, "DASHBOARD_OUT", out_json)
        
        try:
            wiki_lint.main()
        except SystemExit:
            pass
            
        data = json.loads(out_json.read_text())
        assert data["health_pct"] < 100.0

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
