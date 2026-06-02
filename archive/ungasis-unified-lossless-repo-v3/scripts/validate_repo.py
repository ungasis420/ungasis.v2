#!/usr/bin/env python3
"""Validate the merged UNGASIS repository.

This is intentionally simple and beginner-friendly.
"""
from __future__ import annotations

import ast
import json
import os
import re
import stat
import subprocess
import sys
from pathlib import Path

try:
    import yaml
except Exception as exc:  # pragma: no cover
    print("FAIL: PyYAML is needed. Install with: python -m pip install pyyaml")
    raise SystemExit(1) from exc

try:
    import jsonschema
except Exception as exc:  # pragma: no cover
    print("FAIL: jsonschema is needed. Install with: python -m pip install jsonschema")
    raise SystemExit(1) from exc

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []
WARNINGS: list[str] = []

REQUIRED_FILES = [

    "TASK_BOARD.md",
    "SHARED_STATE_PROTOCOL.md",
    "CROSS_REFERENCE_BRIDGE.md",
    "MODEL_ROUTING_v4.1.md",
    "cursor_rules_token_efficiency.mdc",
    ".cursor/rules/token_efficiency.mdc",
    "docs/SETUP_WIZARD.md",
    "docs/AGENT_ROLES.md",
    "docs/FILL_ZONES.md",
    "docs/DEBUG_PAGE.md",
    "mcp/README_MCP_SAFE_SETUP.md",
    "mcp/mcp-config.safe.example.json",
    "config/model-routing.yml",
    "config/shared-state-protocol.yml",
    "config/cross-reference-bridge.yml",
    "config/mcp-pruning-rules.yml",
    "schemas/model-routing.schema.json",
    "schemas/shared-state-protocol.schema.json",
    "schemas/cross-reference-bridge.schema.json",
    "schemas/mcp-pruning-rules.schema.json",
    "schemas/mcp-config.schema.json",
    "tests/agent-permissions/mcp-pruning-rules-tests.yml",
    "tests/smoke-tests/06_shared_state_and_model_routing.md",
    "tests/golden-prompts/04_cross_reference_bridge.md",
    "README.md",
    "README_START_HERE.md",
    "HOW_TO_USE_THIS_REPOSITORY.md",
    "BEGINNER_NO_CODE_GUIDE.md",
    "SIMPLE_GLOSSARY_FEYNMAN.md",
    "PRODUCTION_READINESS_REPORT.md",
    "FILE_STATUS_REGISTER.csv",
    "MERGE_MAP_WHAT_CHANGED.md",
    "LICENSE",
    "SECURITY.md",
    "CONTRIBUTING.md",
    "CODEOWNERS",
    "CHANGELOG.md",
    "RELEASE.md",
    "SUPPORT.md",
    ".github/workflows/ci.yml",
    "config/permission-profiles.yml",
    "config/human-approval-gates.yml",
    "config/observability-policy.yml",
    "docs/PERMISSION_MATRIX.md",
    "docs/HUMAN_APPROVAL_GATES.md",
    "docs/RUNBOOK.md",
    "docs/INCIDENT_RESPONSE.md",
    "docs/RELEASE_AND_ROLLBACK.md",
    "docs/PRODUCTION_GATE_CHECKLIST.md",
    "schemas/permission-profiles.schema.json",
    "schemas/human-approval-gates.schema.json",
    "schemas/observability-event.schema.json",
    "logs/examples/agent-event.example.json",
    "tests/golden-prompts/01_prompt_review_default.md",
    "tests/redteam-prompts/01_ignore_rules.md",
    "tests/redteam-prompts/02_secret_trap.md",
    "tests/agent-permissions/permission-boundary-tests.yml",
    "templates/task-prompt.md",
    "templates/fresh-chat-starter.md",
    "docs/PROJECT_BRIEF.md",
    "docs/PROJECT_MEMORY.md",
    "docs/TEST_COMMANDS.md",
    "docs/TASK_HANDOFF.md",
    "docs/DECISIONS.md",
]

ALLOW_PLACEHOLDER_PATH_PARTS = [
    "ungasis-core",
    "00_LOSSLESS_ARCHIVE_READ_ONLY",
    "templates",
    "tests",
    "01_ORIGINAL_ZIP_BACKUPS",
    "02_EXTRACTED_ORIGINALS_READ_ONLY",
    "docs/production-readiness",
    "01_ORIGINAL_ZIP_BACKUPS",
    "03_MERGED_FINAL_RECOMMENDED",
]
ALLOW_PLACEHOLDER_FILES = {
    ".env.example",
    "CODEOWNERS",
    "config/connector-registry.example.yml",
    "scripts/validate_repo.py",
}
PLACEHOLDER_PATTERNS = [
    r"YOUR_API_KEY_HERE",
    r"INSERT_SECRET",
    r"example-password",
    r"TODO\b",
    r"TBD\b",
    r"replace-me",
]
SECRET_PATTERNS = [
    ("OpenAI key", r"sk-[A-Za-z0-9_-]{20,}"),
    ("GitHub token", r"gh[pousr]_[A-Za-z0-9_]{20,}"),
    ("AWS access key", r"AKIA[0-9A-Z]{16}"),
    ("Private key block", r"-----BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY-----"),
]
SECRET_ALLOW_PATHS = [
    "00_LOSSLESS_ARCHIVE_READ_ONLY/",
    ".env.example",
    "SIMPLE_GLOSSARY_FEYNMAN.md",
    "SECURITY.md",
    "README.md",
    "README_START_HERE.md",
    "HOW_TO_USE_THIS_REPOSITORY.md",
    "BEGINNER_NO_CODE_GUIDE.md",
    "docs/",
    "tests/",
    "02_EXTRACTED_ORIGINALS_READ_ONLY/",
]


def rel(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def add_error(msg: str) -> None:
    ERRORS.append(msg)


def add_warning(msg: str) -> None:
    WARNINGS.append(msg)


def should_skip_text(path: Path) -> bool:
    parts = set(path.parts)
    return any(part in parts for part in [".git", "__pycache__"])


def read_text(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return None


def check_required_files() -> None:
    for file in REQUIRED_FILES:
        if not (ROOT / file).exists():
            add_error(f"Missing required file: {file}")


def check_json_files() -> None:
    for path in ROOT.rglob("*.json"):
        if should_skip_text(path):
            continue
        text = read_text(path)
        if text is None:
            continue
        try:
            json.loads(text)
        except Exception as exc:
            add_error(f"Invalid JSON: {rel(path)}: {exc}")


def check_yaml_files() -> None:
    for pattern in ("*.yml", "*.yaml"):
        for path in ROOT.rglob(pattern):
            if should_skip_text(path):
                continue
            text = read_text(path)
            if text is None:
                continue
            try:
                yaml.safe_load(text) if text.strip() else None
            except Exception as exc:
                add_error(f"Invalid YAML: {rel(path)}: {exc}")


def validate_schema(schema_file: str, data_file: str) -> None:
    schema_path = ROOT / schema_file
    data_path = ROOT / data_file
    if not schema_path.exists() or not data_path.exists():
        return
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    data = yaml.safe_load(data_path.read_text(encoding="utf-8"))
    try:
        jsonschema.validate(instance=data, schema=schema)
    except Exception as exc:
        add_error(f"Schema check failed: {data_file} against {schema_file}: {exc}")


def check_schemas() -> None:
    for path in (ROOT / "schemas").glob("*.json"):
        try:
            jsonschema.Draft202012Validator.check_schema(json.loads(path.read_text(encoding="utf-8")))
        except Exception as exc:
            add_error(f"Invalid JSON schema: {rel(path)}: {exc}")
    validate_schema("schemas/permission-profiles.schema.json", "config/permission-profiles.yml")
    validate_schema("schemas/human-approval-gates.schema.json", "config/human-approval-gates.yml")
    validate_schema("schemas/observability-policy.schema.json", "config/observability-policy.yml")
    validate_schema("schemas/connector-registry.schema.json", "config/connector-registry.example.yml")
    validate_schema("schemas/readiness-levels.schema.json", "config/readiness-levels.yml")
    # Validate sample event.
    if (ROOT / "logs/examples/agent-event.example.json").exists():
        schema = json.loads((ROOT / "schemas/observability-event.schema.json").read_text(encoding="utf-8"))
        data = json.loads((ROOT / "logs/examples/agent-event.example.json").read_text(encoding="utf-8"))
        try:
            jsonschema.validate(instance=data, schema=schema)
        except Exception as exc:
            add_error(f"Observability event sample failed schema check: {exc}")


def allowed_placeholder_path(path: Path) -> bool:
    r = rel(path)
    if r in ALLOW_PLACEHOLDER_FILES:
        return True
    return any(part in r for part in ALLOW_PLACEHOLDER_PATH_PARTS)


def check_placeholders() -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or should_skip_text(path):
            continue
        text = read_text(path)
        if text is None:
            continue
        if allowed_placeholder_path(path):
            continue
        for pat in PLACEHOLDER_PATTERNS:
            if re.search(pat, text, re.IGNORECASE):
                add_error(f"Unsafe placeholder in active file: {rel(path)} pattern={pat}")


def secret_allowed(path: Path) -> bool:
    r = rel(path)
    return any(r == item or r.startswith(item) for item in SECRET_ALLOW_PATHS)


def check_secrets() -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or should_skip_text(path):
            continue
        text = read_text(path)
        if text is None:
            continue
        if secret_allowed(path):
            continue
        for name, pat in SECRET_PATTERNS:
            if re.search(pat, text):
                add_error(f"Possible secret found: {name} in {rel(path)}")


def check_shell_scripts() -> None:
    for path in ROOT.rglob("*.sh"):
        if "02_EXTRACTED_ORIGINALS_READ_ONLY" in rel(path):
            continue
        result = subprocess.run(["bash", "-n", str(path)], capture_output=True, text=True)
        if result.returncode != 0:
            add_error(f"Shell syntax failed: {rel(path)}: {result.stderr.strip()}")
        mode = path.stat().st_mode
        if not (mode & stat.S_IXUSR):
            add_error(f"Shell script is not executable: {rel(path)}")


def check_python_scripts() -> None:
    for path in ROOT.rglob("*.py"):
        if "02_EXTRACTED_ORIGINALS_READ_ONLY" in rel(path):
            continue
        try:
            ast.parse(path.read_text(encoding="utf-8"))
        except Exception as exc:
            add_error(f"Python syntax failed: {rel(path)}: {exc}")
        if path.as_posix().endswith(("/scripts/validate_repo.py", "/runtime/safe_dry_run_orchestrator.py")):
            if not (path.stat().st_mode & stat.S_IXUSR):
                add_error(f"Python script is not executable: {rel(path)}")


def check_ci_permissions() -> None:
    workflow = ROOT / ".github/workflows/ci.yml"
    if not workflow.exists():
        return
    data = yaml.safe_load(workflow.read_text(encoding="utf-8"))
    permissions = data.get("permissions") if isinstance(data, dict) else None
    if permissions != {"contents": "read"}:
        add_error("CI workflow must set permissions: contents: read")


def check_file_status_register() -> None:
    reg = ROOT / "FILE_STATUS_REGISTER.csv"
    if not reg.exists():
        add_error("Missing FILE_STATUS_REGISTER.csv")
        return
    text = reg.read_text(encoding="utf-8")
    required_cols = ["path", "status", "source", "reason"]
    header = text.splitlines()[0].split(",") if text.splitlines() else []
    for col in required_cols:
        if col not in header:
            add_error(f"FILE_STATUS_REGISTER missing column: {col}")


def check_agent_rules() -> None:
    text = (ROOT / "config/permission-profiles.yml").read_text(encoding="utf-8")
    for phrase in ["read_only", "patch_limited", "dangerous_disabled"]:
        if phrase not in text:
            add_error(f"Missing permission profile: {phrase}")
    gates = (ROOT / "config/human-approval-gates.yml").read_text(encoding="utf-8")
    for phrase in ["delete_files", "send_messages", "move_money", "access_sensitive_data"]:
        if phrase not in gates:
            add_error(f"Missing approval gate: {phrase}")

    model_routing = (ROOT / "config/model-routing.yml").read_text(encoding="utf-8")
    for phrase in ["default_tier", "after_failures", "prefer_smallest_safe_model"]:
        if phrase not in model_routing:
            add_error(f"Model routing config missing phrase: {phrase}")
    mcp_rules = (ROOT / "config/mcp-pruning-rules.yml").read_text(encoding="utf-8")
    for phrase in ["filesystem", "github", "blocked_by_default", "expose_secrets"]:
        if phrase not in mcp_rules:
            add_error(f"MCP pruning rules missing phrase: {phrase}")



def check_prompt_and_permission_test_files() -> None:
    golden = ROOT / "tests/golden-prompts/01_prompt_review_default.md"
    red_ignore = ROOT / "tests/redteam-prompts/01_ignore_rules.md"
    red_secret = ROOT / "tests/redteam-prompts/02_secret_trap.md"
    perm = ROOT / "tests/agent-permissions/permission-boundary-tests.yml"
    if golden.exists():
        text = golden.read_text(encoding="utf-8")
        for phrase in ["Prompt Diagnostic", "Do you want me to run this upgraded prompt now?"]:
            if phrase not in text:
                add_error(f"Golden prompt test missing expected phrase: {phrase}")
    if red_ignore.exists():
        text = red_ignore.read_text(encoding="utf-8").lower()
        if "ignore" not in text or "instructions" not in text:
            add_error("Red-team ignore-rules test is too weak")
    if red_secret.exists():
        text = red_secret.read_text(encoding="utf-8").lower()
        if "secret" not in text or "api" not in text:
            add_error("Red-team secret trap test is too weak")
    if perm.exists():
        text = perm.read_text(encoding="utf-8")
        for phrase in ["delete_files", "send_messages", "move_money", "access_sensitive_data"]:
            if phrase not in text:
                add_error(f"Agent permission test missing action: {phrase}")


def main() -> int:
    check_required_files()
    check_json_files()
    check_yaml_files()
    check_schemas()
    check_placeholders()
    check_secrets()
    check_shell_scripts()
    check_python_scripts()
    check_ci_permissions()
    check_file_status_register()
    check_agent_rules()
    check_prompt_and_permission_test_files()

    print("=== UNGASIS merged repository validation ===")
    if WARNINGS:
        print("Warnings:")
        for warning in WARNINGS:
            print("  WARN:", warning)
    if ERRORS:
        print("Errors:")
        for error in ERRORS:
            print("  FAIL:", error)
        print(f"Result: FAIL ({len(ERRORS)} error/s)")
        return 1
    print("Result: PASS")
    print("Meaning: local repository checks passed. Real production still needs human/environment review.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
