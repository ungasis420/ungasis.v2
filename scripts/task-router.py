#!/usr/bin/env python3
"""Classify a task description and recommend agent, model tier, tokens, reasoning."""
import sys

QUICK_KW = ["rename", "format", "lint", "typo", "comment", "boilerplate", "small fix"]
BUILD_KW = ["implement", "add", "create", "build", "feature", "new component", "endpoint"]
DEBUG_KW = ["fix", "bug", "error", "crash", "broken", "issue", "fails", "failing", "exception"]
REVIEW_KW = ["review", "audit", "check code", "code quality", "pr review", "security audit"]
RESEARCH_KW = ["what is", "which", "best", "compare", "research", "investigate", "should we", "recommend"]
DESIGN_KW = ["design", "architecture", "ui", "ux", "dashboard", "layout", "mockup", "wireframe"]


def classify(text):
    t = text.lower()
    # order matters: more specific categories checked first
    if any(k in t for k in DESIGN_KW):
        return "DESIGN"
    if any(k in t for k in REVIEW_KW):
        return "REVIEW"
    if any(k in t for k in DEBUG_KW):
        return "DEBUG"
    if any(k in t for k in RESEARCH_KW):
        return "RESEARCH"
    if any(k in t for k in BUILD_KW):
        return "BUILD"
    if any(k in t for k in QUICK_KW):
        return "QUICK"
    return "BUILD"


# (agent, model_tier, exchanges, reasoning, reason)
RECOMMENDATIONS = {
    "QUICK": ("Cline / VS Code Copilot", "Tier 3 Small", 1, "none",
              "Mechanical task, no reasoning needed"),
    "BUILD": ("Claude Code", "Tier 2 Medium", 4, "low",
              "Standard feature implementation"),
    "DEBUG": ("Claude Code", "Tier 2 Medium", 5, "high",
              "Multi-file state bugs need extended reasoning"),
    "REVIEW": ("Claude Code", "Tier 2 Medium", 3, "medium",
               "Code review benefits from reasoning over style/logic"),
    "RESEARCH": ("Agy CLI", "Tier 1 Small", 2, "low",
                 "Fast iteration on free tier for research/comparison"),
    "DESIGN": ("Claude Code", "Tier 1 Large", 6, "medium",
               "Architecture/UI decisions need large-context reasoning"),
}


def main():
    if len(sys.argv) < 2:
        print("Usage: python task-router.py \"<task description>\"")
        sys.exit(1)

    task = " ".join(sys.argv[1:])
    category = classify(task)
    agent, tier, exchanges, reasoning, reason = RECOMMENDATIONS[category]
    est_tokens = exchanges * 2000

    print(f"# Task Router Result\n")
    print(f"Task: \"{task}\"")
    print(f"Category: **{category}**\n")
    print("| Field | Recommendation | Reason |")
    print("|-------|-----------------|--------|")
    print(f"| Agent | {agent} | Best fit for {category.lower()} tasks |")
    print(f"| Model Tier | {tier} | {reason} |")
    print(f"| Estimated Tokens | ~{est_tokens} (~{exchanges} exchanges x 2000) | Based on typical {category.lower()} session length |")
    print(f"| Reasoning Budget | {reasoning} | Per model-routing.md guidance for this task type |")

    print("\n---")
    print("Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel")


if __name__ == "__main__":
    main()
