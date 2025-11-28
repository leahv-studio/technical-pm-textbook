#!/usr/bin/env python3
"""
book-status.py - Check the status of an intelligent textbook project

This script validates the completeness of an intelligent textbook by checking
for required files, directories, and content. It provides a visual checklist
with green checkmarks for completed items and red X marks for missing items.

Usage:
    python book-status.py [path_to_book]

If no path is provided, uses current working directory.
"""

import os
import sys
import re
import glob
from pathlib import Path

# ANSI color codes for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
BOLD = '\033[1m'
RESET = '\033[0m'

# Unicode symbols
CHECK = '✓'
CROSS = '✗'
ARROW = '→'

def print_status(passed: bool, message: str, details: str = None):
    """Print a status line with checkmark or X."""
    symbol = f"{GREEN}{CHECK}{RESET}" if passed else f"{RED}{CROSS}{RESET}"
    print(f"  {symbol} {message}")
    if details:
        print(f"      {YELLOW}{details}{RESET}")

def print_header(title: str):
    """Print a section header."""
    print(f"\n{BOLD}{BLUE}{title}{RESET}")
    print("─" * 50)

def check_yaml_frontmatter(file_path: Path, key: str) -> tuple[bool, any]:
    """Check if a markdown file has a specific key in YAML frontmatter."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for YAML frontmatter
        if not content.startswith('---'):
            return False, None

        # Extract frontmatter
        parts = content.split('---', 2)
        if len(parts) < 3:
            return False, None

        frontmatter = parts[1]

        # Simple YAML parsing for the key
        pattern = rf'^{key}:\s*(.+)$'
        match = re.search(pattern, frontmatter, re.MULTILINE)
        if match:
            return True, match.group(1).strip()
        return False, None
    except Exception:
        return False, None

def count_words_in_file(file_path: Path) -> int:
    """Count words in a markdown file (excluding frontmatter)."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove YAML frontmatter
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                content = parts[2]

        # Count words
        words = re.findall(r'\b\w+\b', content)
        return len(words)
    except Exception:
        return 0

def check_file_has_content(file_path: Path, min_words: int = 100) -> bool:
    """Check if a file has meaningful content (more than min_words)."""
    return count_words_in_file(file_path) >= min_words

def find_chapters(docs_path: Path) -> list[Path]:
    """Find all chapter directories."""
    chapters_dir = docs_path / 'chapters'
    if not chapters_dir.exists():
        return []

    chapters = []
    for item in sorted(chapters_dir.iterdir()):
        if item.is_dir() and not item.name.startswith('.'):
            chapters.append(item)
    return chapters

def check_microsims(docs_path: Path) -> tuple[bool, int]:
    """Check for MicroSims in docs/sims directory."""
    sims_dir = docs_path / 'sims'
    if not sims_dir.exists():
        return False, 0

    # Count directories with main.html files
    microsim_count = 0
    for item in sims_dir.iterdir():
        if item.is_dir():
            main_html = item / 'main.html'
            if main_html.exists():
                microsim_count += 1

    return microsim_count > 0, microsim_count

def check_references_in_file(file_path: Path) -> bool:
    """Check if a file contains references (numbered list with links)."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for numbered references with URLs
        pattern = r'\d+\.\s+\[.+\]\(https?://.+\)'
        matches = re.findall(pattern, content)
        return len(matches) >= 3  # At least 3 references
    except Exception:
        return False

def main():
    # Determine book path
    if len(sys.argv) > 1:
        book_path = Path(sys.argv[1]).resolve()
    else:
        book_path = Path.cwd()

    print(f"\n{BOLD}📚 Intelligent Textbook Status Report{RESET}")
    print(f"   Book path: {book_path}")

    # Track status for next step recommendation
    status = {
        'is_book': False,
        'course_description': False,
        'course_description_quality': False,
        'learning_graph_dir': False,
        'learning_graph_csv': False,
        'chapters_dir': False,
        'chapters_with_content': 0,
        'total_chapters': 0,
        'glossary': False,
        'faq': False,
        'quizzes': 0,
        'references': False,
        'microsims': 0,
        'diagram_table': False,
        'diagram_details': False,
    }

    # ─────────────────────────────────────────────────────────────
    # CHECK 1: Verify this is an intelligent book directory
    # ─────────────────────────────────────────────────────────────
    print_header("1. Project Structure Validation")

    docs_path = book_path / 'docs'
    mkdocs_yml = book_path / 'mkdocs.yml'

    docs_exists = docs_path.exists() and docs_path.is_dir()
    mkdocs_exists = mkdocs_yml.exists()

    print_status(docs_exists, "docs/ directory exists")
    print_status(mkdocs_exists, "mkdocs.yml configuration file exists")

    if not docs_exists or not mkdocs_exists:
        print(f"\n{RED}{BOLD}Error:{RESET} This does not appear to be an intelligent textbook project.")
        print(f"       Expected to find 'docs/' directory and 'mkdocs.yml' file.")
        print(f"       Please run this script from the root of your textbook project.")
        sys.exit(1)

    status['is_book'] = True

    # ─────────────────────────────────────────────────────────────
    # CHECK 2: Course Description
    # ─────────────────────────────────────────────────────────────
    print_header("2. Course Description")

    course_desc = docs_path / 'course-description.md'
    course_desc_exists = course_desc.exists()
    print_status(course_desc_exists, "docs/course-description.md exists")
    status['course_description'] = course_desc_exists

    if course_desc_exists:
        has_quality, quality_value = check_yaml_frontmatter(course_desc, 'quality_score')
        print_status(has_quality, "Course description has quality_score in metadata",
                    f"Score: {quality_value}" if has_quality else "Missing quality_score field")
        status['course_description_quality'] = has_quality

        has_content = check_file_has_content(course_desc, 200)
        print_status(has_content, "Course description has substantial content")

    # ─────────────────────────────────────────────────────────────
    # CHECK 3: Learning Graph
    # ─────────────────────────────────────────────────────────────
    print_header("3. Learning Graph")

    lg_dir = docs_path / 'learning-graph'
    lg_dir_exists = lg_dir.exists() and lg_dir.is_dir()
    print_status(lg_dir_exists, "docs/learning-graph/ directory exists")
    status['learning_graph_dir'] = lg_dir_exists

    if lg_dir_exists:
        lg_csv = lg_dir / 'learning-graph.csv'
        lg_csv_exists = lg_csv.exists()
        print_status(lg_csv_exists, "learning-graph.csv exists")
        status['learning_graph_csv'] = lg_csv_exists

        lg_json = lg_dir / 'learning-graph.json'
        print_status(lg_json.exists(), "learning-graph.json exists (for visualization)")

        quality_metrics = lg_dir / 'quality-metrics.md'
        print_status(quality_metrics.exists(), "quality-metrics.md exists")

        concept_list = lg_dir / 'concept-list.md'
        print_status(concept_list.exists(), "concept-list.md exists")

        # Count concepts in CSV
        if lg_csv_exists:
            try:
                with open(lg_csv, 'r') as f:
                    lines = f.readlines()
                concept_count = len(lines) - 1  # Subtract header
                print(f"      {YELLOW}Concepts in graph: {concept_count}{RESET}")
            except Exception:
                pass

    # ─────────────────────────────────────────────────────────────
    # CHECK 4: Chapters
    # ─────────────────────────────────────────────────────────────
    print_header("4. Chapter Content")

    chapters_dir = docs_path / 'chapters'
    chapters_dir_exists = chapters_dir.exists() and chapters_dir.is_dir()
    print_status(chapters_dir_exists, "docs/chapters/ directory exists")
    status['chapters_dir'] = chapters_dir_exists

    if chapters_dir_exists:
        chapters = find_chapters(docs_path)
        status['total_chapters'] = len(chapters)
        print(f"      {YELLOW}Found {len(chapters)} chapter directories{RESET}")

        chapters_with_content = 0
        chapters_with_quiz = 0

        for chapter in chapters:
            index_file = chapter / 'index.md'
            if index_file.exists() and check_file_has_content(index_file, 500):
                chapters_with_content += 1

            quiz_file = chapter / 'quiz.md'
            if quiz_file.exists():
                chapters_with_quiz += 1

        status['chapters_with_content'] = chapters_with_content
        status['quizzes'] = chapters_with_quiz

        all_chapters_done = chapters_with_content == len(chapters) and len(chapters) > 0
        print_status(all_chapters_done,
                    f"Chapters with content: {chapters_with_content}/{len(chapters)}",
                    None if all_chapters_done else "Some chapters need content")

        all_quizzes_done = chapters_with_quiz == len(chapters) and len(chapters) > 0
        print_status(all_quizzes_done,
                    f"Chapters with quiz.md: {chapters_with_quiz}/{len(chapters)}",
                    None if all_quizzes_done else "Some chapters need quizzes")

    # ─────────────────────────────────────────────────────────────
    # CHECK 5: Glossary
    # ─────────────────────────────────────────────────────────────
    print_header("5. Glossary")

    glossary = docs_path / 'glossary.md'
    glossary_exists = glossary.exists()
    print_status(glossary_exists, "docs/glossary.md exists")
    status['glossary'] = glossary_exists

    if glossary_exists:
        has_content = check_file_has_content(glossary, 1000)
        print_status(has_content, "Glossary has substantial content (1000+ words)")

        # Count glossary terms (#### headers)
        try:
            with open(glossary, 'r') as f:
                content = f.read()
            terms = len(re.findall(r'^####\s+', content, re.MULTILINE))
            print(f"      {YELLOW}Glossary terms: {terms}{RESET}")
        except Exception:
            pass

    # ─────────────────────────────────────────────────────────────
    # CHECK 6: FAQ
    # ─────────────────────────────────────────────────────────────
    print_header("6. FAQ")

    faq = docs_path / 'faq.md'
    faq_exists = faq.exists()
    print_status(faq_exists, "docs/faq.md exists")
    status['faq'] = faq_exists

    if faq_exists:
        has_content = check_file_has_content(faq, 500)
        print_status(has_content, "FAQ has substantial content")

        # Count FAQ entries (### headers)
        try:
            with open(faq, 'r') as f:
                content = f.read()
            questions = len(re.findall(r'^###\s+', content, re.MULTILINE))
            print(f"      {YELLOW}FAQ questions: {questions}{RESET}")
        except Exception:
            pass

    # ─────────────────────────────────────────────────────────────
    # CHECK 7: References
    # ─────────────────────────────────────────────────────────────
    print_header("7. References")

    references = docs_path / 'references.md'
    references_exists = references.exists()
    print_status(references_exists, "docs/references.md exists")

    if references_exists:
        has_refs = check_references_in_file(references)
        print_status(has_refs, "References file has citations with links")
        status['references'] = has_refs

        # Count references
        try:
            with open(references, 'r') as f:
                content = f.read()
            ref_count = len(re.findall(r'^\d+\.\s+\[', content, re.MULTILINE))
            print(f"      {YELLOW}Reference count: {ref_count}{RESET}")
        except Exception:
            pass

    # ─────────────────────────────────────────────────────────────
    # CHECK 8: MicroSims
    # ─────────────────────────────────────────────────────────────
    print_header("8. MicroSims (Interactive Simulations)")

    has_microsims, microsim_count = check_microsims(docs_path)
    print_status(has_microsims, f"MicroSims found: {microsim_count}")
    status['microsims'] = microsim_count

    if has_microsims:
        sims_dir = docs_path / 'sims'
        # List first few MicroSims
        sims = [d.name for d in sims_dir.iterdir() if d.is_dir() and (d / 'main.html').exists()][:5]
        if sims:
            print(f"      {YELLOW}Examples: {', '.join(sims)}{RESET}")

    # ─────────────────────────────────────────────────────────────
    # CHECK 9: Diagram Reports
    # ─────────────────────────────────────────────────────────────
    print_header("9. Diagram & MicroSim Reports")

    if lg_dir_exists:
        diagram_table = lg_dir / 'diagram-table.md'
        diagram_table_exists = diagram_table.exists()
        print_status(diagram_table_exists, "learning-graph/diagram-table.md exists")
        status['diagram_table'] = diagram_table_exists

        diagram_details = lg_dir / 'diagram-details.md'
        diagram_details_exists = diagram_details.exists()
        print_status(diagram_details_exists, "learning-graph/diagram-details.md exists")
        status['diagram_details'] = diagram_details_exists

        microsim_report = lg_dir / 'microsim-quality-report.md'
        print_status(microsim_report.exists(), "learning-graph/microsim-quality-report.md exists")
    else:
        print_status(False, "learning-graph/ directory required for reports")

    # ─────────────────────────────────────────────────────────────
    # SUMMARY AND NEXT STEP
    # ─────────────────────────────────────────────────────────────
    print_header("Summary & Next Step")

    # Calculate completion percentage
    checks = [
        status['course_description'],
        status['course_description_quality'],
        status['learning_graph_dir'],
        status['learning_graph_csv'],
        status['chapters_dir'],
        status['chapters_with_content'] == status['total_chapters'] and status['total_chapters'] > 0,
        status['glossary'],
        status['faq'],
        status['quizzes'] == status['total_chapters'] and status['total_chapters'] > 0,
        status['references'],
        status['microsims'] > 0,
        status['diagram_table'],
        status['diagram_details'],
    ]

    completed = sum(checks)
    total = len(checks)
    percentage = int((completed / total) * 100) if total > 0 else 0

    # Progress bar
    bar_width = 30
    filled = int(bar_width * completed / total)
    bar = '█' * filled + '░' * (bar_width - filled)
    print(f"\n  Progress: [{bar}] {percentage}% ({completed}/{total} checks)")

    # Determine next step
    print(f"\n  {BOLD}Next Step:{RESET}")

    if not status['course_description']:
        print(f"  {ARROW} Create docs/course-description.md with title, audience, prerequisites,")
        print(f"    topics, and Bloom's Taxonomy learning outcomes.")
        print(f"    Run: /skill course-description-analyzer")
    elif not status['course_description_quality']:
        print(f"  {ARROW} Analyze your course description to get a quality score.")
        print(f"    Run: /skill course-description-analyzer")
    elif not status['learning_graph_csv']:
        print(f"  {ARROW} Generate a learning graph with 200 concepts and dependencies.")
        print(f"    Run: /skill learning-graph-generator")
    elif not status['chapters_dir'] or status['total_chapters'] == 0:
        print(f"  {ARROW} Create chapter structure based on your learning graph.")
        print(f"    Run: /skill book-chapter-generator")
    elif status['chapters_with_content'] < status['total_chapters']:
        remaining = status['total_chapters'] - status['chapters_with_content']
        print(f"  {ARROW} Generate content for {remaining} remaining chapter(s).")
        print(f"    Run: /skill chapter-content-generator")
    elif not status['glossary']:
        print(f"  {ARROW} Generate a glossary from your concept list.")
        print(f"    Run: /skill glossary-generator")
    elif not status['faq']:
        print(f"  {ARROW} Generate FAQs from your course content.")
        print(f"    Run: /skill faq-generator")
    elif status['quizzes'] < status['total_chapters']:
        remaining = status['total_chapters'] - status['quizzes']
        print(f"  {ARROW} Generate quizzes for {remaining} chapter(s).")
        print(f"    Run: /skill quiz-generator")
    elif not status['references']:
        print(f"  {ARROW} Add references to docs/references.md.")
        print(f"    Run: /skill reference-generator")
    elif status['microsims'] == 0:
        print(f"  {ARROW} Create interactive MicroSims for key concepts.")
        print(f"    Run: /skill microsim-p5 or /skill microsim-matcher")
    elif not status['diagram_table'] or not status['diagram_details']:
        print(f"  {ARROW} Generate diagram and MicroSim reports.")
        print(f"    Run: /skill diagram-reports-generator")
    else:
        print(f"  {GREEN}{ARROW} Congratulations! Your intelligent textbook is complete!{RESET}")
        print(f"    Consider running: mkdocs serve  (to preview)")
        print(f"                      mkdocs gh-deploy  (to publish)")

    print()
    return 0 if percentage == 100 else 1

if __name__ == '__main__':
    sys.exit(main())
