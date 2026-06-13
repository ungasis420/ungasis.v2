"""quality-score module."""
# scripts/quality-score.py
import os
import re
import sys
from datetime import datetime

try:
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except AttributeError:
    pass


WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
QUALITY_LOG_PATH = os.path.join(WORKSPACE, ".ungasis", "quality", "quality-log.md")

def validate_quality_log(content):
    """Check quality-log.md has expected table format."""
    issues = []
    if '| Date' not in content and '| date' not in content:
        issues.append("quality-log.md missing table header row")
    return issues

def score_file(filepath, quiet=False):
    """Calculate the quality score of a markdown file.

    Args:
        filepath (str): Path to file to evaluate.
        quiet (bool): Suppress console print tables.
    Returns:
        float: Overall weighted quality score.
    """
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return None
        
    rel_path = os.path.relpath(filepath, WORKSPACE).replace("\\", "/")
    
    try:
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            text = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return None
        
    lines = text.split("\n")
    
    # 1. Completeness (C)
    c_score = 0
    c_details = []
    if len(text.strip()) > 0:
        c_score += 2
    else:
        c_details.append("File is empty")
        
    has_purpose = any(re.search(r'^##\s+(Purpose|What)\b', l.strip(), re.IGNORECASE) for l in lines)
    if has_purpose:
        c_score += 2
    else:
        c_details.append("Missing Purpose/What section")
        
    has_how = any(re.search(r'^##\s+(How|Steps|Rules)\b', l.strip(), re.IGNORECASE) for l in lines)
    if has_how:
        c_score += 2
    else:
        c_details.append("Missing How/Steps/Rules section")
        
    has_io = any(re.search(r'^##\s+(Inputs|Outputs|I/O|I\\O)\b', l.strip(), re.IGNORECASE) for l in lines)
    if has_io:
        c_score += 2
    else:
        c_details.append("Missing I/O section")
        
    has_footer = any("Last reviewed:" in l for l in lines[-5:]) if len(lines) >= 5 else any("Last reviewed:" in l for l in lines)
    if has_footer:
        c_score += 2
    else:
        c_details.append("Missing staleness footer")

    # 2. Accuracy (A)
    a_score = 0
    a_details = []
    basename = os.path.basename(filepath)
    is_kebab = re.match(r'^[a-z0-9]+(-[a-z0-9]+)*\.[a-z0-9]+$', basename) is not None
    allowed_uppers = ["README.md", "CONTEXT.md", "GEMINI.md", "CONVENTIONS.md", "LLM_CONTEXT.md", "MODEL_ROUTING.md", "QA-AUDIT-REPORT.md", "QA-MISSION.md", "JARVIS_CORE.md", "SKILL.md"]
    if is_kebab or basename in allowed_uppers:
        a_score += 2
    else:
        a_details.append("Filename not kebab-case")
        
    expected_dirs = [".ungasis", ".agents", "knowledge", "scripts"]
    if any(d in rel_path for d in expected_dirs):
        a_score += 2
    else:
        a_details.append("File not in expected folder")
        
    has_todo = any(("TODO" in l or "FIXME" in l) for l in lines)
    if not has_todo:
        a_score += 2
    else:
        a_details.append("Contains TODO or FIXME markers")
        
    has_placeholders = any(re.search(r'\[replace\s+this\]|TBD', l, re.IGNORECASE) for l in lines)
    if not has_placeholders:
        a_score += 2
    else:
        a_details.append("Contains placeholder text")
        
    if "archive/" not in rel_path and "source-files/" not in rel_path:
        a_score += 2
    else:
        a_details.append("File path is inside archive/ or source-files/")

    # 3. Clarity (CL)
    cl_score = 0
    cl_details = []
    non_empty_lines = [l for l in lines if l.strip()]
    if non_empty_lines:
        avg_w = sum(len(l.split()) for l in non_empty_lines) / len(non_empty_lines)
        if avg_w < 20:
            cl_score += 2
        else:
            cl_details.append(f"Avg words/line ({avg_w:.1f}) >= 20")
    else:
        cl_details.append("No lines found")
        
    has_long_line = any((len(l) > 100 and "|" not in l) for l in lines)
    if not has_long_line:
        cl_score += 2
    else:
        cl_details.append("Contains lines > 100 chars")
        
    has_table = any(("|" in l and not l.strip().startswith("||")) for l in lines)
    if has_table:
        cl_score += 2
    else:
        cl_details.append("Missing tables")
        
    has_list = any((re.match(r'^[-*+]\s+', l.strip()) or re.match(r'^\d+\.\s+', l.strip())) for l in lines)
    if has_list:
        cl_score += 2
    else:
        cl_details.append("Missing lists")
        
    jargons = ["API", "SDK", "AST", "BFS", "DFS", "MCP", "JSON", "YAML"]
    found_jargons = [j for j in jargons if re.search(r'\b' + j + r'\b', text)]
    if not found_jargons:
        cl_score += 2
    else:
        unexplained = []
        for j in found_jargons:
            explained = re.search(rf'\b{j}\b.*?\b(means|refers|stands|is\s+a|stands\s+for|definition)\b', text, re.IGNORECASE) is not None
            if not explained:
                explained = any(("|" in l and j in l and len(l) > 30) for l in lines)
            if not explained:
                unexplained.append(j)
        if not unexplained:
            cl_score += 2
        else:
            cl_details.append(f"Unexplained jargon: {', '.join(unexplained)}")

    # 4. Format (F)
    f_score = 0
    f_details = []
    headers = sum(1 for l in lines if l.strip().startswith("##"))
    if headers >= 2:
        f_score += 2
    else:
        f_details.append(f"Fewer than 2 headers (found {headers})")
        
    if has_table:
        f_score += 2
    else:
        f_details.append("Missing tables")
        
    if len(lines) < 200:
        f_score += 2
    else:
        f_details.append(f"File too long ({len(lines)} lines)")
        
    has_hr = any(l.strip() == "---" for l in lines)
    if has_hr:
        f_score += 2
    else:
        f_details.append("Missing horizontal rule (---)")
        
    first_non_empty = next((l.strip() for l in lines if l.strip()), "")
    if first_non_empty.startswith("# "):
        f_score += 2
    else:
        f_details.append("First line not main header (#)")

    # 5. Reusability (R)
    r_score = 0
    r_details = []
    has_ref = any((".md" in l or ".ungasis/" in l or ".agents/" in l) for l in lines)
    if has_ref:
        r_score += 2
    else:
        r_details.append("No file cross-references")
        
    has_tags = any(re.search(r'tags:|categories:|\[TAG:|TAG:', l, re.IGNORECASE) for l in lines)
    if has_tags:
        r_score += 2
    else:
        r_details.append("No tags or categories found")
        
    if "example" in text.lower() or "examples" in text.lower():
        r_score += 2
    else:
        r_details.append("Missing examples")
        
    if "when to use" in text.lower():
        r_score += 2
    else:
        r_details.append("Missing 'When to Use' section/text")
        
    if "connects to:" in text.lower() or "see also:" in text.lower() or "precedent" in text.lower():
        r_score += 2
    else:
        r_details.append("Missing cross-connections")

    # Weighted Average Score
    overall = (c_score * 0.25) + (a_score * 0.25) + (cl_score * 0.20) + (f_score * 0.15) + (r_score * 0.15)
    
    def get_rating(val):
        """Get rating.

        Args/Returns if relevant.
        """
        if val >= 8.0: return "EXCELLENT"
        if val >= 6.0: return "GOOD"
        if val >= 4.0: return "NEEDS WORK"
        return "REDO"
        
    dim_rows = [
        ("Completeness", f"{c_score}/10", ", ".join(c_details) if c_details else "All checks passed"),
        ("Accuracy", f"{a_score}/10", ", ".join(a_details) if a_details else "All checks passed"),
        ("Clarity", f"{cl_score}/10", ", ".join(cl_details) if cl_details else "All checks passed"),
        ("Format", f"{f_score}/10", ", ".join(f_details) if f_details else "All checks passed"),
        ("Reusability", f"{r_score}/10", ", ".join(r_details) if r_details else "All checks passed"),
    ]
    
    if not quiet:
        print(f"\n📊 Quality Score — {rel_path}")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"{'Dimension':<20} {'Score':<8} {'Details'}")
        for dim, sc, details in dim_rows:
            print(f"{dim:<20} {sc:<8} {details}")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
        print(f"⭐ OVERALL SCORE: {overall:.1f} / 10.0")
        print(f"Rating: {get_rating(overall)} (≥8=Excellent, 6-7=Good, 4-5=Needs Work, <4=Redo)")
        print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    
    # Append to log
    log_content = ""
    is_valid = True
    if os.path.exists(QUALITY_LOG_PATH):
        try:
            with open(QUALITY_LOG_PATH, "r", encoding="utf-8", errors="ignore") as f:
                log_content = f.read()
            issues = validate_quality_log(log_content)
            if issues and not quiet:
                print(f"Warning: quality-log.md format issue(s) detected: {', '.join(issues)}")
                is_valid = False
        except Exception:
            pass

    if not os.path.exists(QUALITY_LOG_PATH) or not is_valid:
        log_content = (
            "# Quality Log\n\n"
            "History database tracker to monitor quality scores, dimension ratings, and improvement trends.\n\n"
            "## Quality History\n\n"
            "| Date | File | Score | Dimensions (C/A/Cl/F/R) | Notes |\n"
            "|---|---|---|---|---|\n"
        )
        
    today_str = datetime.now().strftime("%Y-%m-%d")
    dim_str = f"C:{c_score}/A:{a_score}/Cl:{cl_score}/F:{f_score}/R:{r_score}"
    log_entry = f"| {today_str} | {rel_path} | {overall:.1f} | {dim_str} | Auto-scored |\n"
    
    footer_marker = "---"
    if footer_marker in log_content:
        parts = log_content.rsplit(footer_marker, 1)
        new_content = parts[0] + log_entry + "\n" + footer_marker + parts[1]
    else:
        new_content = log_content + "\n" + log_entry
        
    try:
        os.makedirs(os.path.dirname(QUALITY_LOG_PATH), exist_ok=True)
        with open(QUALITY_LOG_PATH, "w", encoding="utf-8") as f:
            f.write(new_content)
    except Exception as e:
        if not quiet:
            print(f"Error logging quality score: {e}")
        
    return overall

def show_usage():
    """Print command-line usage information."""
    print("Usage:")
    print("  python scripts/quality-score.py [path/to/file.md] [--batch | -b]")
    print("\nNo file specified. Evaluating 3 default UNGASIS files:")

def run_batch_scoring():
    """Walk .ungasis/ and score every markdown file."""
    ungasis_dir = os.path.join(WORKSPACE, ".ungasis")
    md_files = []
    for root, dirs, files in os.walk(ungasis_dir):
        dirs[:] = [d for d in dirs if d not in ["archive", "source-files"]]
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(root, file))
    
    total_files = len(md_files)
    if total_files == 0:
        print("No markdown files found in .ungasis/")
        return
        
    scores = []
    excellent_count = 0
    good_count = 0
    needs_work_count = 0
    redo_count = 0
    
    print(f"Batch Scoring Mode: Evaluating {total_files} files in .ungasis/\n")
    print(f"{'Score':<6} | {'Rating':<12} | {'Path'}")
    print("-" * 60)
    
    for path in sorted(md_files):
        score = score_file(path, quiet=True)
        if score is None:
            continue
        scores.append(score)
        
        if score >= 8.0:
            rating = "EXCELLENT"
            excellent_count += 1
        elif score >= 6.0:
            rating = "GOOD"
            good_count += 1
        elif score >= 4.0:
            rating = "NEEDS WORK"
            needs_work_count += 1
        else:
            rating = "REDO"
            redo_count += 1
            
        rel_path = os.path.relpath(path, WORKSPACE).replace("\\", "/")
        print(f"{score:>5.1f}  | {rating:<12} | {rel_path}")
        
    avg_score = sum(scores) / len(scores) if scores else 0
    print("\n" + "=" * 60)
    print("Batch Scoring Summary")
    print("=" * 60)
    print(f"Total Files Scored: {total_files}")
    print(f"Average Quality Score: {avg_score:.2f} / 10.0")
    print(f"Ratings Distribution:")
    print(f"  Excellent (>=8.0):  {excellent_count}")
    print(f"  Good (6.0-7.9):     {good_count}")
    print(f"  Needs Work (4.0-5.9): {needs_work_count}")
    print(f"  Redo (<4.0):        {redo_count}")
    print("=" * 60)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] in ["--batch", "-b"]:
            run_batch_scoring()
        else:
            score_file(sys.argv[1])
    else:
        show_usage()
        default_files = [
            ".ungasis/memory/memory-rules.md",
            ".ungasis/jarvis-core/JARVIS_CORE.md",
            ".agents/skills/commander/SKILL.md"
        ]
        for f in default_files:
            f_path = os.path.join(WORKSPACE, f)
            if os.path.exists(f_path):
                score_file(f_path)
            else:
                print(f"\nSkipped: {f} (Not found on disk)")
