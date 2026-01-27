# Book Installer

The book-installer skill is a meta-skill that handles installation and setup tasks for intelligent textbook projects. It consolidates multiple installation skills into a single entry point with on-demand loading of specific installation guides.

## Key Capabilities

This meta-skill routes to the appropriate installation guide based on your request:

| Request Type | Guide | Purpose |
|--------------|-------|---------|
| New textbook project | mkdocs-template | Create complete MkDocs Material project |
| Learning graph viewer | learning-graph-viewer | Add interactive graph visualization |
| Skill usage tracking | skill-tracker | Set up usage analytics with hooks |
| Cover image/home page | home-page-template | Configure social media optimization |

## When to Use This Skill

Use this skill when you need to:

- Set up a new MkDocs Material project from scratch
- Create a new intelligent textbook
- Add an interactive learning graph viewer to an existing project
- Set up skill usage tracking with Claude Code hooks
- Create a cover image or configure home page social metadata

## Available Installation Guides

### 1. MkDocs Template Installation

Creates a complete MkDocs Material intelligent textbook project structure:

- Conda virtual environment named 'mkdocs' with Python 3.11
- Full MkDocs Material project with all theme options
- Custom CSS for branding with configurable colors
- Social media card plugins including per-page override
- GitHub Pages deployment configuration

**Prerequisites:** Conda installed, Git installed, GitHub repository created

**Trigger keywords:** new project, mkdocs, textbook, bootstrap, setup, template, new book

[Detailed MkDocs template documentation](./install-mkdocs-template.md)

### 2. Learning Graph Viewer Installation

Adds interactive learning graph exploration to an existing textbook:

- Interactive vis-network graph viewer
- Search, filtering, and statistics features
- Color-coded taxonomy categories with legend
- Integration with existing learning-graph.json

**Prerequisites:** Existing MkDocs project, learning-graph.json file present

**Trigger keywords:** graph viewer, learning graph, visualization, interactive graph, concept viewer

[Detailed learning graph viewer documentation](./install-learning-graph-viewer.md)

### 3. Skill Tracker Installation

Sets up Claude Code skill usage tracking:

- Hook scripts for tracking skill invocations
- Activity log directory structure
- Reporting scripts for usage analysis

**Prerequisites:** Claude Code installed, ~/.claude directory exists

**Trigger keywords:** track skills, skill usage, activity tracking, hooks, usage analytics

### 4. Home Page Template

Creates professional home page with cover image and social media optimization:

- docs/index.md with proper frontmatter metadata
- AI image generation prompts for cover with montage background
- Open Graph and Twitter Card configuration
- Cover image design guidance (1.91:1 aspect ratio)

**Prerequisites:** Existing MkDocs project, access to AI image generator

**Trigger keywords:** cover image, home page, social media, og:image, montage, book cover, index page

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
