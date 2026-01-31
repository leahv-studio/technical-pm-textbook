#!/bin/bash
# Generate book cover image using OpenAI API
# Uses the course description to generate an appropriate cover

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

COURSE_DESC="$PROJECT_ROOT/docs/course-description.md"
PYTHON_SCRIPT="$SCRIPT_DIR/generate-cover-openai.py"
OUTPUT_DIR="$PROJECT_ROOT/docs/img"

echo "=== Cover Image Generator ==="
echo ""

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo "❌ ERROR: OPENAI_API_KEY environment variable is not set"
    echo "   Set it with: export OPENAI_API_KEY='your-key-here'"
    exit 1
else
    echo "✓ OPENAI_API_KEY is set"
fi

# Check for Python script
if [ -f "$PYTHON_SCRIPT" ]; then
    echo "✓ Python script found: $PYTHON_SCRIPT"
else
    echo "❌ ERROR: Python script not found: $PYTHON_SCRIPT"
    exit 1
fi

# Check for course description
if [ -f "$COURSE_DESC" ]; then
    echo "✓ Course description found: $COURSE_DESC"
else
    echo "❌ ERROR: Course description not found: $COURSE_DESC"
    exit 1
fi

# Check/create output directory
if [ -d "$OUTPUT_DIR" ]; then
    echo "✓ Output directory exists: $OUTPUT_DIR"
else
    echo "→ Creating output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

echo ""
echo "Generating cover image..."
echo ""

python "$PYTHON_SCRIPT" \
    --desc "$COURSE_DESC" \
    --title "Introduction to Economics" \
    --out "$OUTPUT_DIR/cover.png" \
    "$@"
