#!/usr/bin/env python3
"""wiki-ingest.py — Split a raw/ file into classified wiki pages, then
update index.md, log.md, and rebuild hot.md. Stdlib only, UTF-8.
"""
import argparse
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
from datetime import datetime, timezone
from pathlib import Path

DOCX_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

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


def read_docx(path):
    """Extract paragraph text from a .docx (stdlib zipfile + XML, no deps)."""
    root = ET.fromstring(zipfile.ZipFile(path).read("word/document.xml"))
    paras = []
    for p in root.iter(DOCX_NS + "p"):
        paras.append("".join(n.text for n in p.iter(DOCX_NS + "t") if n.text))
    return paras


def read_source(path):
    """Return source text as a single string, supporting .md/.txt/.docx."""
    if path.suffix.lower() == ".docx":
        return "\n".join(read_docx(path))
    return path.read_text(encoding="utf-8", errors="replace")


W5H1 = ("Who", "What", "When", "Where", "Why", "How")
SKIP_BLOCK = ("unable to retrieve", "could not be found", "could not be located")


def parse_youtube(paras):
    """Split YouTube-summary paragraphs into one dict per numbered video."""
    lines = [p.strip() for p in paras]
    starts = [i for i, ln in enumerate(lines)
              if re.match(r"^\d+\.\s+\S", ln)
              and any("youtube.com" in lines[j] or "🔗" in lines[j]
                      for j in range(i + 1, min(i + 3, len(lines))))]
    videos = []
    bounds = starts + [len(lines)]
    for a, b in zip(bounds, bounds[1:]):
        block = [ln for ln in lines[a:b] if ln]
        title = re.sub(r"^\d+\.\s+", "", block[0]).strip()
        joined = " ".join(block).lower()
        if any(s in joined for s in SKIP_BLOCK):
            continue
        url = next((ln.lstrip("🔗").strip() for ln in block
                    if "youtube.com" in ln), "")
        fields, summary, takeaway = {}, [], []
        i = 1
        while i < len(block):
            ln = block[i]
            if ln in W5H1 and i + 1 < len(block):
                fields[ln] = block[i + 1]
                i += 2
                continue
            if ln.lower().startswith("summary line"):
                i += 1
                while i < len(block) and not block[i].lower().startswith(
                        ("🎯", "key takeaway", "want me", "📋")):
                    summary.append(block[i])
                    i += 1
                continue
            if "key takeaway" in ln.lower():
                i += 1
                while i < len(block) and not block[i].lower().startswith(
                        ("want me", "🔗", "📋")):
                    takeaway.append(block[i])
                    i += 1
                continue
            i += 1
        videos.append({"title": title, "url": url, "fields": fields,
                       "summary": summary, "takeaway": takeaway})
    return videos


def build_youtube_page(v):
    """Render one video dict into the required YouTube wiki-page format."""
    f = v["fields"]
    summary = [s for s in v["summary"] if not s.startswith(("📋",))]
    body_text = " ".join([v["title"]] + list(f.values()) + summary)
    tags = detect_tags(body_text)
    lines = [f"# {v['title']}", "", "> Source: YouTube"]
    if v["url"]:
        lines.append(f"> URL: {v['url']}")
    lines += ["", "## Summary"]
    for label in W5H1:
        if f.get(label):
            lines.append(f"- **{label}:** {f[label]}")
    for s in summary:
        lines.append(f"- {s}")
    lines += ["", "## Key Takeaways"]
    takeaways = v["takeaway"] or summary[:3]
    for t in takeaways:
        lines.append(f"- {t}")
    lines += ["", "## Tags", " ".join(f"#{t}" for t in tags)]
    front = (f"---\nsource: YouTube\ncreated: {now_iso()}\n"
             f"tags: {', '.join(tags)}\n---\n")
    return v["title"], tags, front + "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser(description="Ingest a raw file into the wiki.")
    ap.add_argument("source", help="path to a file in raw/ (.md, .txt, .docx)")
    ap.add_argument("--dry-run", action="store_true", help="show without writing")
    ap.add_argument("--verbose", action="store_true", help="print each page")
    ap.add_argument("--youtube", action="store_true",
                    help="parse numbered YouTube video summaries into pages")
    args = ap.parse_args()

    src = Path(args.source)
    if not src.exists():
        print(f"ERROR: source not found: {src}")
        return 1
    if src.suffix.lower() not in (".md", ".txt", ".docx"):
        print(f"ERROR: unsupported file type: {src.suffix} (use .md/.txt/.docx)")
        return 1

    text = read_source(src)
    index_lines, created = [], 0

    if args.youtube:
        videos = parse_youtube(read_docx(src) if src.suffix.lower() == ".docx"
                               else text.splitlines())
        for v in videos:
            folder_key = "decisions" if classify(
                " ".join(v["fields"].values())) == "decisions" else "patterns"
            title, tags, content = build_youtube_page(v)
            slug = slugify(title)
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
            print(f"[dry-run] would create {len(videos)} page(s)")
            return 0
        _finish_ingest(src, index_lines, created)
        return 0

    sections = split_sections(text)
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

    _finish_ingest(src, index_lines, created)
    return 0


def _finish_ingest(src, index_lines, created):
    """Append new pages to index.md + log.md and rebuild the hot cache."""
    if index_lines:
        with (WIKI / "index.md").open("a", encoding="utf-8") as f:
            f.write("\n".join(index_lines) + "\n")
    with (WIKI / "log.md").open("a", encoding="utf-8") as f:
        f.write(f"[{now_iso()}] INGEST: {src} → created {created} pages\n")
    rebuild_hot()
    print(f"OK: created {created} page(s) from {src}")


if __name__ == "__main__":
    sys.exit(main())
