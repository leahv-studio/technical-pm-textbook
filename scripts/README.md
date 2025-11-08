# Shell Script to support Claude Skills for Intelligent Textbooks


## Personal Binary Location

Utility shell scripts for working with Claude skills are by default installed
to each users personal binary directory.  This means that each user
has complete control over what binaries are installed for their personal use.
The personal binaries should be installed in your path.  We recommend the following path:

`$HOME/.local/bin`

or alternatively:

`~/.local/bin`

Note that these scripts are not specific to any specific intelligent book type.
If you have scripts that are specific to your book type, they will be located in the book repo scripts file.

The following should then be added to your UNIX shell startup file:

```sh
```

## Symbolic Linking Strategy

In order to create a high probability that your scripts are current, we suggest that you only
place symbolic links into your personal binary 

## Metadata

We use metadata fields in the book markdown files to get status.  For example, to get the quality score
of the course description quality score you can look in the docs/source-description.md file and see the following

```markdown
---
title: Course Description for Using Claude Skills to Create Intelligent Textbooks
description: A detailed course description 
quality_score: 95
---
```


## Installation

### install-scripts

**NEW!** Automatically creates symbolic links for all scripts in this directory to `$HOME/.local/bin`, making them available as commands from anywhere in your terminal.

**Usage:**
```bash
cd scripts
./install-scripts
```

**What it does:**
1. Creates `$HOME/.local/bin` directory if it doesn't exist
2. Creates symbolic links for all executable scripts (removes `.sh` extension)
3. Checks if `$HOME/.local/bin` is in your PATH
4. Provides shell-specific instructions to add it to PATH if needed

**After installation, you can run scripts from anywhere:**
```bash
# Instead of:
./scripts/list-skills.sh

# You can now run:
list-skills
```

**Adding to PATH:**

If the script detects that `$HOME/.local/bin` is not in your PATH, it will suggest adding one of these lines to your shell startup file:

For **Bash** (add to `~/.bashrc` or `~/.bash_profile`):
```bash
export PATH="$HOME/.local/bin:$PATH"
```

For **Zsh** (add to `~/.zshrc`):
```bash
export PATH="$HOME/.local/bin:$PATH"
```

For **Fish** (add to `~/.config/fish/config.fish`):
```fish
set -gx PATH $HOME/.local/bin $PATH
```

After adding the line, run `source ~/.bashrc` (or the appropriate file) or restart your terminal.

**Installed scripts:**
- `book-status` - Check metadata status of book files
- `install-claude-skills` - Install skills to `~/.claude/skills/`
- `install-scripts` - This installation script (installs itself!)
- `install-skills-command` - Install skills command
- `list-skills` - List all available skills (text format)
- `list-skills-format` - List skills in various formats

## Available Scripts

### list-skills.sh

Simple script that lists all available skills with their names and descriptions.

**Usage:**
```bash
./scripts/list-skills.sh
```

**Output:**
```
Available Claude Skills
=======================

📘 Skill: faq-generator
   Description: This skill generates a comprehensive set of...

📘 Skill: glossary-generator
   Description: This skill automatically generates...
...
```

### list-skills-format.sh

Enhanced script that supports multiple output formats for different use cases.

**Usage:**
```bash
./scripts/list-skills-format.sh [FORMAT]
```

**Formats:**
- `text` (default) - Human-readable text with emojis
- `markdown` or `md` - Markdown table format
- `csv` - Comma-separated values for spreadsheets
- `json` - JSON format for programmatic use

**Examples:**

```bash
# Default text format
./scripts/list-skills-format.sh

# Generate markdown table
./scripts/list-skills-format.sh markdown

# Generate CSV for spreadsheet
./scripts/list-skills-format.sh csv > skills.csv

# Generate JSON for automation
./scripts/list-skills-format.sh json > skills.json
```

**Sample Outputs:**

**Markdown:**
```markdown
| Skill Name | Description | Location |
|------------|-------------|----------|
| **faq-generator** | This skill generates... | `./skills/faq-generator` |
```

**CSV:**
```csv
Name,Description,Location
"faq-generator","This skill generates...","./skills/faq-generator"
```

**JSON:**
```json
{
  "skills": [
    {
      "name": "faq-generator",
      "description": "This skill generates...",
      "location": "./skills/faq-generator"
    }
  ],
  "total": 8
}
```

## Requirements

- Bash shell (version 4.0 or later)
- Standard Unix tools: `sed`, `awk`, `find`

## How It Works

Both scripts:
1. Scan the `./skills` directory for subdirectories
2. Read the `SKILL.md` file in each skill directory
3. Extract the `name:` and `description:` fields from the YAML frontmatter
4. Format and display the information

The YAML frontmatter in SKILL.md files looks like this:
```yaml
---
name: skill-name
description: Description of what the skill does
license: MIT
---
```

## Use Cases

- **Documentation**: Generate markdown tables for documentation
- **Automation**: Export to JSON for build scripts or CI/CD
- **Spreadsheets**: Export to CSV for tracking or planning
- **Quick Reference**: Use text format for quick terminal lookup

## Notes

- Scripts must be run from the repository root directory
- Both scripts automatically handle quoted values in YAML
- Skills without SKILL.md files are skipped with a warning (text format only)
