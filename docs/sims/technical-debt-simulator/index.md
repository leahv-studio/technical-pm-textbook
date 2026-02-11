# Technical Debt Simulator

An interactive game that demonstrates how technical debt accumulates over sprints and compounds into delivery slowdowns. Play through 12 sprints and see the consequences of your choices.

<iframe src="./main.html" width="100%" height="900px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim lets you experience the trade-off between shipping fast and maintaining code quality:

- **Ship Fast** delivers more features in the short term but adds technical debt that slows future sprints
- **Refactor** produces fewer features this sprint but reduces debt, improving future velocity
- A **balanced reference team** (ship 2, refactor 1) is shown for comparison throughout the game

The velocity chart and debt meter make the compounding effect visible: small shortcuts early create large slowdowns later.

## How to Play

1. Each sprint, read the **prediction** below the buttons to see what each choice will cost
2. Click **Ship Fast** or **Refactor** based on your strategy
3. Watch your velocity line on the chart compared to the balanced team's dashed line
4. After 12 sprints, review the summary comparing total features shipped
5. Click **Reset** and try a different strategy

## Strategies to Try

- **Always Ship Fast** - See how velocity degrades sprint over sprint
- **Always Refactor** - Sustainable but very low total output
- **Match the Balanced Team** - Ship 2 sprints, refactor 1, repeat
- **Front-load then recover** - Ship fast for 6 sprints, then refactor the remaining 6

## Key Takeaway

Teams that never refactor feel productive at first but deliver fewer total features over time. The compounding drag of technical debt means every sprint gets slower. A PM who understands this can make the case for refactoring not as "wasted time" but as an investment that increases total delivery.

## Learning Objectives

After playing this simulation, you should be able to:

- Explain why technical debt causes compounding slowdowns in delivery velocity
- Articulate the business case for allocating sprint time to refactoring
- Recognize that short-term speed gains from cutting corners cost more in the long run
- Discuss trade-offs between feature delivery and code quality with engineering teams

## Related Content

This simulation supports [Chapter 9: Quality Assurance and Technical Debt](../../chapters/09-quality-assurance-technical-debt/index.md), which covers testing strategies, code quality metrics, technical debt management, and how PMs collaborate with engineers on quality decisions.
