---
name: install-mkdocs-template
description: This skill creates a complete MkDocs Material project structure for intelligent textbooks. It generates mkdocs.yml with all Material theme options, custom CSS for branding, the social_override plugin for custom social media cards, and the standard directory structure. Use this skill when starting a new intelligent textbook project or when setting up MkDocs with the full Material theme configuration.
---

# Install MkDocs Template

This skill creates a complete MkDocs Material project structure optimized for intelligent textbooks.

## What This Skill Creates

1. **mkdocs.yml** - Complete configuration with all Material theme options
2. **docs/css/extra.css** - Custom CSS with branding color variables
3. **docs/img/** - Directory for logo and favicon
4. **plugins/** - Social override plugin for custom social media cards
5. **setup.py** - Plugin installation configuration
6. **docs/index.md** - Home page template

## Prerequisites

- Python 3.8 or higher
- pip package manager
- MkDocs and Material theme installed (`pip install mkdocs mkdocs-material`)

## Workflow

### Step 1: Gather Project Information

Before creating files, collect the following information from the user:

1. **site_name** - The title of the textbook (e.g., "Introduction to Machine Learning")
2. **site_description** - A brief description for SEO and social sharing
3. **site_author** - Author name(s)
4. **repo_name** - GitHub repository display name (default: "GitHub Repo")
5. **site_url** - Full URL where the site will be hosted (e.g., "https://username.github.io/repo-name/")
6. **repo_url** - GitHub repository URL
7. **primary_color_rgb** - Primary brand color as RGB values (default: 218, 120, 87 - Anthropic brown)
8. **google_analytics_id** - Optional Google Analytics property ID

### Step 2: Create Directory Structure

Create the following directory structure in the current working directory:

```
project-root/
├── docs/
│   ├── css/
│   │   └── extra.css
│   ├── img/
│   │   ├── logo.png (placeholder - user must provide)
│   │   └── favicon.ico (placeholder - user must provide)
│   ├── chapters/
│   │   └── index.md
│   ├── learning-graph/
│   │   └── index.md
│   ├── sims/
│   │   └── index.md
│   └── index.md
├── plugins/
│   ├── __init__.py
│   └── social_override.py
├── mkdocs.yml
└── setup.py
```

### Step 3: Create mkdocs.yml

Use the template from `assets/mkdocs-template.yml` as the base. Replace placeholders with user-provided values:

- `{{SITE_NAME}}` - site_name
- `{{SITE_DESCRIPTION}}` - site_description
- `{{SITE_AUTHOR}}` - site_author
- `{{REPO_NAME}}` - repo_name
- `{{SITE_URL}}` - site_url
- `{{REPO_URL}}` - repo_url
- `{{GOOGLE_ANALYTICS_ID}}` - google_analytics_id (remove analytics section if not provided)

### Step 4: Create extra.css

Use the template from `assets/extra.css` as the base. Replace the RGB color values with user-provided primary_color_rgb if different from default.

### Step 5: Create Social Override Plugin

Copy the following files from assets:

- `assets/plugins/__init__.py` → `plugins/__init__.py`
- `assets/plugins/social_override.py` → `plugins/social_override.py`
- `assets/setup.py` → `setup.py`

### Step 6: Create Starter Content Files

Create minimal starter files for each directory:

**docs/index.md:**
```markdown
# Welcome to {{SITE_NAME}}

{{SITE_DESCRIPTION}}

## Getting Started

This intelligent textbook is built with MkDocs Material theme.

## Navigation

Use the navigation menu on the left to explore chapters and content.
```

**docs/chapters/index.md:**
```markdown
# Chapters

This section contains the main chapter content of the textbook.
```

**docs/learning-graph/index.md:**
```markdown
# Learning Graph

This section contains the learning graph visualization and concept dependencies.
```

**docs/sims/index.md:**
```markdown
# Interactive Simulations

This section contains MicroSims - interactive educational simulations.
```

### Step 7: Install the Plugin

After creating all files, instruct the user to run:

```bash
pip install -e .
```

This installs the social_override plugin in editable mode.

### Step 8: Verify Installation

Instruct the user to verify the installation:

```bash
mkdocs serve
```

The site should be accessible at http://localhost:8000

## MkDocs Material Features Included

The template includes these Material theme features:

### Navigation

- `navigation.expand` - Expandable navigation sections
- `navigation.path` - Breadcrumb navigation path
- `navigation.prune` - Prune inactive navigation items
- `navigation.indexes` - Section index pages
- `navigation.top` - Back to top button
- `navigation.footer` - Previous/next page links in footer
- `toc.follow` - Table of contents follows scroll

### Content

- `content.code.copy` - Copy button for code blocks
- `content.action.edit` - Edit on GitHub button

### Plugins

- `search` - Full-text search
- `social` - Social media card generation
- `social_override` - Custom social media images per page

### Markdown Extensions

- `md_in_html` - Markdown inside HTML blocks
- `admonition` - Callout boxes (note, warning, tip, etc.)
- `attr_list` - Add HTML attributes to elements
- `pymdownx.details` - Collapsible content blocks
- `pymdownx.superfences` - Enhanced code fencing
- `pymdownx.highlight` - Syntax highlighting with line numbers

## Customizing Social Media Cards

To use a custom social media image for any page, add frontmatter:

```markdown
---
title: My Page Title
image: img/my-custom-social-card.png
---

# Page Content Here
```

The social_override plugin will use the custom image instead of the auto-generated one.

## Logo and Favicon

After running the skill, the user must provide:

1. `docs/img/logo.png` - Site logo (recommended: 50x50px)
2. `docs/img/favicon.ico` - Browser favicon

## Notes

- The template uses a custom primary color defined in CSS rather than Material's built-in palette
- Google Analytics is optional - remove the `analytics` section from mkdocs.yml if not needed
- The edit_uri points to the `blob/master/docs` path - adjust if using a different branch
