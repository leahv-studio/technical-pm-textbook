# Availability & Downtime Calculator

An interactive calculator that translates uptime percentages into real downtime numbers and revenue impact. Explore how each additional "nine" of availability dramatically reduces allowed downtime while increasing engineering cost.

<iframe src="./main.html" width="100%" height="750px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim helps you understand the practical meaning of availability targets:

- **90% to 99.9999%** — Select from seven availability tiers, from "one nine" through "six nines"
- **Downtime visualization** — A log-scale bar chart shows how dramatically downtime decreases at each tier
- **Revenue impact** — Adjust hourly revenue from $1K to $1M to see the dollar cost of downtime
- **SLA analysis** — Contextual text explains what each tier means for engineering investment and customer contracts

## How to Use

1. Drag the **Availability Target** slider to explore tiers from 90% to 99.9999%
2. Set your **Revenue per Hour** to see the financial impact of downtime
3. Read the downtime cards for per-year and per-month durations
4. Review the SLA Impact Analysis panel for engineering and business context

## What to Try

- **Compare 99.9% vs 99.99%** — See that one extra nine cuts downtime from 8.7 hours/year to 52 minutes, but engineering cost jumps from "Moderate" to "High"
- **Set revenue to $1M/hour** — See how even minutes of downtime at five nines costs hundreds of thousands of dollars
- **Start at 90%** — Understand why this is unacceptable for any customer-facing product

## Key Takeaway

Each additional "nine" of availability requires disproportionately more engineering investment. Moving from 99% to 99.9% is manageable; moving from 99.99% to 99.999% requires multi-region redundancy, chaos engineering, and 24/7 on-call rotations. PMs must determine the right target by balancing user expectations, SLA obligations, and infrastructure budget.

## Learning Objectives

After using this simulation, you should be able to:

- Calculate the downtime allowed per year and per month for any availability percentage
- Estimate the revenue impact of downtime at different availability tiers
- Explain why each additional "nine" costs significantly more engineering effort
- Determine an appropriate availability target based on product requirements and budget

## Related Content

This simulation supports [Chapter 4: System Architecture Fundamentals](../../chapters/04-system-architecture/index.md), which covers system reliability, high availability, fault tolerance, and how architecture decisions affect product strategy.
