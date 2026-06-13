#!/usr/bin/env python3
"""Smart YouTube transcript ingest with relevance filtering.
Last reviewed: June 14, 2026 | Review by: September 2026 | Owner: Mel
"""
import argparse
import json
import os
import re
import sys
import subprocess
from datetime import datetime

# Optional dependency check
try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    print("Error: youtube_transcript_api is not installed.")
    sys.exit(1)

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

KEYWORDS = {
    "ai": 3, "automation": 3, "agentic": 3, "graphrag": 3, "knowledge graph": 3, 
    "token": 3, "prompt engineering": 3, "coding agent": 3, "claude": 3, "gemini": 3, "llm": 3,
    "architecture": 2, "system design": 2, "developer tools": 2, "workflow": 2, "productivity": 2, "engineering": 2,
    "tutorial": 1, "guide": 1, "how to": 1, "framework": 1, "open source": 1,
    "subscribe": -2, "like and comment": -2, "sponsor": -2, "merchandise": -2, "giveaway": -2
}

def get_title(url):
    try:
        res = subprocess.run(["yt-dlp", "--get-title", url], capture_output=True, text=True, check=True)
        return res.stdout.strip()
    except Exception:
        video_id = url.split("v=")[-1].split("&")[0] if "v=" in url else url.split("/")[-1]
        return f"Video_{video_id}"

def get_transcript(url):
    video_id = url.split("v=")[-1].split("&")[0] if "v=" in url else url.split("/")[-1]
    try:
        snippets = YouTubeTranscriptApi().fetch(video_id)
        return [{"text": s.text} for s in snippets]
    except Exception:
        return []

def score_transcript(text):
    text_lower = text.lower()
    words = len(text_lower.split())
    if words == 0: return 0
    score = 0
    for k, w in KEYWORDS.items():
        score += text_lower.count(k) * w
    return min(100, max(0, score))

def sanitize(title):
    return re.sub(r'[^a-zA-Z0-9]+', '-', title).strip('-').lower()

def extract_insights(ts):
    insights = []
    for x in ts:
        s_lower = x["text"].lower()
        if any(k in s_lower for k, w in KEYWORDS.items() if w == 3):
            insights.append(x["text"].strip())
            if len(insights) >= 10: break
    if not insights:
        insights = ["No high-relevance keyword segments found."]
    return insights

def row(title, score, overlap, verdict, url=""):
    return {"title": title, "score": score, "overlap": overlap, "verdict": verdict, "url": url}

def process_video(url, args):
    title = get_title(url)
    transcript_list = get_transcript(url)
    transcript = " ".join([x["text"] for x in transcript_list])
    
    if not transcript:
        return row(title, 0, False, "FAILED", url)
    
    score = score_transcript(transcript) if not args.force else 100
    safe_title = sanitize(title)
    wiki_path = f"wiki/youtube/{safe_title}.md"
    overlap = os.path.exists(wiki_path)
    
    if args.force or (score >= 70 and not overlap):
        verdict = "ABSORB"
    elif score >= 40 or overlap:
        verdict = "ARCHIVE"
    else:
        verdict = "SKIP"
        
    if not args.dry_run:
        if verdict == "ABSORB":
            os.makedirs("wiki/youtube", exist_ok=True)
            with open(wiki_path, "w", encoding="utf-8") as f:
                insights = extract_insights(transcript_list)
                bullet_points = "\n".join([f"- {i}" for i in insights])
                f.write(f"---\ntitle: {title}\nsource: youtube\nurl: {url}\n"
                        f"ingested: {datetime.now().strftime('%Y-%m-%d')}\n"
                        f"relevance_score: {score}\ncategory: imported\n---\n"
                        f"## Key Insights\n{bullet_points}\n\n"
                        f"## Raw Transcript\n{transcript}\n")
        elif verdict == "ARCHIVE":
            os.makedirs("raw/youtube", exist_ok=True)
            with open(f"raw/youtube/{safe_title}.txt", "w", encoding="utf-8") as f:
                f.write(transcript)
        elif verdict == "SKIP":
            os.makedirs(".ungasis/logs", exist_ok=True)
            with open(".ungasis/logs/youtube-skipped.log", "a", encoding="utf-8") as f:
                f.write(f"{datetime.now().isoformat()} - {url} - {title} - Score: {score}\n")
                
    return row(title, score, overlap, verdict, url)

def main():
    parser = argparse.ArgumentParser(description="Smart YouTube transcript ingest")
    parser.add_argument("--url", help="Single video URL")
    parser.add_argument("--batch", help="File with URLs")
    parser.add_argument("--dry-run", action="store_true", help="Show verdicts table, don't create files")
    parser.add_argument("--json", action="store_true", help="Output JSON for dashboard")
    parser.add_argument("--force", action="store_true", help="Bypass filter, always ABSORB")
    args = parser.parse_args()
    
    urls = []
    if args.url: urls.append(args.url)
    if args.batch and os.path.exists(args.batch):
        with open(args.batch, "r", encoding="utf-8") as f:
            urls.extend([line.strip() for line in f if line.strip()])
            
    if not urls:
        parser.print_help()
        sys.exit(0)
            
    results = [process_video(u, args) for u in urls]
    
    if args.json:
        print(json.dumps(results, indent=2))
    else:
        print(f"{'Title':<40} | {'Score':>5} | {'Overlap?':>8} | Verdict")
        print("-" * 75)
        for r in results:
            short_title = r['title'][:37] + "..." if len(r['title']) > 40 else r['title']
            print(f"{short_title:<40} | {r['score']:>5} | {str(r['overlap']):>8} | {r['verdict']}")

if __name__ == "__main__":
    main()
