#!/bin/bash
# Generate book cover image using OpenAI API
# Uses the course description and mkdocs.yml to generate an appropriate cover
#
# This script should be run from the project root directory (where mkdocs.yml lives)
# It will find files relative to the current working directory.
#
# Usage:
#   generate-cover.sh                # Full generation (requires API billing)
#   generate-cover.sh --prompt-only  # Generate prompt via API (requires billing)
#   generate-cover.sh --local-prompt # Generate prompt locally (NO API needed)

# Get the directory where this script lives (for finding the Python script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PYTHON_SCRIPT="$SCRIPT_DIR/generate-cover-openai.py"

# Use current working directory as the project root
PROJECT_ROOT="$(pwd)"
MKDOCS_YML="$PROJECT_ROOT/mkdocs.yml"
COURSE_DESC="$PROJECT_ROOT/docs/course-description.md"
OUTPUT_DIR="$PROJECT_ROOT/docs/img"

echo "=== Cover Image Generator ==="
echo ""
echo "Project directory: $PROJECT_ROOT"
echo ""

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "ERROR: OPENAI_API_KEY environment variable is not set"
    echo "   Set it with: export OPENAI_API_KEY='your-key-here'"
    exit 1
else
    echo "OPENAI_API_KEY is set"
fi

# Check for Python script
if [ -f "$PYTHON_SCRIPT" ]; then
    echo "Python script found: $PYTHON_SCRIPT"
else
    echo "ERROR: Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# Check for mkdocs.yml
if [ -f "$MKDOCS_YML" ]; then
    echo "mkdocs.yml found: $MKDOCS_YML"
else
    echo "ERROR: mkdocs.yml not found: $MKDOCS_YML"
    echo "   Make sure you are running this script from the project root directory"
    exit 1
fi

# Check for course description
if [ -f "$COURSE_DESC" ]; then
    echo "Course description found: $COURSE_DESC"
else
    echo "ERROR: Course description not found: $COURSE_DESC"
    exit 1
fi

# Extract site_name from mkdocs.yml
BOOK_TITLE=$(grep -E "^site_name:" "$MKDOCS_YML" | sed 's/site_name:[[:space:]]*//' | sed 's/^["\x27]//' | sed 's/["\x27]$//')

if [ -z "$BOOK_TITLE" ]; then
    echo "ERROR: Could not extract site_name from mkdocs.yml"
    exit 1
fi

# Check/create output directory
if [ -d "$OUTPUT_DIR" ]; then
    echo "Output directory exists: $OUTPUT_DIR"
else
    echo "Will create output directory: $OUTPUT_DIR"
fi

echo ""
echo "=== Configuration Summary ==="
echo ""
echo "  Book Title:          $BOOK_TITLE"
echo "  Course Description:  $COURSE_DESC"
echo "  Output Directory:    $OUTPUT_DIR"
echo "  Output File:         $OUTPUT_DIR/cover.png"
echo ""

# Ask for user confirmation
read -p "Is this correct? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Aborted by user."
    exit 0
fi

# Create output directory if needed
if [ ! -d "$OUTPUT_DIR" ]; then
    echo ""
    echo "Creating output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

echo ""
echo "Generating cover image..."
echo ""

python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "$BOOK_TITLE" \
    --out "$OUTPUT_DIR/cover.png" \
    "$@"
