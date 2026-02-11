---
title: Quality Assurance and Technical Debt
description: Understanding technical debt, code quality, testing methodologies, and system migration strategies that impact product velocity and reliability
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# Quality Assurance and Technical Debt

## Summary

This chapter covers the quality and maintenance dimensions of software development that directly impact product velocity and reliability. You'll learn about technical debt - what it is, how to track it, and when to pay it down - along with code quality, refactoring, and legacy systems. The chapter also provides a thorough introduction to testing methodologies including unit, integration, and end-to-end testing, as well as performance testing, security testing, automated testing, and system migration strategies.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Technical Debt
2. Code Quality
3. Code Refactoring
4. Legacy Systems
5. System Migration
6. Testing Fundamentals
7. Unit Testing
8. Integration Testing
9. End-to-End Testing
10. Quality Assurance
11. Performance Testing
12. Security Testing
13. Code Coverage
14. Automated Testing
15. Technical Debt Tracking

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Software Development Essentials](../02-software-development-essentials/index.md)
- [Chapter 3: Technical Documentation and Requirements](../03-technical-documentation/index.md)
- [Chapter 4: System Architecture Fundamentals](../04-system-architecture/index.md)
- [Chapter 6: APIs and Integrations](../06-apis-and-integrations/index.md)
- [Chapter 8: Advanced Data Management](../08-advanced-data-management/index.md)

---

## Why Quality Matters for Product Managers

Every product manager has experienced the tension between shipping new features and maintaining what already exists. Engineering teams ask for "hardening sprints," architects raise concerns about system fragility, and customers report bugs that should have been caught before release. These conversations all trace back to two interconnected topics: quality assurance and technical debt. Understanding both concepts deeply will transform how you prioritize work, negotiate trade-offs, and communicate with your engineering partners.

This chapter equips you to participate meaningfully in conversations about code quality, testing strategy, and system modernization. You will not need to write tests yourself, but you will need to understand why your engineering team insists on certain quality gates, how testing strategies affect release timelines, and when investing in debt reduction yields better returns than building new features.

!!! note "The PM\'s Role in Quality"
    You don\'t need to be the person who writes tests or refactors code. Your job is to understand the *business impact* of quality decisions, create space in the roadmap for quality investments, and help the team make informed trade-offs between speed and sustainability.

## Understanding Technical Debt

**Technical debt** is the implied cost of future rework caused by choosing an expedient solution today instead of a better approach that would take longer to implement. The metaphor was coined by Ward Cunningham in 1992 and draws a deliberate parallel to financial debt: you borrow against future productivity to deliver something now, and you pay interest on that loan through increased maintenance costs, slower feature development, and higher defect rates until you repay the principal by fixing the underlying problem.

Technical debt is not inherently bad. Just as financial debt can be a strategic tool - taking a mortgage to buy a house, or borrowing to fund a business - technical debt can be a rational product decision. Launching a feature with a simpler-but-less-scalable implementation to validate market demand before investing in a robust architecture is a perfectly sound strategy. The problems arise when debt accumulates without tracking, when teams take on debt unintentionally, or when leadership refuses to allocate time for repayment.

Technical debt generally falls into four categories:

| Type | Description | Example | Risk Level |
|------|-------------|---------|------------|
| **Deliberate, Prudent** | Conscious decision to ship quickly with known trade-offs | "We\'ll use a flat file instead of a database for the MVP and migrate later" | Low (planned) |
| **Deliberate, Reckless** | Conscious decision to cut corners without a repayment plan | "We don\'t have time for tests, just ship it" | High |
| **Inadvertent, Prudent** | Learning from experience reveals a better approach | "Now that we understand the domain better, this module should be restructured" | Medium |
| **Inadvertent, Reckless** | Poor practices due to lack of knowledge or discipline | Duplicated code, no documentation, hardcoded values everywhere | Very High |

#### Diagram: Technical Debt Quadrant
<iframe src="../../sims/technical-debt-quadrant/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Technical Debt Quadrant</summary>
Type: diagram

Bloom Level: Analyze (L4)
Bloom Verb: classify, differentiate
Learning Objective: Students will be able to classify examples of technical debt into the four quadrants and differentiate between strategic and harmful debt accumulation.

Layout: 2x2 matrix with "Deliberate vs. Inadvertent" on the horizontal axis and "Prudent vs. Reckless" on the vertical axis. Each quadrant contains a color-coded card with a title, description, real-world example, and recommended PM action.

Quadrants:

- Top-left (Deliberate + Prudent, green): "Strategic Debt" - Conscious shortcuts with a plan to repay. Example: shipping MVP with manual processes before automating. PM action: Track in backlog with clear trigger for repayment.
- Top-right (Inadvertent + Prudent, blue): "Learned Debt" - Better approaches discovered through experience. Example: realizing the data model needs restructuring after user research reveals new use cases. PM action: Schedule refactoring when touching related code.
- Bottom-left (Deliberate + Reckless, orange): "Shortcut Debt" - Cutting corners knowingly with no plan. Example: skipping tests to hit a deadline. PM action: Advocate for quality gates; escalate if pattern repeats.
- Bottom-right (Inadvertent + Reckless, red): "Ignorance Debt" - Poor practices from lack of skill or awareness. Example: no code reviews, duplicated logic, hardcoded credentials. PM action: Invest in team training and engineering standards.

Interactive elements:

- Hover over each quadrant to see expanded description and 2-3 additional examples
- Click a quadrant to see recommended tracking and repayment strategies
- Animated arrows show how debt can migrate between quadrants over time if not addressed

Color scheme: Green (safe) to red (dangerous) gradient across quadrants
Implementation: HTML/CSS/JavaScript with responsive grid layout
</details>

## Code Quality and Refactoring

**Code quality** is the degree to which source code meets defined standards for readability, maintainability, reliability, and performance. High-quality code is easy for developers to understand, modify, and extend. Low-quality code - often called "spaghetti code" - is tangled, poorly documented, and fragile, meaning that changing one part frequently breaks another. As a product manager, you cannot assess code quality by reading the code yourself, but you can recognize the symptoms of poor code quality in your team\'s velocity and defect rates.

Indicators that code quality may be degrading include:

- Feature delivery slows down even though team size has not changed
- Bug rates increase, especially regressions (bugs in previously working features)
- Engineers estimate simple-sounding features as taking weeks instead of days
- New team members take months to become productive
- The same components appear repeatedly in incident reports

**Code refactoring** is the process of restructuring existing code without changing its external behavior. Refactoring improves the internal structure - making the code cleaner, more modular, and easier to extend - while keeping the product\'s functionality identical from the user\'s perspective. Think of it as renovating the plumbing and wiring of a house while the family continues living in it. The house looks the same from the outside, but it works better on the inside.

!!! tip "How to Talk About Refactoring with Stakeholders"
    Stakeholders often resist refactoring because it produces no visible features. Frame refactoring in business terms: "This refactoring will reduce our average bug-fix time from 3 days to 1 day, letting us ship features 20% faster next quarter." Always connect engineering investments to business outcomes.

Common refactoring triggers that a PM should recognize:

- **High coupling** - Changes to one module require changes to many others
- **Code duplication** - The same logic exists in multiple places, creating inconsistency risk
- **Long methods** - Functions that do too many things and are difficult to test
- **Outdated patterns** - Code using deprecated libraries or obsolete architecture patterns

## Legacy Systems and System Migration

**Legacy systems** are older software applications or platforms that remain in active use because they serve critical business functions, even though they may use outdated technology, lack modern features, or be difficult and expensive to maintain. Legacy systems are not necessarily bad systems - many were excellently designed for their era - but they become liabilities when they cannot integrate with modern tools, when the engineers who understand them retire, or when they cannot scale to meet current demands.

As a technical PM, you will almost certainly inherit at least one legacy system. The question is never "should we replace it?" but rather "when, how, and at what pace should we modernize it?" Ripping out a legacy system and replacing it all at once (known as a "big bang" migration) is almost always riskier than a phased approach.

**System migration** is the process of moving a product, application, or data from one technology platform or architecture to another. Migrations are among the highest-risk, highest-impact projects a technical PM will manage. They require careful planning, extensive testing, and clear communication because a failed migration can cause data loss, extended downtime, and customer churn.

| Migration Strategy | Approach | Risk | Timeline | Best For |
|-------------------|----------|------|----------|----------|
| **Big Bang** | Replace everything at once on a cutover date | Very High | Short | Small, simple systems with low data volume |
| **Strangler Fig** | Gradually replace legacy components while both systems run | Low-Medium | Long | Large, complex systems with many integrations |
| **Parallel Run** | Run old and new systems simultaneously, comparing outputs | Medium | Medium | Financial or compliance-critical systems |
| **Phased Rollout** | Migrate users or features in stages | Medium | Medium-Long | Systems with distinct user segments or modules |

The **strangler fig pattern** - named after the tropical tree that gradually envelops and replaces its host - is particularly popular for large-scale migrations. You route new functionality through the new system while the old system continues to handle existing features. Over time, more and more traffic flows through the new system until the legacy system can be safely decommissioned.

!!! warning "Migration Risks PMs Must Watch"
    The three most common causes of migration failure are: (1) incomplete data migration that loses or corrupts records, (2) undocumented integrations with the legacy system that break when it changes, and (3) underestimating user retraining needs. As a PM, insist on a comprehensive integration inventory and a data validation plan before any migration begins.

## Testing Fundamentals

**Testing fundamentals** encompass the principles, practices, and strategies that engineering teams use to verify that software behaves correctly and meets its requirements. Testing is not just about finding bugs - it is about building confidence that the product works as intended across a wide range of conditions, inputs, and user behaviors.

**Quality assurance (QA)** is the broader discipline of ensuring that a product meets defined quality standards through systematic processes, including testing, code reviews, standards enforcement, and process improvements. While testing focuses on finding defects, quality assurance focuses on preventing them. A mature QA practice means that quality is built into every stage of development rather than bolted on at the end.

The relationship between QA and testing is hierarchical:

- **Quality Assurance** (umbrella discipline)
    - Process standards and code review policies
    - **Testing** (one component of QA)
        - Manual testing
        - **Automated testing**
            - Unit tests
            - Integration tests
            - End-to-end tests
        - Specialized testing (performance, security)
    - Continuous improvement and retrospectives

#### Diagram: The Testing Pyramid
<iframe src="../../sims/testing-pyramid/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>The Testing Pyramid</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: explain, classify
Learning Objective: Students will be able to explain the three levels of the testing pyramid and classify different test types into the correct level.

Layout: Triangular pyramid diagram with three horizontal layers, widest at bottom. Each layer has a color, label, count indicator, speed indicator, and cost indicator.

Layers (bottom to top):

1. Unit Tests (green, widest): Many tests, fast execution (milliseconds), low cost. Tests individual functions or methods in isolation. Example: "Does the calculateDiscount() function return the correct value for a 20% coupon?"
2. Integration Tests (blue, medium): Moderate number, moderate speed (seconds), moderate cost. Tests how components work together. Example: "Does the checkout service correctly communicate with the payment gateway and inventory system?"
3. End-to-End Tests (orange, narrowest): Few tests, slow execution (minutes), high cost. Tests complete user workflows through the entire system. Example: "Can a user search for a product, add it to cart, enter payment, and receive a confirmation email?"

Side annotations:

- Left side: Arrow pointing up labeled "Slower, more expensive, more brittle"
- Right side: Arrow pointing down labeled "Faster, cheaper, more stable"
- Callout: "Recommended ratio: 70% unit, 20% integration, 10% E2E"

Interactive elements:

- Hover over each layer to see expanded description with 3-4 examples
- Click a layer to see tools commonly used (JUnit, pytest, Selenium, Cypress, etc.)
- Toggle button to switch between "ideal pyramid" and "common anti-patterns" (ice cream cone, hourglass)

Color scheme: Green (unit) to blue (integration) to orange (E2E)
Implementation: HTML/CSS/JavaScript with SVG pyramid, responsive design
</details>

## Unit Testing

**Unit testing** is the practice of testing individual functions, methods, or components of code in isolation to verify that each small piece works correctly on its own. Unit tests are the foundation of a healthy test suite because they are fast to run (typically milliseconds each), cheap to write, and precise in identifying where a problem occurs. When a unit test fails, the developer usually knows exactly which function is broken.

Consider a simple example. If your product has a pricing engine that calculates discounts, a unit test might verify that "when a customer has a 20% coupon and their cart total is $100, the function returns $80." The test does not launch the full application, does not connect to a database, and does not render a user interface. It tests one function with one set of inputs and checks one expected output.

From a PM perspective, unit tests matter because they give the team confidence to make changes quickly. When a codebase has comprehensive unit tests, engineers can refactor code, add new features, or fix bugs knowing that any unintended side effects will be caught immediately. Codebases without unit tests become increasingly fragile, and developers slow down because every change carries the risk of breaking something silently.

## Integration Testing

**Integration testing** verifies that multiple components or services work correctly when combined. While unit tests confirm that individual pieces function in isolation, integration tests confirm that those pieces communicate properly, pass data in the correct format, and handle error conditions across boundaries. Integration issues are among the most common sources of production bugs, especially in microservices architectures where many independent services must coordinate.

A typical integration test might verify that when the checkout service sends a payment request to the payment gateway, the gateway processes it correctly and returns a confirmation that the checkout service can parse. This test exercises the real communication pathway between two systems, including serialization, network calls, authentication, and error handling.

| Test Type | Scope | Speed | When Failures Occur | What They Catch |
|-----------|-------|-------|---------------------|-----------------|
| Unit | Single function | Milliseconds | Immediately on code change | Logic errors, calculation bugs |
| Integration | Multiple components | Seconds | After components are assembled | Communication failures, data format mismatches |
| End-to-End | Full system | Minutes | After full deployment | Workflow breaks, environment issues |

## End-to-End Testing

**End-to-end testing** (also called E2E testing) validates complete user workflows by exercising the entire application stack from the user interface through the backend services to the database and back. E2E tests simulate real user behavior: clicking buttons, filling out forms, navigating between pages, and verifying that the expected outcomes occur. They are the most comprehensive form of testing but also the most expensive, slowest, and most brittle.

An E2E test for an e-commerce product might simulate a user who searches for "wireless headphones," selects a product, adds it to the cart, proceeds to checkout, enters a credit card number, and verifies that a confirmation email arrives. This test touches every layer of the application and every external service.

!!! info "The E2E Testing Trade-off"
    E2E tests provide the highest confidence that the product works as users expect, but they are expensive to maintain. When the UI changes, E2E tests break even if the underlying logic is fine. Most teams limit E2E tests to critical user paths (signup, purchase, core workflow) and rely on unit and integration tests for broader coverage. As a PM, understand that a team cannot E2E-test every feature - focus E2E testing on revenue-critical and safety-critical paths.

## Specialized Testing: Performance and Security

### Performance Testing

**Performance testing** evaluates how a system behaves under various load conditions, measuring response times, throughput, resource utilization, and stability. Performance testing answers questions that matter deeply to product managers: "Can our system handle Black Friday traffic?" "What happens if usage doubles next quarter?" "How long do users wait for search results?"

Common types of performance testing include:

- **Load testing** - Applying expected production-level traffic to measure baseline performance
- **Stress testing** - Pushing beyond expected limits to find breaking points
- **Spike testing** - Simulating sudden traffic surges (product launch, viral event)
- **Endurance testing** - Running sustained load over extended periods to detect memory leaks and resource degradation

### Security Testing

**Security testing** systematically evaluates a system\'s ability to protect data, maintain integrity, and resist unauthorized access. In an era of frequent data breaches and increasingly strict regulations, security testing is not optional - it is a fundamental quality requirement. As a technical PM, you are responsible for ensuring that security is considered in product requirements, not bolted on as an afterthought.

Key security testing practices include:

- **Vulnerability scanning** - Automated tools that check for known security weaknesses in code and dependencies
- **Penetration testing** - Simulated attacks by security professionals to find exploitable weaknesses
- **Static Application Security Testing (SAST)** - Analyzing source code for security flaws without executing it
- **Dynamic Application Security Testing (DAST)** - Testing a running application for vulnerabilities
- **Dependency auditing** - Checking third-party libraries for known vulnerabilities

## Code Coverage and Automated Testing

**Code coverage** is a metric that measures the percentage of source code that is executed during automated testing. It answers the question "how much of our code is actually tested?" Code coverage is typically expressed as a percentage - for example, "our test suite has 78% code coverage" means that 78% of the codebase\'s lines, branches, or functions are exercised by at least one test.

Code coverage is a useful but imperfect metric. High coverage does not guarantee high quality - it is entirely possible to have 100% code coverage with tests that check trivial conditions and miss critical edge cases. Conversely, a team with 60% coverage focused on the most important and complex code paths may have a more effective test suite than a team with 90% coverage spread uniformly. Industry benchmarks typically target 70-80% coverage as a healthy goal, with critical paths expected to exceed 90%.

!!! warning "The Code Coverage Trap"
    Do not set code coverage as a rigid target that teams must hit. When coverage becomes a mandate, developers write meaningless tests just to increase the number. Instead, use coverage as a conversation starter: "Our payment module has only 40% coverage - should we invest in testing there before adding new features?" Focus on coverage of *critical paths*, not overall percentages.

**Automated testing** is the practice of using software tools to execute tests, compare actual results to expected results, and report outcomes without manual intervention. Automation transforms testing from a bottleneck into an accelerator. Instead of QA engineers manually clicking through the application before every release, automated test suites run in minutes (or seconds for unit tests) and execute on every code change.

The benefits of automated testing compound over time:

- **Speed** - A test suite that would take days to run manually executes in minutes
- **Consistency** - Automated tests perform the same checks every time, eliminating human error and oversight
- **Frequency** - Tests can run on every code commit, catching issues immediately
- **Regression protection** - Tests ensure that new changes don\'t break existing functionality
- **Developer confidence** - Engineers move faster when they trust the safety net

#### Diagram: Automated Testing in the CI/CD Pipeline
<iframe src="../../sims/automated-testing-pipeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Automated Testing in the CI/CD Pipeline</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: implement, demonstrate
Learning Objective: Students will be able to demonstrate how automated testing stages fit into a CI/CD pipeline and implement quality gates at each stage.

Layout: Horizontal pipeline diagram flowing left to right with stages represented as connected nodes. Each stage shows which tests run, approximate duration, and pass/fail gates.

Pipeline Stages:

1. Code Commit (gray): Developer pushes code. Triggers: pre-commit hooks (linting, formatting).
2. Unit Tests (green): Run all unit tests. Duration: 1-3 minutes. Gate: Must pass 100%. Blocks merge if any fail.
3. Integration Tests (blue): Run integration test suite. Duration: 5-15 minutes. Gate: Must pass 100%. Blocks deployment if any fail.
4. Build and Package (teal): Compile, containerize, create artifact. Duration: 2-5 minutes.
5. E2E Tests (orange): Run critical path E2E tests against staging. Duration: 15-30 minutes. Gate: Critical paths must pass. Non-critical failures reviewed.
6. Performance Tests (purple): Run load tests against staging. Duration: 10-20 minutes. Gate: Response times within SLA thresholds.
7. Security Scan (red): Run SAST/DAST tools, dependency audit. Duration: 5-10 minutes. Gate: No critical or high vulnerabilities.
8. Deploy to Production (gold): Release to users. Can be gated by manual approval.

Annotations:

- Above pipeline: "Faster feedback loops on the left, higher confidence on the right"
- Below: "Each gate prevents bad code from progressing further"

Interactive elements:

- Hover over each stage to see detailed description, tools used, and example output
- Click a stage to see what happens when it fails (rollback, notification, blocking behavior)
- Toggle between "fast feedback" mode (unit+integration only) and "full pipeline" mode

Color scheme: Gray to green to blue to gold progression
Implementation: HTML/CSS/JavaScript with horizontal pipeline visualization
</details>

## Technical Debt Tracking

**Technical debt tracking** is the practice of systematically identifying, documenting, prioritizing, and monitoring technical debt items so that the team can make informed decisions about when and how to address them. Without explicit tracking, technical debt becomes invisible to product managers and leadership, accumulating silently until it reaches a crisis point where development velocity collapses or a major incident occurs.

Effective technical debt tracking requires a shared vocabulary between product and engineering. Each debt item should be documented with:

- **Description** - What is the debt and where does it live in the codebase?
- **Origin** - When and why was the debt incurred? Was it deliberate or accidental?
- **Impact** - How does this debt affect development velocity, reliability, or user experience?
- **Interest rate** - How much additional cost does this debt impose per sprint/quarter?
- **Remediation effort** - How much work would it take to eliminate this debt?
- **Remediation trigger** - What event or threshold should prompt repayment?

| Tracking Approach | How It Works | Pros | Cons |
|-------------------|-------------|------|------|
| Dedicated backlog | Separate backlog or tag for tech debt items | Visible, easy to prioritize | Can become a "graveyard" of ignored items |
| Debt budget | Allocate fixed percentage (e.g., 20%) of each sprint to debt | Consistent investment | May not address highest-priority items first |
| Boy Scout Rule | "Leave the code better than you found it" on every change | Low overhead, continuous improvement | Hard to measure, misses large systemic debt |
| Debt sprints | Periodic sprints dedicated entirely to debt reduction | Focused progress | Feature work stops; stakeholder resistance |

!!! tip "The 20% Rule"
    Many high-performing engineering teams allocate approximately 20% of each sprint to technical debt reduction, infrastructure improvements, and developer tooling. As a PM, advocating for this investment demonstrates technical maturity and builds trust with engineering. The payoff comes in sustained velocity - teams that never address debt gradually slow to a crawl.

#### Diagram: Technical Debt Impact Over Time
<iframe src="../../sims/tech-debt-impact/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Technical Debt Impact Over Time</summary>
Type: chart

Bloom Level: Evaluate (L5)
Bloom Verb: assess, judge
Learning Objective: Students will be able to assess the long-term cost of ignoring technical debt and judge when debt reduction should be prioritized over feature development.

Layout: Dual-line chart showing two scenarios over a 12-quarter timeline.

Data series:

1. "Team A: No debt management" (red line): Starts with high feature velocity that gradually declines as debt accumulates. By quarter 8, velocity drops below 50% of original. By quarter 12, most effort goes to firefighting and maintenance.
2. "Team B: 20% debt allocation" (green line): Starts slightly lower (80% feature velocity) but maintains steady velocity throughout. By quarter 6, surpasses Team A. By quarter 12, delivers 2x the cumulative features.

Secondary chart (stacked area below): Shows the composition of Team A\'s time allocation shifting from mostly feature work to mostly maintenance/bug fixes over time.

Annotations:

- "Crossover point" marker where Team B surpasses Team A in cumulative features delivered
- "Crisis zone" shaded region where Team A\'s velocity drops below sustainable levels
- Key insight callout: "Short-term speed creates long-term drag"

Interactive elements:

- Slider to adjust the debt allocation percentage (10%, 20%, 30%) and see how it affects the curves
- Hover over any point to see exact velocity percentages and cumulative feature counts
- Toggle between "velocity per quarter" and "cumulative features delivered" views

Color scheme: Red (unsustainable) vs. green (sustainable) with gray background grid
Implementation: Chart.js line chart with interactive slider control
</details>

## Putting It All Together: A PM\'s Quality Strategy

Understanding these concepts individually is valuable, but the real skill lies in weaving them into a coherent quality strategy for your product. As a technical PM, you must balance the team\'s desire for quality with the business\'s demand for features. This balance is not static - it shifts based on your product\'s lifecycle phase, competitive pressures, and the current state of your technical debt.

In the early stages of a product, you might accept higher technical debt and lower test coverage to validate product-market fit quickly. As the product matures and the user base grows, the cost of defects increases and the need for reliability becomes paramount. A mature product with millions of users should have comprehensive automated testing, active debt tracking, and clear quality gates in the deployment pipeline.

The key insight for product managers is that quality is not the absence of bugs - it is the confidence to move fast without breaking things. Teams with strong testing practices, clean code, and managed technical debt actually ship faster than teams that cut corners, because they spend less time debugging, fixing regressions, and fighting fires.

??? question "Self-Check: Can you answer these questions?"
    1. What are the four types of technical debt in the debt quadrant, and which type should a PM be most concerned about?
    2. Explain the testing pyramid. Why should the majority of tests be unit tests rather than end-to-end tests?
    3. You inherit a product with 30% code coverage and engineers reporting that simple features take twice as long as expected. What would you investigate, and what might you propose?
    4. Your CEO wants to replace the company\'s 15-year-old order management system. What migration strategy would you recommend and why?
    5. How would you explain the value of allocating 20% of sprint capacity to technical debt to a stakeholder who only wants to see new features?

## Key Takeaways

- **Technical debt** is the implied cost of future rework from expedient solutions; it can be strategic when deliberate and tracked, but becomes dangerous when ignored
- **Code quality** directly affects team velocity, bug rates, and developer morale - declining quality is visible through slower delivery and rising defect counts
- **Code refactoring** improves internal code structure without changing user-facing behavior, and should be framed in business terms when communicating with stakeholders
- **Legacy systems** serve critical business functions but become liabilities when they cannot integrate with modern tools or when institutional knowledge about them is lost
- **System migration** strategies range from big-bang replacement to gradual strangler fig patterns; the right choice depends on system complexity, risk tolerance, and data sensitivity
- **Testing fundamentals** follow the testing pyramid: many fast unit tests at the base, fewer integration tests in the middle, and a small number of E2E tests at the top
- **Unit testing**, **integration testing**, and **end-to-end testing** each serve different purposes and operate at different cost/confidence trade-offs
- **Quality assurance** is the umbrella discipline that encompasses testing, code reviews, process standards, and continuous improvement
- **Performance testing** and **security testing** are specialized practices that verify non-functional requirements critical to user trust and system reliability
- **Code coverage** measures what percentage of code is exercised by tests - useful as a guide but dangerous as a rigid target
- **Automated testing** transforms quality from a bottleneck into an accelerator by running tests on every code change
- **Technical debt tracking** makes invisible costs visible, enabling informed prioritization decisions between feature work and debt reduction
