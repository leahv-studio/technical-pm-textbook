---
title: Software Development Essentials
description: How software is built, from source code and programming languages through version control, code review, and collaboration workflows
generated_by: claude skill chapter-content-generator
date: 2026-02-11 05:48:14
version: 0.04
---

# Software Development Essentials

## Summary

This chapter introduces the fundamentals of how software is built, giving you the technical vocabulary to collaborate effectively with engineering teams. You'll learn about source code, programming languages, and the distinction between frontend and backend development, then explore version control with Git, code repositories, code reviews, and pull request workflows. This chapter bridges the gap between PM knowledge and hands-on software development understanding.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Software Development
2. Source Code
3. Programming Languages
4. Frontend Development
5. Backend Development
6. Full Stack Overview
7. Version Control
8. Git Basics
9. Code Repository
10. Code Review
11. Pull Request

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Product Management Foundations](../01-pm-foundations/index.md)

---

## What Is Software Development?

**Software development** is the systematic process of designing, writing, testing, and maintaining the instructions that tell computers what to do. As a technical PM, you won't be writing production code, but understanding how software gets built transforms your ability to set realistic timelines, evaluate technical proposals, and communicate with engineers on their terms. When an engineer says "this will take three sprints because we need to refactor the data access layer," you should understand what that means and why it matters.

Software development is not a single activity but a collection of interconnected disciplines. It encompasses writing code, designing system architecture, testing for correctness, managing dependencies, deploying to production, and monitoring performance. Each of these activities has its own tools, practices, and vocabulary that you'll encounter throughout this course.

The development process typically follows a cycle:

1. **Requirements gathering** - Translating user needs and business requirements into technical specifications
2. **Design** - Choosing the architecture, data structures, and patterns that will guide implementation
3. **Implementation** - Writing the actual source code
4. **Testing** - Verifying that the code works correctly and handles edge cases
5. **Deployment** - Releasing the software to users
6. **Maintenance** - Fixing bugs, improving performance, and adding features over time

## Source Code: The Foundation

**Source code** is the human-readable set of instructions written by developers that defines how a software application behaves. It is the raw material of software - text files containing logic, data structures, and algorithms that a compiler or interpreter translates into machine-executable instructions. When engineers talk about "the codebase," they're referring to the entire collection of source code files that make up a product.

Source code is organized into files and directories following conventions specific to the programming language and framework being used. A typical project might have hundreds or thousands of source code files, each responsible for a different aspect of the application. Understanding this structure helps you navigate technical conversations and review engineering proposals.

Here's what a simple piece of source code looks like in Python, a language commonly used for data analysis and backend services:

```python
def calculate_conversion_rate(conversions, total_visitors):
    """Calculate the conversion rate as a percentage."""
    if total_visitors == 0:
        return 0.0
    return (conversions / total_visitors) * 100

# Example usage
rate = calculate_conversion_rate(150, 2000)
print(f"Conversion rate: {rate}%")  # Output: Conversion rate: 7.5%
```

You don't need to write code like this, but being able to read it and understand its intent is a valuable technical PM skill. This function takes two numbers, checks for a division-by-zero edge case, and returns a percentage. Even without programming experience, you can follow the logic.

## Programming Languages

**Programming languages** are formal systems of notation used to write source code. Just as human languages have different grammars and vocabularies suited to different contexts, programming languages have different strengths suited to different technical problems. As a technical PM, understanding the landscape of programming languages helps you evaluate technology decisions, understand hiring constraints, and appreciate why certain features take longer to build in some tech stacks than others.

Programming languages fall into several broad categories based on where and how they're used:

| Category | Common Languages | Typical Use | PM Relevance |
|----------|-----------------|-------------|--------------|
| Frontend (browser) | JavaScript, TypeScript | User interfaces, interactivity | Affects UI/UX possibilities and performance |
| Backend (server) | Python, Java, Go, Node.js, Ruby | Business logic, data processing, APIs | Affects scalability, hiring pool, development speed |
| Mobile | Swift (iOS), Kotlin (Android), React Native, Flutter | Mobile applications | Affects platform coverage and development cost |
| Data & Analytics | Python, R, SQL | Data analysis, machine learning, reporting | Affects analytics capabilities |
| Infrastructure | Bash, Terraform, YAML | Server configuration, deployment | Affects deployment speed and reliability |

No single language is "best" - each involves trade-offs. Python is excellent for rapid development and data analysis but slower for high-performance computing. Java is battle-tested for enterprise systems but verbose. Go excels at concurrent server applications but has a smaller ecosystem. When your engineering team proposes a technology choice, understanding these trade-offs helps you ask the right questions.

!!! tip "What Technical PMs Need to Know About Languages"
    You don't need to be fluent in any programming language. You need to understand why your team chose their tech stack, what trade-offs that choice implies, and how it affects hiring, velocity, and future flexibility. Ask your engineers: "Why did we choose this language, and what would we lose if we switched?"

## Frontend and Backend Development

### Frontend Development

**Frontend development** (also called client-side development) focuses on everything users see and interact with directly in their browser or mobile app. The frontend is responsible for layout, visual design, animations, form validation, and responsiveness across different screen sizes. When a user clicks a button, types in a search box, or scrolls through a feed, they're interacting with frontend code.

Frontend development relies on three core technologies in web browsers:

- **HTML** (HyperText Markup Language) - Defines the structure and content of a page
- **CSS** (Cascading Style Sheets) - Controls visual appearance, layout, and responsive design
- **JavaScript** - Adds interactivity, dynamic content, and communication with backend services

Modern frontend development uses frameworks like React, Angular, or Vue.js that provide structured patterns for building complex user interfaces. These frameworks manage the challenge of keeping the visual interface synchronized with underlying data as users interact with the application.

### Backend Development

**Backend development** (also called server-side development) handles everything that happens behind the scenes - processing requests, managing data, enforcing business rules, authenticating users, and communicating with external services. When a user submits a form, the frontend sends that data to the backend, which validates it, stores it in a database, triggers any necessary workflows, and returns a response.

Backend systems are responsible for:

- **API endpoints** - Entry points where frontend and external systems send requests
- **Business logic** - Rules governing how data is processed and decisions are made
- **Data persistence** - Reading from and writing to databases
- **Authentication and authorization** - Verifying user identity and permissions
- **Integration** - Communicating with third-party services, payment processors, email providers

### The Full Stack

A **full stack overview** encompasses both frontend and backend together with the infrastructure that connects them. "Full stack" development means working across all layers of the application. While most engineers specialize in either frontend or backend, understanding the full stack helps you appreciate how changes in one layer ripple through others.

#### Diagram: Full Stack Architecture Layers
<iframe src="../../sims/full-stack-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Full Stack Architecture Layers</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, classify
Learning Objective: Students will be able to explain the role of each layer in a full stack web application and classify technical decisions into the correct architectural layer.

Purpose: Illustrate the layered architecture of a modern web application, showing how user actions flow from the browser through frontend, backend, and database layers

Layout: Vertical stack diagram with four horizontal layers, connected by bidirectional arrows

Layers (top to bottom):
1. User/Browser Layer (light blue):
   Label: "What the user sees"
   Components: Browser window, mobile app
   Technologies: HTML, CSS, JavaScript
   Example interaction: "User clicks 'Add to Cart'"

2. Frontend Layer (blue):
   Label: "Client-side application"
   Components: React/Vue/Angular app, state management, routing
   Technologies: TypeScript, React, CSS frameworks
   Example: "Frontend validates input, updates UI optimistically, sends API request"

3. Backend Layer (green):
   Label: "Server-side processing"
   Components: API server, business logic, authentication, job queues
   Technologies: Python/Node.js/Java, REST API, middleware
   Example: "Backend validates request, checks inventory, processes payment, returns confirmation"

4. Database Layer (orange):
   Label: "Data persistence"
   Components: Relational DB, cache, file storage
   Technologies: PostgreSQL, Redis, S3
   Example: "Database records order, updates inventory count, stores receipt"

Connections: Bidirectional arrows between each adjacent layer with labels:
- Browser → Frontend: "User interactions (clicks, input)"
- Frontend → Backend: "HTTP requests (GET, POST, PUT, DELETE)"
- Backend → Database: "SQL queries, cache reads/writes"
- Return arrows labeled with responses: "HTML/JSON responses", "API responses", "Query results"

Interactive elements:
- Hover over each layer to see expanded description with technology examples
- Hover over arrows to see example data flowing in each direction
- Click a layer to highlight what a PM typically discusses with engineers at that level

Color scheme: Light blue to blue to green to orange (user-facing to infrastructure)
Implementation: HTML/CSS/JavaScript with responsive stacked layout
</details>

## Version Control and Git

### Why Version Control Matters

**Version control** is a system that records changes to files over time so you can recall specific versions later, collaborate with others without overwriting each other's work, and maintain a complete history of every change ever made to the codebase. Without version control, software development would be chaotic - imagine 20 engineers editing the same files simultaneously with no way to track or merge their changes.

Version control solves several critical problems:

- **Collaboration** - Multiple developers can work on the same codebase simultaneously
- **History** - Every change is recorded with who made it, when, and why
- **Reversibility** - Any change can be undone by reverting to a previous version
- **Branching** - Developers can work on experimental features without affecting the stable codebase
- **Accountability** - Changes are attributed to specific individuals, enabling code review

### Git Basics

**Git** is the dominant version control system used in modern software development, created by Linus Torvalds (who also created Linux) in 2005. Git is a distributed version control system, meaning every developer has a complete copy of the entire project history on their local machine. This design makes Git fast, resilient, and capable of supporting offline work.

The core concepts you'll encounter in Git conversations:

| Git Concept | What It Means | PM Relevance |
|-------------|---------------|--------------|
| **Repository (repo)** | A project's complete codebase and history | "Which repo is this feature in?" |
| **Commit** | A snapshot of changes with a descriptive message | "How many commits are in this release?" |
| **Branch** | A parallel line of development | "Is this on a feature branch or main?" |
| **Main/Master** | The primary branch representing production-ready code | "When does this merge to main?" |
| **Merge** | Combining changes from one branch into another | "Any merge conflicts we should know about?" |
| **Conflict** | When two changes affect the same code and can't auto-merge | "How long will resolving conflicts take?" |
| **Tag** | A named marker on a specific commit, often used for releases | "What version tag is in production?" |

### Code Repositories

A **code repository** (or "repo") is the storage location for a project's source code, complete version history, and associated configuration files. In practice, teams host repositories on platforms like GitHub, GitLab, or Bitbucket, which add collaboration features on top of Git's version control capabilities.

Repositories are more than just code storage. They serve as the central hub for engineering collaboration, containing:

- **Source code** organized in directories by feature or module
- **README files** explaining what the project does and how to set it up
- **Configuration files** for build tools, testing frameworks, and deployment pipelines
- **Issue trackers** for bugs, feature requests, and technical debt items
- **Documentation** for APIs, architecture decisions, and onboarding guides

As a technical PM, you'll regularly interact with your team's repositories - reading pull requests, tracking issues, reviewing release notes, and occasionally inspecting code to understand how a feature works.

#### Diagram: Git Branching and Merge Workflow
<iframe src="../../sims/git-branching-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Git Branching and Merge Workflow</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, interpret
Learning Objective: Students will be able to explain how Git branches enable parallel development and interpret a branching diagram to understand the state of a codebase.

Purpose: Visualize how Git branches allow parallel development with eventual merging back to the main branch

Layout: Horizontal timeline-style diagram showing parallel branch lines

Elements:
- Main branch (dark blue solid line): Horizontal line across the top representing the stable production code, with commit dots at regular intervals
- Feature Branch A (green line): Branches off main at commit 3, has 4 commits, merges back at commit 8 with a merge commit
- Feature Branch B (orange line): Branches off main at commit 5, has 3 commits, merges back at commit 10
- Hotfix Branch (red line): Branches off main at commit 7, has 1 commit, merges back quickly at commit 9
- Release tags: Diamond markers on main branch at commits 6 ("v2.1") and 11 ("v2.2")

Commit dots: Small circles on each branch line, numbered sequentially on main
Branch points: Circles where branches diverge from main
Merge points: Circles where branches rejoin main (show merge commit)

Labels:
- "main" label on the primary branch
- "feature/user-auth" on Branch A
- "feature/search-api" on Branch B
- "hotfix/login-bug" on the hotfix branch
- Timestamps or sprint labels below main branch

Interactive elements:
- Hover over any commit dot to see commit message and author
- Hover over branch lines to see branch name and description
- Hover over merge points to see "Merge commit: combined changes from [branch] into main"
- Click a release tag to see what features were included in that release

Color scheme: Dark blue (main), green (feature A), orange (feature B), red (hotfix)
Implementation: HTML/CSS/JavaScript with SVG timeline, responsive horizontal layout
</details>

## Code Review and Pull Requests

### Code Review

**Code review** is the practice of having other developers examine source code changes before they're merged into the main codebase. It serves as a quality gate that catches bugs, enforces coding standards, shares knowledge across the team, and ensures changes align with architectural decisions. Most engineering teams require at least one approving review before code can be merged.

Code reviews benefit the team in multiple ways:

- **Bug detection** - Fresh eyes catch issues the original author missed
- **Knowledge sharing** - Reviewers learn about parts of the codebase they didn't write
- **Consistency** - Reviews enforce coding standards and architectural patterns
- **Mentorship** - Senior engineers guide junior developers through review feedback
- **Documentation** - Review comments create a record of why decisions were made

For technical PMs, understanding code review culture matters because it directly affects development velocity. Teams with healthy review practices ship more reliable code but may take longer per feature. Teams that skip reviews move faster initially but accumulate bugs and inconsistencies. When planning timelines, factor in review time - a feature isn't "done" when the code is written; it's done when it's reviewed, approved, and merged.

### Pull Requests

A **pull request** (PR) - called a "merge request" in some platforms - is a formal proposal to merge code changes from one branch into another, typically from a feature branch into the main branch. Pull requests are the primary mechanism through which code review happens in modern development workflows.

A well-structured pull request includes:

| PR Component | Purpose | Example |
|-------------|---------|---------|
| **Title** | Concise description of the change | "Add search filtering to product catalog" |
| **Description** | Context, motivation, and approach | "Users reported difficulty finding products. This adds category and price filters using the existing search API." |
| **Linked issues** | Traceability to requirements | "Closes #342, relates to #298" |
| **Code changes** | The actual diff showing what changed | Modified 5 files, +180 lines, -22 lines |
| **Tests** | Proof that the change works correctly | "Added 12 unit tests, all passing" |
| **Screenshots** | Visual evidence for UI changes | Before/after screenshots of the filter panel |
| **Reviewer assignment** | Who should evaluate this change | Backend team lead + frontend specialist |

#### Diagram: Pull Request Lifecycle
<iframe src="../../sims/pull-request-lifecycle/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Pull Request Lifecycle</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: use, demonstrate
Learning Objective: Students will be able to use their understanding of the PR workflow to demonstrate how a feature moves from development to production, including review cycles and CI checks.

Purpose: Show the complete lifecycle of a pull request from creation to merge

Visual style: Horizontal workflow with decision points and feedback loops

Steps (left to right):
1. Start: "Developer creates branch" (blue circle)
   Hover: "Developer creates a feature branch from main and begins coding"

2. Process: "Write code and tests" (blue rectangle)
   Hover: "Developer implements the feature, writes unit tests, and verifies locally"

3. Process: "Open Pull Request" (blue rectangle)
   Hover: "Developer pushes branch and creates a PR with title, description, and reviewer assignments"

4. Process: "Automated CI checks run" (gray rectangle)
   Hover: "Continuous integration runs linting, tests, build verification, and security scans automatically"

5. Decision: "CI passes?" (yellow diamond)
   Hover: "All automated checks must pass before human review begins"
   - No → Loop back to "Write code and tests" with label "Fix failing checks"
   - Yes → Continue

6. Process: "Peer code review" (green rectangle)
   Hover: "Assigned reviewers examine code changes, leave comments, and request modifications"

7. Decision: "Approved?" (yellow diamond)
   Hover: "Reviewer either approves, requests changes, or comments"
   - Changes requested → Loop back to "Write code and tests" with label "Address feedback"
   - Approved → Continue

8. Process: "Merge to main" (green rectangle)
   Hover: "PR is merged, feature branch is deleted, changes become part of the main codebase"

9. End: "Deploy to production" (green circle)
   Hover: "Merged code is deployed through the CI/CD pipeline to production"

Feedback loops shown as curved arrows going backward with labels explaining what triggers the loop.

Color scheme: Blue (development), gray (automation), yellow (decisions), green (approval/completion)
Implementation: HTML/CSS/JavaScript with SVG workflow diagram, responsive design
</details>

## How Technical PMs Engage with Development

Understanding software development fundamentals changes how you operate as a PM in several practical ways. You can read pull request descriptions to understand what's shipping. You can browse the repository to see how features are structured. You can look at commit history to understand development velocity. You can participate in architecture discussions with informed questions rather than silence.

Here are concrete ways technical PMs apply these concepts daily:

- **Sprint planning** - You understand when an engineer says "we need to refactor this module first" because you know what source code organization looks like
- **Timeline estimation** - You account for code review cycles, merge conflicts, and testing when setting expectations with stakeholders
- **Bug triage** - You can read a stack trace well enough to identify which service is failing and route the issue to the right team
- **Technical debt conversations** - You can evaluate whether a proposed refactoring is necessary by understanding the codebase's current state
- **Vendor evaluation** - You can assess a third-party tool's API documentation and SDK quality because you understand the developer experience

??? question "Self-Check: Can you answer these questions?"
    1. What is the difference between frontend and backend development, and why does this distinction matter for product decisions?
    2. Why is version control essential for team-based software development? What problems does it solve?
    3. Describe the pull request workflow from branch creation to merge. What role does code review play?
    4. If an engineer tells you "we have a merge conflict on the authentication module," what does that mean and what's the likely impact on the timeline?
    5. Name three programming language categories and explain how a PM's awareness of them affects product planning.

## Key Takeaways

- **Software development** is a systematic process encompassing design, coding, testing, deployment, and maintenance - understanding this cycle helps PMs set realistic expectations
- **Source code** is human-readable text organized in files and directories; being able to read code at a high level builds credibility with engineering teams
- **Programming languages** have different strengths and trade-offs - the tech stack choice affects hiring, velocity, scalability, and future flexibility
- **Frontend development** handles what users see and interact with, while **backend development** manages data processing, business logic, and integrations
- A **full stack** perspective helps PMs understand how changes in one layer affect others
- **Version control** with **Git** enables collaboration, tracks history, and provides reversibility - it's the foundation of modern engineering workflows
- **Code repositories** on platforms like GitHub serve as the central hub for source code, documentation, issues, and collaboration
- **Code review** is a quality practice that catches bugs, shares knowledge, and enforces standards - it directly affects development timelines
- **Pull requests** are the formal mechanism for proposing, reviewing, and merging code changes - understanding the PR lifecycle helps PMs track feature progress accurately

[See Annotated References](./references.md)
