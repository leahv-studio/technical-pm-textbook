# Monolith vs. Microservices Explorer

An interactive slider-driven exploration of architecture patterns. Adjust team size, system complexity, and expected users to see the architecture visually morph between monolith, modular monolith, and microservices with contextual recommendations.

<iframe src="./main.html" width="100%" height="750px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim helps you evaluate which architecture pattern fits a given set of project constraints:

- **Monolith** (score 0.0-0.35) - A single deployment unit with shared codebase, ideal for small teams and simple domains
- **Modular Monolith** (score 0.35-0.65) - Clear module boundaries within a single deployable unit, balancing structure with simplicity
- **Microservices** (score 0.65-1.0) - Independent services with their own databases, enabling autonomous teams and per-service scaling

The architecture diagram morphs smoothly as the score changes, with colors transitioning from blue (monolith) through teal (modular) to green (microservices).

## How to Use

1. Drag the **Team Size** slider to set how many developers will work on the system (2-50)
2. Set the **System Complexity** level (Low, Medium, High)
3. Adjust **Expected Users** from 1K to 10M on the logarithmic scale
4. Watch the architecture diagram morph and read the recommendation panel below

## What to Try

- **All sliders at minimum** - See why a monolith is the clear choice for small teams with simple needs
- **All sliders at maximum** - See why microservices become necessary at scale
- **Large team, low complexity** - Discover why a modular monolith can be the sweet spot
- **Small team, high user count** - Learn the "start monolith, plan to extract" strategy

## Key Takeaway

There is no universally best architecture. The right choice depends on team size, system complexity, and scale requirements. Many teams adopt microservices prematurely, before they have the operational maturity to manage the complexity. Starting with a well-structured monolith and extracting services as needed is often the most pragmatic path.

## Learning Objectives

After using this simulation, you should be able to:

- Assess which architecture pattern best fits a given set of project constraints
- Explain the trade-offs in deployment, team structure, and scaling for each pattern
- Articulate why premature adoption of microservices increases risk
- Judge when a modular monolith provides the best balance of structure and simplicity

## Related Content

This simulation supports [Chapter 4: System Architecture Fundamentals](../../chapters/04-system-architecture/index.md), which covers architectural patterns, distributed systems, reliability, and performance concepts.
