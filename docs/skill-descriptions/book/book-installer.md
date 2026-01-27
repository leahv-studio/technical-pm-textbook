# Book Installer

The book-installer skill is a meta-skill that handles installation and setup tasks for intelligent textbook projects. It consolidates multiple installation skills into a single entry point with on-demand loading of specific installation guides.

## Quick Feature List

Type `book-installer help` to see this list, then select by number or name:

| # | Feature | Description |
|---|---------|-------------|
| 1 | Site logo | Add custom logo to header |
| 2 | Favicon | Browser tab/bookmark icon |
| 3 | Cover image & social preview | Home page image + og:image metadata |
| 4 | Math equations | KaTeX (recommended) or MathJax |
| 5 | Code syntax highlighting | Language-aware code blocks |
| 6 | Code copy button | One-click copy for code blocks |
| 7 | Mermaid diagrams | Flowcharts, sequence diagrams from text |
| 8 | Content tabs | Tabbed sections for alternatives |
| 9 | Image zoom (GLightbox) | Click to enlarge images |
| 10 | Custom admonitions | Prompt boxes with copy button |
| 11 | Interactive quizzes | Self-assessment questions |
| 12 | Abbreviations & tooltips | Glossary hover definitions |
| 13 | Task lists | Checkbox lists |
| 14 | Simple feedback | Thumbs up/down per page |
| 15 | Detailed comments (Giscus) | GitHub Discussions integration |
| 16 | Tags & categorization | Page tagging system |
| 17 | Search enhancements | Suggestions and highlighting |
| 18 | Table of contents config | TOC sidebar options |
| 19 | Blog support | Add blog section |
| 20 | Announcement bar | Dismissible top banner |
| 21 | Privacy & cookie consent | GDPR compliance |
| 22 | Learning graph viewer | Interactive concept visualization |
| 23 | Skill usage tracker | Claude Code analytics hooks |

## Key Capabilities

This meta-skill routes to the appropriate installation guide based on your request:

| Request Type | Guide | Purpose |
|--------------|-------|---------|
| Feature by number or name | mkdocs-features | Install specific MkDocs feature |
| New textbook project | mkdocs-template | Create complete MkDocs Material project |
| Learning graph viewer | learning-graph-viewer | Add interactive graph visualization |
| Skill usage tracking | skill-tracker | Set up usage analytics with hooks |
| Cover image/home page | home-page-template | Configure social media optimization |

## When to Use This Skill

Use this skill when you need to:

- Add a specific feature to an existing MkDocs project (math, quizzes, feedback, etc.)
- Set up a new MkDocs Material project from scratch
- Create a new intelligent textbook
- Add an interactive learning graph viewer to an existing project
- Set up skill usage tracking with Claude Code hooks
- Create a cover image or configure home page social metadata

## Available Installation Guides

### 1. MkDocs Features (mkdocs-features.md)

Detailed configuration for all 23 MkDocs feature enhancements. Contains:

- Complete YAML snippets for mkdocs.yml
- JavaScript files to create
- CSS files to create
- Usage examples for each feature

**Trigger keywords:** Feature number (1-23), feature name, enrich, add feature, math, equations, quiz, feedback, logo, favicon, mermaid, admonition, code highlighting, image zoom, tabs, blog, tags

### 2. MkDocs Template Installation (mkdocs-template.md)

Creates a complete MkDocs Material intelligent textbook project structure:

- Conda virtual environment named 'mkdocs' with Python 3.11
- Full MkDocs Material project with all theme options
- Custom CSS for branding with configurable colors
- Social media card plugins including per-page override
- GitHub Pages deployment configuration

**Prerequisites:** Conda installed, Git installed, GitHub repository created

**Trigger keywords:** new project, mkdocs, textbook, bootstrap, setup, template, new book

[Detailed MkDocs template documentation](./install-mkdocs-template.md)

### 3. Learning Graph Viewer Installation (learning-graph-viewer.md)

Adds interactive learning graph exploration to an existing textbook:

- Interactive vis-network graph viewer
- Search, filtering, and statistics features
- Color-coded taxonomy categories with legend
- Integration with existing learning-graph.json

**Prerequisites:** Existing MkDocs project, learning-graph.json file present

**Trigger keywords:** graph viewer, learning graph, visualization, interactive graph, concept viewer

[Detailed learning graph viewer documentation](./install-learning-graph-viewer.md)

### 4. Skill Tracker Installation (skill-tracker.md)

Sets up Claude Code skill usage tracking:

- Hook scripts for tracking skill invocations
- Activity log directory structure
- Reporting scripts for usage analysis

**Prerequisites:** Claude Code installed, ~/.claude directory exists

**Trigger keywords:** track skills, skill usage, activity tracking, hooks, usage analytics

### 5. Home Page Template (home-page-template.md)

Creates professional home page with cover image and social media optimization:

- docs/index.md with proper frontmatter metadata
- AI image generation prompts for cover with montage background
- Open Graph and Twitter Card configuration
- Cover image design guidance (1.91:1 aspect ratio)

**Prerequisites:** Existing MkDocs project, access to AI image generator

**Trigger keywords:** cover image, home page, social media, og:image, montage, book cover, index page

## Important: Navigation Tabs

When working with existing projects, the book-installer will check for and remove navigation tabs from mkdocs.yml:

```yaml
# These lines will be removed if present:
theme:
  features:
    - navigation.tabs        # DELETE
    - navigation.tabs.sticky # DELETE
```

These books use **side navigation** optimized for wide landscape screens. Top navigation tabs waste vertical space and are not appropriate for this format.

## Typical Workflow

For a complete new project, use these installations in order:

1. **mkdocs-template** - Create the project structure
2. **home-page-template** - Create cover image and configure home page
3. **learning-graph-viewer** - Add graph visualization (after learning graph exists)
4. **skill-tracker** - Enable usage analytics (optional)

## How It Works

When you invoke `/book-installer` or ask for installation help, the skill:

1. Analyzes your request using keyword matching
2. Routes to the appropriate guide from its `references/` directory
3. Loads only the relevant installation guide (token-efficient)
4. Executes the step-by-step installation workflow

## Verification

After any installation, verify with:

```bash
# For MkDocs projects
mkdocs serve
# Visit http://127.0.0.1:8000/[project-name]/

# For skill tracker
cat ~/.claude/activity-logs/skill-usage.jsonl | tail -5
```

## Integration

This skill is typically the **first step** in the intelligent textbook creation workflow. After setting up the project infrastructure, proceed with:

1. **Course Description Analyzer** - Create/validate course description
2. **Learning Graph Generator** - Generate concept dependencies
3. **Book Chapter Generator** - Design chapter structure
4. **Chapter Content Generator** - Generate detailed content
