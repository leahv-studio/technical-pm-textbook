# Scaling Under Load Simulator

An interactive simulation that sends animated traffic at servers and lets you compare vertical scaling (bigger server) versus horizontal scaling (more servers). Watch what happens when load exceeds capacity under each strategy.

<iframe src="./main.html" width="100%" height="750px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim demonstrates the fundamental difference between two scaling strategies:

- **Vertical Scaling (Scale Up)** - A single server grows larger as traffic increases, changing color from amber to red as it approaches the hardware ceiling. At high traffic levels, the server maxes out and starts dropping requests
- **Horizontal Scaling (Scale Out)** - New server instances spawn behind a load balancer, distributing traffic evenly. Response times stay low because each server handles only a fraction of the total load

Animated request dots flow from left to right, visually showing how traffic is processed under each strategy.

## How to Use

1. Use the **Traffic Load** slider to increase request volume from 100 to 50K requests per second
2. Click **Vertical** or **Horizontal** to toggle between scaling strategies
3. Watch the animated requests flow into the server(s) and observe the metrics below
4. Compare response time, cost, failure risk, and capacity between strategies

## What to Try

- **Low traffic, both strategies** - See that vertical scaling is simpler and cheaper at low load
- **Crank traffic to maximum on vertical** - Watch the server turn red, hit the hardware ceiling, and start dropping requests
- **Crank traffic to maximum on horizontal** - See how adding servers keeps response times low
- **Compare costs at mid-range traffic** - Notice where horizontal scaling becomes more cost-effective despite higher base cost

## Key Takeaway

Vertical scaling is simpler but has a hard ceiling — you cannot make a single machine infinitely powerful. Horizontal scaling is more complex to operate but scales virtually without limit. Most large-scale web applications use horizontal scaling because it also eliminates the single point of failure risk. The best strategy often starts vertical for simplicity and transitions to horizontal as traffic grows.

## Learning Objectives

After using this simulation, you should be able to:

- Explain the difference between scaling up (vertical) and scaling out (horizontal)
- Identify the hardware ceiling limitation of vertical scaling
- Describe why horizontal scaling provides better fault tolerance
- Assess when each scaling strategy is appropriate based on traffic volume and cost constraints

## Related Content

This simulation supports [Chapter 5: Cloud Computing, Scaling, and Infrastructure](../../chapters/05-cloud-computing-infrastructure/index.md), which covers cloud service models, containerization, scaling strategies, caching, and content delivery networks.
