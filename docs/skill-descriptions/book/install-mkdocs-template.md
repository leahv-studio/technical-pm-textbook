# Install MkDocs Template

The install-mkdocs-template skill creates a complete MkDocs Material project
structure optimized for intelligent textbooks. It generates all configuration
files, custom styling, and the social_override plugin for custom social media
cards.

## Key Capabilities

This skill sets up a fully-configured MkDocs Material project with:

1. **Complete mkdocs.yml** - All Material theme options pre-configured
2. **Custom CSS** - Brand color customization with CSS variables
3. **Social Override Plugin** - Per-page custom social media card images
4. **Directory Structure** - Standard intelligent textbook layout

## What Gets Created

```
project-root/
├── docs/
│   ├── css/extra.css           # Brand colors and custom styles
│   ├── img/                    # Logo and favicon placeholders
│   ├── chapters/index.md       # Chapter section starter
│   ├── learning-graph/index.md # Learning graph section starter
│   ├── sims/index.md           # MicroSims section starter
│   └── index.md                # Home page template
├── plugins/
│   ├── __init__.py
│   └── social_override.py      # Custom social media plugin
├── mkdocs.yml                  # Full configuration
└── setup.py                    # Plugin installation
```

## MkDocs Material Features Included

### Navigation Features
- Expandable sections, breadcrumbs, section indexes
- Back to top button, footer navigation
- Table of contents that follows scroll

### Content Features
- Code copy button with syntax highlighting
- Edit on GitHub button
- Mermaid diagram support

### Markdown Extensions
- Admonitions (note, warning, tip, etc.)
- Collapsible details blocks
- Content tabs
- Math support (LaTeX via MathJax)
- Task lists, emoji, and more

### Plugins
- Full-text search with suggestions
- Social media card generation
- Custom social card override per page

## Required Information

When running this skill, provide:

1. **site_name** - Textbook title
2. **site_description** - Brief description for SEO
3. **site_author** - Author name(s)
4. **site_url** - Deployment URL (e.g., https://username.github.io/repo/)
5. **repo_url** - GitHub repository URL
6. **primary_color_rgb** - Brand color (default: 218, 120, 87)
7. **google_analytics_id** - Optional analytics property

## Social Override Plugin

The included plugin allows custom social media images per page:

```markdown
---
title: My Page Title
image: img/my-custom-social-card.png
---
```

This overrides the auto-generated social card for that specific page.

## Post-Installation Steps

After the skill creates all files:

1. Run `pip install -e .` to install the social_override plugin
2. Add your logo to `docs/img/logo.png` (50x50px recommended)
3. Add your favicon to `docs/img/favicon.ico`
4. Run `mkdocs serve` to verify the installation

## Integration

This skill is typically the **first step** in the intelligent textbook creation
workflow. After setting up the MkDocs structure, proceed with:

1. Course Description Analyzer - Create/validate course description
2. Learning Graph Generator - Generate concept dependencies
3. Book Chapter Generator - Design chapter structure
4. Continue with content generation skills
