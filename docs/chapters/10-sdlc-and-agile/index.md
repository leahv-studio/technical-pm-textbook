---
title: SDLC and Agile Methodologies
description: Understanding the software development lifecycle, Agile frameworks, Scrum ceremonies, backlog management, CI/CD, and iterative product development
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# SDLC and Agile Methodologies

## Summary

This chapter covers the software development lifecycle and the Agile methodologies that shape how modern product teams work. You\'ll learn about Waterfall vs Agile approaches, dive deep into the Scrum framework with its ceremonies (sprint planning, standups, reviews, retrospectives), and master product backlog management with user stories and story points. The chapter also covers Kanban, CI/CD pipelines, release management, feature flags, and the concept of minimum viable product and iterative development.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Software Dev Lifecycle
2. Waterfall Methodology
3. Agile Development
4. Scrum Framework
5. Sprint Planning
6. Daily Standups
7. Sprint Review
8. Sprint Retrospective
9. Product Backlog
10. User Stories
11. Acceptance Criteria
12. Story Points
13. Velocity Tracking
14. Kanban Method
15. Continuous Integration
16. Continuous Delivery
17. Release Management
18. Feature Flags
19. Minimum Viable Product
20. Iterative Development

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Product Management Foundations](../01-pm-foundations/index.md)
- [Chapter 2: Software Development Essentials](../02-software-development-essentials/index.md)
- [Chapter 3: Technical Documentation and Requirements](../03-technical-documentation/index.md)
- [Chapter 9: Quality Assurance and Technical Debt](../09-quality-assurance-technical-debt/index.md)

---

## The Software Development Lifecycle

The **software development lifecycle (SDLC)** is the structured process that teams follow to plan, design, build, test, deploy, and maintain software products. Every software product - from a mobile app to an enterprise platform - follows some form of the SDLC, whether the team acknowledges it formally or not. As a technical PM, understanding the SDLC helps you anticipate what comes next, identify bottlenecks, and communicate realistic timelines to stakeholders.

The SDLC typically includes the following phases, though different methodologies organize and sequence them differently:

1. **Requirements gathering** - Defining what the software should do and for whom
2. **Design** - Planning the architecture, data models, and user interfaces
3. **Implementation** - Writing the actual code
4. **Testing** - Verifying that the software works correctly (covered in Chapter 9)
5. **Deployment** - Releasing the software to users
6. **Maintenance** - Fixing bugs, addressing technical debt, and evolving the product

The critical insight is that these phases are not one-and-done. In modern software development, teams cycle through these phases continuously - sometimes completing the full cycle in a matter of days. The methodology a team uses determines how quickly they complete each cycle, how much they plan upfront versus discover along the way, and how they handle changes to requirements.

!!! note "Why PMs Must Understand the SDLC"
    You cannot effectively plan a roadmap, estimate timelines, or manage stakeholder expectations if you do not understand how software is actually built. The SDLC is the foundation - everything else in this chapter (Agile, Scrum, CI/CD) represents different philosophies about how to move through the lifecycle efficiently.

## Waterfall: The Traditional Approach

The **Waterfall methodology** is a sequential software development approach where each SDLC phase must be completed fully before the next phase begins. Requirements are gathered exhaustively upfront, a comprehensive design is created, development proceeds according to the design, and testing occurs after all development is complete. The name "waterfall" reflects how work flows downward from one phase to the next, like water cascading over a series of ledges.

Waterfall was the dominant methodology from the 1970s through the early 2000s and remains appropriate for certain types of projects. It works well when requirements are well understood and unlikely to change, when regulatory compliance demands extensive upfront documentation, and when the cost of making changes increases dramatically after deployment (embedded systems, hardware-software interfaces, safety-critical applications).

However, Waterfall has significant limitations for modern software products:

| Waterfall Characteristic | Impact on Product Development |
|-------------------------|-------------------------------|
| Requirements locked early | Cannot incorporate user feedback until after launch |
| Testing at the end | Bugs discovered late are expensive to fix |
| Big-bang delivery | Users wait months or years for value |
| Change-resistant | Scope changes require costly rework of earlier phases |
| Heavy documentation | Time spent documenting may exceed time spent building |

The fundamental problem with Waterfall for most software products is that you cannot fully specify requirements for something users have never seen. Users don\'t know what they want until they can interact with something real. This realization drove the development of Agile approaches.

## Agile Development

**Agile development** is an iterative approach to software development that emphasizes delivering small, working increments of software frequently, responding to change over following a rigid plan, and collaborating closely between business stakeholders and development teams. The term was formalized in 2001 with the publication of the Agile Manifesto, which articulated four core values.

The Agile Manifesto values:

- **Individuals and interactions** over processes and tools
- **Working software** over comprehensive documentation
- **Customer collaboration** over contract negotiation
- **Responding to change** over following a plan

These values do not mean that processes, documentation, contracts, and plans have no value. They mean that when there is a conflict, the items on the left take priority. This nuance is frequently misunderstood - "we\'re Agile" should never be an excuse for having no plan or no documentation. It means that plans and documentation serve the team rather than constraining it.

Agile is not a single methodology but a family of approaches that share these values. The two most widely adopted Agile frameworks are Scrum and Kanban, each suited to different team contexts and product types.

#### Diagram: Waterfall vs. Agile Comparison
<iframe src="../../sims/waterfall-vs-agile/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Waterfall vs. Agile Comparison</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: compare, differentiate
Learning Objective: Students will be able to compare Waterfall and Agile approaches across multiple dimensions and differentiate when each is most appropriate.

Layout: Side-by-side comparison with Waterfall on the left and Agile on the right, connected by dimension labels in the center.

Left side - Waterfall (blue, linear flow):

- Visual: Vertical cascade of phase blocks (Requirements then Design then Build then Test then Deploy)
- Delivery timeline: Single release after months of work
- Feedback loop: Feedback only after full delivery
- Risk profile: High risk concentrated at end

Right side - Agile (green, circular/iterative flow):

- Visual: Circular sprint diagram with continuous iterations
- Delivery timeline: Incremental releases every 1-4 weeks
- Feedback loop: Continuous feedback each iteration
- Risk profile: Risk spread across many small increments

Center comparison dimensions:

1. Planning approach: Comprehensive upfront vs. Just enough, just in time
2. Requirements: Fixed at start vs. Evolving through discovery
3. Testing: End-phase gate vs. Continuous throughout
4. Customer involvement: Bookends (start and end) vs. Every iteration
5. Change handling: Formal change control vs. Welcomed and prioritized
6. Documentation: Extensive, formal vs. Sufficient, living documents

Interactive elements:

- Hover over each dimension to see detailed explanation with real-world examples
- Click a dimension to see case studies where each approach excels
- Toggle "Best for" overlay showing project types suited to each approach

Color scheme: Blue (Waterfall) vs. green (Agile) with neutral gray center
Implementation: HTML/CSS/JavaScript with responsive side-by-side layout
</details>

## The Scrum Framework

The **Scrum framework** is the most widely adopted Agile methodology, providing a structured yet flexible approach to iterative software development. Scrum organizes work into fixed-length iterations called sprints (typically 1-2 weeks) and defines specific roles, artifacts, and ceremonies that keep the team aligned and productive. Approximately 87% of Agile teams use some form of Scrum, making it essential knowledge for any technical PM.

Scrum defines three core roles:

- **Product Owner** - Represents the voice of the customer, owns the product backlog, and makes prioritization decisions. As a technical PM, this is typically your role.
- **Scrum Master** - Facilitates Scrum ceremonies, removes impediments, and coaches the team on Agile practices. This is not a management role - it is a servant-leadership role.
- **Development Team** - The cross-functional group of engineers, designers, and QA professionals who build the product. Scrum teams are typically 5-9 people.

### Sprint Planning

**Sprint planning** is the ceremony that kicks off each sprint, where the team collectively decides what work they will commit to completing during the upcoming sprint. This is one of the most important meetings you will attend as a technical PM because it is where strategy meets execution. The product owner presents the highest-priority items from the backlog, and the team discusses feasibility, breaks items into tasks, and commits to a sprint goal.

A well-run sprint planning session answers three questions:

1. **What can we deliver this sprint?** - The product owner presents prioritized backlog items; the team assesses capacity
2. **How will we do the work?** - The team breaks items into technical tasks and identifies dependencies
3. **What is our sprint goal?** - A single overarching objective that unifies the sprint\'s work into a coherent theme

!!! tip "Sprint Planning Best Practices for PMs"
    Come to sprint planning with a clear priority stack, but be prepared to adjust. If the team says a high-priority item has a hidden dependency that doubles the effort, you need to decide on the spot whether to proceed or substitute a different item. The best PMs prepare 30-40% more work than the team can typically complete, giving flexibility to swap items without scrambling.

### Daily Standups

**Daily standups** (also called daily scrums) are brief, time-boxed meetings - typically 15 minutes - where each team member answers three questions: What did I complete yesterday? What will I work on today? Are there any blockers preventing my progress? The standup is not a status report to management. It is a synchronization mechanism that helps team members coordinate their work and surface impediments quickly.

As a PM, your role in standups is to listen for signals, not to manage tasks. Listen for patterns:

- Are the same items "in progress" for multiple days? (May indicate hidden complexity or scope creep)
- Are blockers being raised but not resolved? (May require your intervention with other teams)
- Is the team pulling in work not in the sprint? (May indicate poor sprint planning or shifting priorities)

### Sprint Review

The **sprint review** is a ceremony held at the end of each sprint where the team demonstrates what they have built to stakeholders, customers, and other interested parties. The sprint review serves multiple purposes: it creates a regular cadence of accountability, provides an opportunity for stakeholder feedback, and celebrates the team\'s progress.

For a PM, the sprint review is one of your most valuable tools for stakeholder management. Rather than writing status reports or scheduling one-off demos, you have a recurring forum where stakeholders can see working software and provide input. The key word is "working" - sprint reviews should demonstrate functional software, not slide decks or mockups.

### Sprint Retrospective

The **sprint retrospective** is a ceremony where the team reflects on the sprint that just ended and identifies specific improvements for the next sprint. The retrospective is the engine of continuous improvement in Scrum. It typically addresses three questions: What went well? What didn\'t go well? What will we change?

The retrospective is arguably the most important Scrum ceremony because it is the mechanism through which teams learn and improve. Teams that skip retrospectives or treat them as rote exercises miss the self-correcting feedback loop that makes Agile work.

| Scrum Ceremony | Duration | Participants | PM\'s Primary Role |
|---------------|----------|-------------|-------------------|
| Sprint Planning | 2-4 hours | Product Owner, Scrum Master, Dev Team | Present priorities, answer questions, negotiate scope |
| Daily Standup | 15 minutes | Scrum Master, Dev Team (PM optional) | Listen for blockers, avoid micromanaging |
| Sprint Review | 1-2 hours | Team + Stakeholders | Facilitate demo, collect stakeholder feedback |
| Sprint Retrospective | 1-1.5 hours | Scrum Master, Dev Team, Product Owner | Participate honestly, commit to improvements |

## Managing the Product Backlog

### Product Backlog

The **product backlog** is the ordered list of everything that might be needed in the product, serving as the single source of requirements for any changes to be made. As the product owner, you are responsible for the backlog\'s content, prioritization, and clarity. The backlog is a living document - items are constantly being added, refined, reprioritized, and removed.

A healthy product backlog has a specific shape: items near the top are small, well-defined, and ready for development. Items in the middle are moderately defined and need refinement before they enter a sprint. Items near the bottom are large, vague, and represent future possibilities that may never be built. This gradient from refined to rough is intentional - there is no value in spending time detailing features that may never be prioritized.

### User Stories

**User stories** are short, structured descriptions of a feature or capability from the perspective of the user who will benefit from it. They follow the format: "As a [type of user], I want [some goal] so that [some reason]." User stories are deliberately brief because their purpose is not to serve as complete specifications - they are placeholders for conversations between the product owner, developers, and designers.

Examples of well-written user stories:

- "As a new user, I want to sign up with my Google account so that I don\'t have to create another password."
- "As a team administrator, I want to set role-based permissions so that I can control who can edit sensitive data."
- "As a mobile user, I want to receive push notifications for order status changes so that I can track my delivery without opening the app."

### Acceptance Criteria

**Acceptance criteria** are the specific conditions that a user story must satisfy to be considered complete and accepted by the product owner. They transform the deliberately vague user story into testable, unambiguous requirements. Acceptance criteria define the boundary between "done" and "not done," preventing scope creep within individual stories and giving engineers clear targets.

Acceptance criteria are typically written using the Given-When-Then format:

- **Given** [some precondition], **When** [some action], **Then** [expected result]

Example for the Google signup story:

- Given I am on the signup page, when I click "Sign up with Google," then I am redirected to Google\'s OAuth consent screen
- Given I have authorized the application on Google, when I am redirected back, then my account is created with my Google email and display name
- Given I already have an account with my Google email, when I try to sign up with Google, then I am informed that an account exists and prompted to log in instead

### Story Points and Velocity

**Story points** are a unit of measure for expressing the overall effort required to implement a user story, combining complexity, uncertainty, and volume of work into a single relative estimate. Story points are deliberately abstract - they are not hours or days. A story estimated at 5 points is roughly 2.5 times the effort of a 2-point story, but neither maps to a specific number of hours.

Most teams use a modified Fibonacci sequence (1, 2, 3, 5, 8, 13) for story points. The increasing gaps between numbers reflect the increasing uncertainty of larger items. If a story is estimated at 13 points, it is likely too large and should be broken down into smaller stories before entering a sprint.

**Velocity tracking** is the practice of measuring how many story points a team completes per sprint over time. Velocity is the primary metric used to forecast how much work a team can commit to in future sprints. It is calculated by summing the story points of all completed stories at the end of each sprint and tracking the trend over multiple sprints.

!!! warning "Velocity Anti-Patterns"
    Never compare velocity between teams - story points are relative to each team\'s calibration. Never use velocity as a performance metric or set velocity targets - this incentivizes point inflation rather than productivity. Velocity is a planning tool, not a performance measure. If you tell a team "increase your velocity by 20%," they will simply start estimating stories higher.

## The Kanban Method

The **Kanban method** is an Agile approach that emphasizes continuous flow rather than fixed-length sprints. Derived from Toyota\'s manufacturing system, Kanban visualizes work on a board with columns representing workflow stages (e.g., Backlog, In Progress, In Review, Done) and limits the number of items that can be in any stage simultaneously. These limits - called work-in-progress (WIP) limits - are Kanban\'s defining feature.

While Scrum prescribes roles, ceremonies, and sprint boundaries, Kanban is more lightweight and flexible. It does not require sprints, specific roles, or formal planning ceremonies. Work flows continuously from left to right across the board, and new items are pulled into the first column whenever capacity opens up.

| Dimension | Scrum | Kanban |
|-----------|-------|--------|
| Work cadence | Fixed sprints (1-4 weeks) | Continuous flow |
| Planning | Sprint planning at start of each sprint | Just-in-time, as capacity opens |
| Roles | Product Owner, Scrum Master, Dev Team | No prescribed roles |
| Change policy | Changes wait for next sprint | Changes can enter anytime if capacity allows |
| Key metric | Velocity (points per sprint) | Cycle time (time from start to done) |
| Best for | Feature development with predictable cadence | Support teams, maintenance, unpredictable work |

#### Diagram: Scrum Sprint Cycle vs. Kanban Flow
<iframe src="../../sims/scrum-vs-kanban/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Scrum Sprint Cycle vs. Kanban Flow</summary>
Type: diagram

Bloom Level: Analyze (L4)
Bloom Verb: compare, organize
Learning Objective: Students will be able to compare the workflow mechanics of Scrum and Kanban and organize their understanding of when each approach is most effective.

Layout: Two-panel display showing both methodologies operating simultaneously.

Top panel - Scrum Sprint Cycle:

- Visual: Circular sprint loop with four ceremony nodes (Planning then Daily Standups then Review then Retrospective)
- Sprint backlog shown as a card stack entering the loop
- Completed increment exiting the loop
- Sprint boundary clearly marked (2-week box)
- Burndown chart showing progress within sprint

Bottom panel - Kanban Board:

- Visual: Column-based board with cards flowing left to right
- Columns: Backlog | Ready | In Progress (WIP: 3) | Review (WIP: 2) | Done
- Cards of different sizes representing different work items
- WIP limits displayed prominently at top of each column
- Cumulative flow diagram showing throughput over time

Comparison callouts between panels:

- "Fixed iterations" vs. "Continuous flow"
- "Batch commitment" vs. "Pull-based"
- "Velocity metric" vs. "Cycle time metric"

Interactive elements:

- Animated cards moving through each system to demonstrate flow
- Click to pause/resume animation
- Hover over ceremony nodes or board columns for detailed explanations
- Toggle to show what happens when a blocker occurs in each system

Color scheme: Blue for Scrum, green for Kanban, neutral gray for shared elements
Implementation: HTML/CSS/JavaScript with animated card-based visualization
</details>

## Continuous Integration and Continuous Delivery

### Continuous Integration

**Continuous integration (CI)** is a development practice where developers merge their code changes into a shared repository frequently - ideally multiple times per day - and each merge triggers an automated build and test sequence that verifies the changes. CI catches integration problems early, when they are small and easy to fix, rather than allowing them to accumulate into painful merge conflicts.

Before CI became standard practice, development teams would work in isolation for weeks or months before attempting to integrate their code. These "integration phases" were notorious for producing unexpected conflicts, subtle bugs, and schedule delays. CI eliminates this pain by making integration a continuous, automated activity rather than a discrete phase.

The core CI workflow is:

1. Developer completes a small unit of work and commits code to the shared repository
2. The CI server automatically detects the change and triggers a build
3. Automated tests (unit, integration, and potentially more) run against the new code
4. Results are reported to the team - pass or fail
5. If tests fail, the team fixes the issue immediately before proceeding

### Continuous Delivery

**Continuous delivery (CD)** extends continuous integration by ensuring that code changes are automatically prepared for release to production after passing all automated tests and quality gates. With continuous delivery, the software is always in a deployable state - the decision to release is a business decision, not a technical one. A team practicing CD can deploy to production at any time with the push of a button (or automatically, which is called continuous deployment).

The distinction between continuous delivery and continuous deployment is important:

- **Continuous Delivery** - Every change that passes automated tests *could* be deployed to production; a human makes the final decision
- **Continuous Deployment** - Every change that passes automated tests *is* automatically deployed to production; no human gate

!!! info "Why CI/CD Matters for PMs"
    CI/CD directly affects your ability to deliver value to users. A team with a mature CI/CD pipeline can ship a bug fix in hours, run experiments quickly, and respond to competitive threats with rapid feature releases. A team without CI/CD might take weeks to deploy a single change. When evaluating engineering maturity, ask: "How long does it take from code commit to production?" The answer tells you a lot about the team\'s delivery capability.

## Release Management and Feature Flags

### Release Management

**Release management** is the process of planning, scheduling, coordinating, and controlling the deployment of software releases into production environments. It encompasses everything from deciding what goes into a release, to coordinating deployment timing, to managing rollback plans if something goes wrong. For technical PMs, release management is where product strategy meets engineering execution.

Modern release management has evolved significantly from the days of quarterly or annual releases. Today\'s high-performing teams may deploy dozens of times per day, and release management focuses on risk mitigation rather than coordination of large batches.

Key release management practices include:

- **Release planning** - Deciding which features and fixes are included in each release
- **Release notes** - Communicating changes to users, internal teams, and partners
- **Deployment orchestration** - Coordinating the technical steps of deploying to production
- **Rollback planning** - Having a tested plan to revert if a release causes problems
- **Post-release monitoring** - Watching metrics, error rates, and user feedback after deployment

### Feature Flags

**Feature flags** (also called feature toggles) are a technique that allows teams to deploy code with new features turned off by default, then selectively enable features for specific users or user groups without requiring a new deployment. Feature flags decouple deployment (shipping code to production) from release (exposing functionality to users), giving PMs unprecedented control over the user experience.

Feature flags enable several powerful product management capabilities:

- **Gradual rollouts** - Enable a feature for 5% of users, monitor metrics, then increase to 25%, 50%, and finally 100%
- **Beta testing** - Enable features for a specific set of beta users while keeping them hidden from everyone else
- **A/B testing** - Show different versions of a feature to different user segments and measure which performs better
- **Kill switches** - Instantly disable a problematic feature without deploying new code
- **Entitlements** - Control which features are available to different pricing tiers

!!! tip "Feature Flags Give PMs Superpowers"
    Feature flags shift the release decision from engineering to product. Instead of asking "when will this feature be deployed?" you ask "when should we turn this feature on, and for whom?" This is a profound shift in control that every technical PM should advocate for.

## Building the Right Thing: MVP and Iterative Development

### Minimum Viable Product

The **minimum viable product (MVP)** is the smallest version of a product that can be released to users to test a hypothesis and gather validated learning. The concept, popularized by Eric Ries in *The Lean Startup*, is frequently misunderstood. An MVP is not a half-baked product or a prototype - it is a deliberate, strategic choice about the minimum functionality needed to test whether your product solves a real problem for real users.

The key word in MVP is "viable." An MVP must work well enough that users will actually use it and provide meaningful feedback. A buggy, confusing, or incomplete product does not generate useful learning - it just generates frustration. The art of MVP design is finding the smallest scope that still delivers genuine value.

Common MVP anti-patterns to avoid:

- **The "everything" MVP** - Trying to include too many features, defeating the purpose of minimum scope
- **The throwaway MVP** - Building something so minimal that none of the code can be reused
- **The endless MVP** - Never graduating beyond MVP, always adding "just one more thing" before launch
- **The internal MVP** - Testing only with internal stakeholders who cannot represent real users

### Iterative Development

**Iterative development** is the practice of building software through repeated cycles (iterations) where each cycle produces a working increment that builds upon the previous one. Unlike Waterfall\'s single pass through the SDLC, iterative development makes multiple passes, with each iteration refining requirements, design, and implementation based on what was learned in previous iterations.

The power of iterative development lies in its feedback loops. Each iteration generates new information: user feedback reveals unmet needs, technical implementation reveals unforeseen constraints, and market conditions reveal new opportunities. Teams that embrace iterative development make better decisions because their decisions are informed by real-world data rather than upfront assumptions.

#### Diagram: From MVP to Full Product Through Iterations
<iframe src="../../sims/mvp-iterations/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>From MVP to Full Product Through Iterations</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: implement, demonstrate
Learning Objective: Students will be able to demonstrate how iterative development transforms an MVP into a mature product through successive learning-driven iterations.

Layout: Horizontal timeline showing product evolution through 5 iterations, with a feedback loop arrow curving back from each iteration\'s "Learn" phase to the next iteration\'s "Plan" phase.

Iterations (left to right):

1. MVP (gray/minimal): Features: Core value proposition only (e.g., manual onboarding, basic UI). Hypothesis: "Do users want this?" Feedback: 50 beta users, qualitative interviews. Learning: "Users love the core concept but need X."
2. Iteration 1 (light blue): Features: Added feature X, improved onboarding. Hypothesis: "Does X improve retention?" Feedback: 200 users, retention metrics. Learning: "Retention improved 30%, but users need integration with tool Y."
3. Iteration 2 (medium blue): Features: Integration with Y, performance optimization. Hypothesis: "Does integration drive adoption?" Feedback: 1,000 users, funnel analytics. Learning: "Integration users convert 2x better. Mobile experience is poor."
4. Iteration 3 (blue): Features: Mobile-responsive design, advanced analytics. Hypothesis: "Does mobile unlock new segments?" Feedback: 5,000 users, segment analysis. Learning: "Mobile users are 40% of base. Enterprise needs SSO."
5. Mature Product (dark blue): Features: Enterprise SSO, API access, advanced permissions. Status: Product-market fit achieved, scaling operations.

Feedback loop arrows connecting each iteration back to planning phase, labeled with what was learned.

Below timeline: Growing metrics chart showing user count, retention, and revenue increasing across iterations.

Interactive elements:

- Click each iteration to see detailed feature list, metrics, and learning outcomes
- Hover over feedback arrows to see specific user quotes and data points
- Animated progression showing the product growing more sophisticated over time

Color scheme: Gray (MVP) through progressively deeper blues (maturity)
Implementation: HTML/CSS/JavaScript with horizontal timeline and animated progression
</details>

## Bringing It All Together

The concepts in this chapter form the operational backbone of modern software product development. The SDLC provides the high-level framework, Agile values guide the philosophy, and Scrum and Kanban provide the day-to-day mechanics. CI/CD and release management translate development effort into delivered value, while feature flags give you fine-grained control over the user experience. MVP thinking and iterative development ensure that you build the right thing, not just build the thing right.

As a technical PM, your role in this ecosystem is unique. You are not running the Scrum ceremonies (that\'s the Scrum Master), not writing the code (that\'s the development team), and not setting the company vision (that\'s leadership). Your role is to be the bridge: translating business objectives into a well-prioritized backlog, ensuring user stories have clear acceptance criteria, using velocity data to set realistic expectations, and leveraging feature flags to control rollouts strategically.

The most effective technical PMs are fluent in these methodologies but not dogmatic about them. They know when to follow the Scrum playbook strictly and when to adapt it. They understand that Kanban might serve a support team better than Scrum. They recognize that CI/CD maturity varies across organizations and advocate for improvement without demanding perfection. Methodology is a tool, and the best PMs choose the right tool for the job.

??? question "Self-Check: Can you answer these questions?"
    1. What are the key differences between Waterfall and Agile, and when might Waterfall still be the better choice?
    2. Write a user story with three acceptance criteria for a feature in a product you use daily.
    3. Your team\'s velocity has been 30 story points per sprint for the past 5 sprints. A stakeholder asks you to commit to delivering a 100-point epic in 3 sprints. How do you respond?
    4. Explain the difference between continuous integration, continuous delivery, and continuous deployment.
    5. A feature flag is enabled for 10% of users and you see a 15% increase in error rates for that segment. What do you do?
    6. Your team is debating whether to use Scrum or Kanban. What questions would you ask to help make the decision?

## Key Takeaways

- The **software development lifecycle** provides the foundational framework of phases that every software product passes through, regardless of methodology
- **Waterfall methodology** is sequential and plan-driven - appropriate for well-understood requirements and regulated environments, but too rigid for most modern software products
- **Agile development** prioritizes iterative delivery, customer collaboration, and responsiveness to change over rigid plans and comprehensive documentation
- The **Scrum framework** provides structure through defined roles, artifacts, and ceremonies while maintaining Agile flexibility through short sprint cycles
- **Sprint planning**, **daily standups**, **sprint reviews**, and **sprint retrospectives** create a rhythm of planning, executing, demonstrating, and improving
- The **product backlog** is the PM\'s primary tool for translating strategy into execution, with **user stories** and **acceptance criteria** providing the language of requirements
- **Story points** measure relative effort, and **velocity tracking** enables data-driven capacity planning - but neither should be used as performance metrics
- The **Kanban method** offers a lightweight alternative to Scrum, emphasizing continuous flow and WIP limits over fixed sprints
- **Continuous integration** and **continuous delivery** automate the path from code commit to production, reducing deployment risk and accelerating feedback loops
- **Release management** coordinates what ships and when, while **feature flags** decouple deployment from release, giving PMs granular control over feature exposure
- The **minimum viable product** is the smallest version of a product that tests a hypothesis with real users - it must be viable, not just minimal
- **Iterative development** leverages feedback loops from each cycle to make increasingly informed decisions, transforming assumptions into validated knowledge
