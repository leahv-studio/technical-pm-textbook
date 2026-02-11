# A/B Test Calculator

An interactive simulation that demonstrates how A/B tests work, why sample size matters, and what happens when you stop experiments too early.

<iframe src="./main.html" width="100%" height="950px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim simulates a complete A/B test experiment, helping you understand:

- **Sample size requirements** - How baseline rates, effect sizes, and traffic volume determine how long an experiment needs to run
- **Statistical significance** - What the 95% confidence threshold means and how confidence builds over time
- **Early stopping danger** - Why results that look conclusive after a few days often turn out to be noise
- **P-values in plain language** - What different confidence levels actually tell you about your results

## How to Use

1. **Set your parameters** using the three sliders:
      - **Baseline conversion rate** - Your current conversion rate (1-20%)
      - **Minimum detectable effect** - The smallest improvement worth detecting (0.5-5 percentage points)
      - **Daily traffic** - Total visitors per day split between both groups (100-10,000)

2. **Read the estimate** to understand how long the experiment should run

3. **Click Run Experiment** and watch the simulation unfold:
      - The two bars show observed conversion rates for Control A and Variant B
      - The confidence gauge climbs toward the 95% threshold
      - The sparkline chart reveals how confidence fluctuates over time

4. **Try clicking Stop Early** during the first few days to see the warning about premature conclusions

5. **Click Reset** and try different parameters to see how they affect the required sample size

## Key Takeaway

Watch the confidence sparkline closely in the first few days. You will see it swing wildly, sometimes crossing 95% and then dropping back down. This is exactly why stopping an A/B test early produces unreliable results. A PM who reports a "winning variant" on day 3 of a 20-day experiment is essentially flipping a coin.

## Learning Objectives

After exploring this simulation, you should be able to:

- Determine whether an A/B test has collected enough data to be conclusive
- Explain to stakeholders why experiments need a predetermined sample size
- Interpret confidence levels and describe what they mean in practical terms
- Identify the risks of peeking at results and stopping experiments early

## Related Content

This simulation supports [Chapter 12: Advanced Analytics and Experimentation](../../chapters/12-advanced-analytics-experimentation/index.md), which covers hypothesis testing, experiment design, statistical significance, and how technical PMs work with data science teams.
