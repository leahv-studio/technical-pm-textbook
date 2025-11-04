#!/bin/bash

# List all Claude skills with their descriptions
# Extracts name and description from YAML frontmatter in SKILL.md files
# Usage: list-skills.sh [--json|--names-only]

USER_SKILLS_DIR="$HOME/.claude/skills"
PROJECT_SKILLS_DIR=".claude/skills"

# Check for output mode flags
JSON_OUTPUT=0
NAMES_ONLY=0

if [ "$1" == "--json" ]; then
    JSON_OUTPUT=1
elif [ "$1" == "--names-only" ]; then
    NAMES_ONLY=1
fi

if [ $JSON_OUTPUT -eq 0 ] && [ $NAMES_ONLY -eq 0 ]; then
    echo "Available Claude Skills"
    echo "======================="
    echo ""
fi

# Array to store skills for JSON output
declare -a SKILLS_JSON=()
# Array to store skill names for names-only output
declare -a SKILLS_NAMES=()

# Function to process skills in a directory
process_skills_dir() {
    local skills_dir="$1"
    local location="$2"

    # Check if skills directory exists
    if [ ! -d "$skills_dir" ]; then
        return
    fi

    # Loop through each directory in skills/
    for skill_dir in "$skills_dir"/*; do
        # Skip if not a directory
        if [ ! -d "$skill_dir" ]; then
            continue
        fi

        skill_name=$(basename "$skill_dir")
        skill_md="$skill_dir/SKILL.md"

        # Check if SKILL.md exists
        if [ ! -f "$skill_md" ]; then
            if [ $JSON_OUTPUT -eq 0 ] && [ $NAMES_ONLY -eq 0 ]; then
                echo "⚠️  $skill_name: No SKILL.md file found"
                echo ""
            fi
            continue
        fi

        # Extract name and description from YAML frontmatter
        # Read lines between --- markers and extract name and description
        in_frontmatter=0
        name=""
        description=""

        while IFS= read -r line; do
            # Check for YAML frontmatter delimiters
            if [[ "$line" == "---" ]]; then
                if [ $in_frontmatter -eq 0 ]; then
                    in_frontmatter=1
                else
                    # End of frontmatter, stop reading
                    break
                fi
                continue
            fi

            # If we're in frontmatter, extract name and description
            if [ $in_frontmatter -eq 1 ]; then
                if [[ "$line" =~ ^name:\ * ]]; then
                    name=$(echo "$line" | sed 's/^name: *//')
                elif [[ "$line" =~ ^description:\ * ]]; then
                    # Handle multi-line descriptions
                    description=$(echo "$line" | sed 's/^description: *//')
                fi
            fi
        done < "$skill_md"

        # Use skill_name as fallback if name not found
        if [ -z "$name" ]; then
            name="$skill_name"
        fi

        if [ -z "$description" ]; then
            description="(No description found)"
        fi

        # Escape quotes for JSON
        name_escaped=$(echo "$name" | sed 's/"/\\"/g')
        description_escaped=$(echo "$description" | sed 's/"/\\"/g')

        if [ $JSON_OUTPUT -eq 1 ]; then
            # Add to JSON array
            SKILLS_JSON+=("{\"name\":\"$name_escaped\",\"description\":\"$description_escaped\",\"location\":\"$location\"}")
        elif [ $NAMES_ONLY -eq 1 ]; then
            # Add to names array
            SKILLS_NAMES+=("$name")
        else
            # Display the skill information (original format)
            echo "📘 Skill: $name ($location)"
            echo "   Description: $description"
            echo ""
        fi
    done
}

# Process user skills directory
process_skills_dir "$USER_SKILLS_DIR" "user"

# Process project skills directory
process_skills_dir "$PROJECT_SKILLS_DIR" "project"

# Count total skills from both directories
# Note: Use -type d,l to count both directories and symlinks
user_count=0
project_count=0

if [ -d "$USER_SKILLS_DIR" ]; then
    user_count=$(find "$USER_SKILLS_DIR" -mindepth 1 -maxdepth 1 \( -type d -o -type l \) 2>/dev/null | wc -l | tr -d ' ')
fi

if [ -d "$PROJECT_SKILLS_DIR" ]; then
    project_count=$(find "$PROJECT_SKILLS_DIR" -mindepth 1 -maxdepth 1 \( -type d -o -type l \) 2>/dev/null | wc -l | tr -d ' ')
fi

total_count=$((user_count + project_count))

if [ $JSON_OUTPUT -eq 1 ]; then
    # Output compact JSON format (single line, no pretty printing)
    echo -n "{\"total\":$total_count,\"user\":$user_count,\"project\":$project_count,\"skills\":["

    # Join array elements with commas
    first=1
    for skill in "${SKILLS_JSON[@]}"; do
        if [ $first -eq 1 ]; then
            first=0
        else
            echo -n ","
        fi
        echo -n "$skill"
    done
    echo "]}"
elif [ $NAMES_ONLY -eq 1 ]; then
    # Output names only (one per line)
    for name in "${SKILLS_NAMES[@]}"; do
        echo "$name"
    done
else
    # Output human-readable format
    echo "======================="
    echo "Total skills: $total_count (user: $user_count, project: $project_count)"
fi
