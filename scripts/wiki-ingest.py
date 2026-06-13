#!/usr/bin/env python3
"""wiki-ingest.py — Split a raw/ file into classified wiki pages, then
update index.md, log.md, and rebuild hot.md. Stdlib only, UTF-8.
"""
import argparse
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

WIKI = Path(__file__).resolve().parent.parent / "knowledge" / "wiki"
FOLDERS = {"gotchas": WIKI / "gotchas", "decisions": WIKI / "decisions",
           "metrics": WIKI / "metrics", "patterns": WIKI / "patterns"}

GOTCHA_WORDS = ("mistake", "bug", "warning", "error", "fail", "broke",
                "gotcha", "pitfall", "caution", "danger", "avoid")
DECISION_WORDS = ("decision", "decided", "choice", "chose", "tradeoff",
                  "opted", "rationale", "instead of", " vs ", "trade-off")
METRIC_WORDS = ("metric", "measured", "score", "count", "percent", "tokens",
                "ms", "seconds", "rate", "benchmark")
STOPWORDS = set("the a an and or but to of in on for with is are was were be this "
                "that these those it its as at by from we you they i will can not have "
                "has had do does our your their if then so than into out up down more".split())


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def slugify(text, maxlen=50):
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text).strip("-")
    return (text[:maxlen].strip("-") or "untitled")


def classify(section):
    low = section.lower()
    if any(w in low for w in GOTCHA_WORDS):
        return "gotchas"
    if any(w in low for w in DECISION_WORDS):
        return "decisions"
    if any(w in low for w in METRIC_WORDS) or re.search(r"\d+\s*%|\b\d+x\b|\d{2,}", low):
        return "metrics"
    return "patterns"


def detect_tags(section, maxn=5):
    words = re.findall(r"[a-zA-Z][a-zA-Z0-9_-]{3,}", section.lower())
    freq = {}
    for w in words:
        if w in STOPWORDS:
            continue
        freq[w] = freq.get(w, 0) + 1
    ranked = sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))
    return [w for w, _ in ranked[:maxn]]


def split_sections(text):
    lines = text.splitlines()
    heading_idx = [i for i, ln in enumerate(lines) if ln.lstrip().startswith("#")]
    sections = []
    if heading_idx:
        bounds = heading_idx + [len(lines)]
        if heading_idx[0] > 0:
            pre = "\n".join(lines[:heading_idx[0]]).strip()
            if pre:
                sections.append(pre)
        for a, b in zip(bounds, bounds[1:]):
            chunk = "\n".join(lines[a:b]).strip()
            if chunk:
                sections.append(chunk)
    else:
        for chunk in re.split(r"\n\s*\n", text):
            chunk = chunk.strip()
            if chunk:
                sections.append(chunk)
    return sections


def first_line(section):
    for ln in section.splitlines():
        ln = ln.lstrip("#").strip()
        if ln:
            return ln
    return "Untitled"


def build_page(source, section):
    title = first_line(section)
    tags = detect_tags(section)
    body = section
    if not body.lstrip().startswith("#"):
        body = "# " + title + "\n" + body
    front = (f"---\nsource: {source}\ncreated: {now_iso()}\n"
             f"tags: {', '.join(tags)}\n---\n")
    return title, tags, front + body + "\n"


def unique_path(folder, slug):
    path = folder / (slug + ".md")
    n = 2
    while path.exists():
        path = folder / f"{slug}-{n}.md"
        n += 1
    return path


def strip_front(text):
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4:].strip()
    return text.strip()


def read_created(path):
    try:
        for ln in path.read_text(encoding="utf-8").splitlines()[:6]:
            if ln.startswith("created:"):
                return ln.split(":", 1)[1].strip()
    except OSError:
        return ""
    return ""


def rebuild_hot():
    pages = []
    for folder in FOLDERS.values():
        for p in folder.glob("*.md"):
            pages.append((read_created(p), p))
    pages.sort(key=lambda cp: cp[0], reverse=True)
    top = pages[:10]
    lines = ["# Hot Cache — Top Knowledge",
             "> Auto-generated summary of the 10 most recent wiki entries.",
             "> Max 500 words. Updated on every ingest.",
             f"Last updated: {now_iso()}", ""]
    words = 0
    for created, p in top:
        body = strip_front(p.read_text(encoding="utf-8"))
        title = first_line(body)
        snippet = " ".join(body.split())[:200]
        entry = f"- **{title}** ({p.parent.name}): {snippet}"
        words += len(entry.split())
        if words > 500:
            break
        lines.append(entry)
    (WIKI / "hot.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Ingest a raw file into the wiki.")
    ap.add_argument("source", help="path to a file in raw/ (.md or .txt)")
    ap.add_argument("--dry-run", action="store_true", help="show without writing")
    ap.add_argument("--verbose", action="store_true", help="print each page")
    args = ap.parse_args()

    src = Path(args.source)
    if not src.exists():
        print(f"ERROR: source not found: {src}")
        return 1
    if src.suffix.lower() not in (".md", ".txt"):
        print(f"ERROR: unsupported file type: {src.suffix} (use .md or .txt)")
        return 1

    text = src.read_text(encoding="utf-8", errors="replace")
    sections = split_sections(text)
    index_lines, created = [], 0

    for section in sections:
        folder_key = classify(section)
        title, tags, content = build_page(str(src), section)
        slug = slugify(first_line(section))
        if args.dry_run:
            print(f"[dry-run] {folder_key}/{slug}.md  tags: {', '.join(tags)}")
            continue
        FOLDERS[folder_key].mkdir(parents=True, exist_ok=True)
        path = unique_path(FOLDERS[folder_key], slug)
        path.write_text(content, encoding="utf-8")
        rel = path.relative_to(WIKI).as_posix()
        index_lines.append(f"- {rel} — tags: {', '.join(tags)}")
        created += 1
        if args.verbose:
            print(f"created {rel}  tags: {', '.join(tags)}")

    if args.dry_run:
        print(f"[dry-run] would create {len(sections)} page(s)")
        return 0

    if index_lines:
        with (WIKI / "index.md").open("a", encoding="utf-8") as f:
            f.write("\n".join(index_lines) + "\n")
    with (WIKI / "log.md").open("a", encoding="utf-8") as f:
        f.write(f"[{now_iso()}] INGEST: {src} → created {created} pages\n")
    rebuild_hot()
    print(f"OK: created {created} page(s) from {src}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
