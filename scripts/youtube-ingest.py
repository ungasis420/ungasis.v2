#!/usr/bin/env python3
"""youtube-ingest.py — Fetch YouTube transcripts and create wiki pages.

Usage:
  python scripts/youtube-ingest.py <url> [<url> ...]

Stdlib + youtube_transcript_api only. UTF-8 throughout.
"""
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

from youtube_transcript_api import YouTubeTranscriptApi

ROOT = Path(__file__).resolve().parent.parent
WIKI = ROOT / "knowledge" / "wiki"
LOG_FILE = ROOT / "raw" / "youtube" / "ingest-log.jsonl"

URL_PATTERNS = (
    re.compile(r"(?:youtube\.com/watch\?v=|youtube\.com/shorts/)([A-Za-z0-9_-]{11})"),
    re.compile(r"youtu\.be/([A-Za-z0-9_-]{11})"),
)

TOPIC_WORDS = ("ai", "python", "javascript", "react", "machine learning",
               "tutorial", "coding", "design", "finance", "business",
               "productivity", "music", "health", "science")


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def extract_video_id(url):
    for pat in URL_PATTERNS:
        m = pat.search(url)
        if m:
            return m.group(1)
    return None


def staleness_footer():
    now = datetime.now(timezone.utc)
    review_month = now.month + 3
    review_year = now.year + (review_month - 1) // 12
    review_month = (review_month - 1) % 12 + 1
    review = now.replace(year=review_year, month=review_month)
    return (f"Last reviewed: {now.strftime('%B %Y')} | "
            f"Review by: {review.strftime('%B %Y')} | Owner: Mel")


def detect_topic(text):
    low = text.lower()
    for topic in TOPIC_WORDS:
        if topic in low:
            return topic.replace(" ", "-")
    return ""


def fetch_transcript(video_id):
    api = YouTubeTranscriptApi()
    fetched = api.fetch(video_id)
    return " ".join(snippet.text.strip() for snippet in fetched if snippet.text.strip())


def build_wiki_page(video_id, url, transcript):
    summary = transcript[:500] + ("..." if len(transcript) > 500 else "")
    topic = detect_topic(transcript)
    tags = "youtube, research" + (f", {topic}" if topic else "")
    lines = [
        f"# {video_id}",
        "",
        "## Transcript Summary",
        summary,
        "",
        "## Key Takeaways",
        "- TODO: summarize with AI",
        "",
        "## Source",
        f"- URL: {url}",
        f"- Fetched: {now_iso()}",
        "",
        f"tags: {tags}",
        "",
        staleness_footer(),
    ]
    return "\n".join(lines) + "\n"


def log_result(entry):
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with LOG_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


def read_urls_from_file(path):
    urls = []
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        urls.append(line)
    return urls


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/youtube-ingest.py <url> [<url> ...]")
        print("       python scripts/youtube-ingest.py --file <path>")
        return 1

    if sys.argv[1] == "--file":
        if len(sys.argv) < 3:
            print("Usage: python scripts/youtube-ingest.py --file <path>")
            return 1
        urls = read_urls_from_file(sys.argv[2])
    else:
        urls = sys.argv[1:]

    results = []

    for url in urls:
        video_id = extract_video_id(url)
        if not video_id:
            results.append((url, "ERROR", "-", 0))
            log_result({"url": url, "video_id": None, "wiki_page": None,
                        "timestamp": now_iso(), "transcript_length": 0,
                        "error": "could not parse video ID"})
            continue

        try:
            transcript = fetch_transcript(video_id)
        except Exception as e:
            results.append((url, "ERROR", "-", 0))
            log_result({"url": url, "video_id": video_id, "wiki_page": None,
                        "timestamp": now_iso(), "transcript_length": 0,
                        "error": str(e)})
            continue

        WIKI.mkdir(parents=True, exist_ok=True)
        page_path = WIKI / f"youtube-{video_id}.md"
        page_path.write_text(build_wiki_page(video_id, url, transcript), encoding="utf-8")

        rel = page_path.relative_to(ROOT).as_posix()
        results.append((url, "OK", rel, len(transcript)))
        log_result({"url": url, "video_id": video_id, "wiki_page": rel,
                    "timestamp": now_iso(), "transcript_length": len(transcript)})

    print(f"{'URL':<45} | {'Status':<6} | {'Wiki Page':<35} | Transcript Length")
    print("-" * 100)
    for url, status, page, length in results:
        print(f"{url:<45} | {status:<6} | {page:<35} | {length}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
