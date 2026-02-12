---
title: Cloud Computing, Scaling, and Infrastructure
description: The cloud computing landscape including IaaS, PaaS, SaaS, serverless computing, containerization with Docker and Kubernetes, scaling strategies, caching, and content delivery networks
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# Cloud Computing, Scaling, and Infrastructure

## Summary

This chapter covers the cloud computing landscape that powers modern software products. You will learn about the major cloud service models - IaaS, PaaS, SaaS, and serverless computing - and understand how containerization technologies like Docker and Kubernetes are used in production. The chapter also addresses scaling strategies including horizontal and vertical scaling, caching strategies, and content delivery networks that technical PMs need to evaluate when making infrastructure decisions.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

1. Cloud Computing
2. Infrastructure as a Service
3. Platform as a Service
4. Software as a Service
5. Serverless Computing
6. Containerization
7. Docker Overview
8. Kubernetes Overview
9. Horizontal Scaling
10. Vertical Scaling
11. Caching Strategies
12. Content Delivery Network

## Prerequisites

This chapter builds on concepts from:

- [Chapter 4: System Architecture Fundamentals](../04-system-architecture/index.md)

---

## What Is Cloud Computing?

**Cloud computing** is the delivery of computing resources - servers, storage, databases, networking, software, and analytics - over the internet ("the cloud") on a pay-as-you-go basis. Instead of buying and maintaining physical servers in your own data center, you rent computing capacity from cloud providers like Amazon Web Services (AWS), Microsoft Azure, or Google Cloud Platform (GCP). This fundamental shift in how companies consume infrastructure has transformed software product development.

Before cloud computing, launching a product required significant upfront capital investment in hardware, months of procurement lead time, and a team of operations engineers to manage physical servers. Today, a technical PM can approve an infrastructure request and have new servers running in minutes. This speed and flexibility has made cloud computing the default infrastructure choice for the vast majority of modern software products.

Cloud computing offers several core advantages for product teams:

- **Elasticity** - Scale resources up during traffic spikes and down during quiet periods, paying only for what you use
- **Speed** - Provision new infrastructure in minutes rather than months
- **Global reach** - Deploy your product in data centers around the world, close to your users
- **Managed services** - Offload operational burden for databases, machine learning, analytics, and more to the cloud provider
- **Cost model** - Convert large capital expenditures (buying servers) into smaller operational expenses (renting capacity)

!!! note "Why Cloud Matters to PMs"
    Cloud computing decisions directly affect your product's cost structure, performance characteristics, and geographic availability. Understanding the basics helps you participate in infrastructure discussions, evaluate build-vs-buy decisions, and understand why your monthly cloud bill changes as usage grows.

## Cloud Service Models

Cloud services are organized into layers, each offering a different level of abstraction. Understanding these layers helps you appreciate what your engineering team manages directly versus what the cloud provider handles.

### Infrastructure as a Service (IaaS)

**Infrastructure as a Service (IaaS)** provides the most basic cloud computing resources: virtual servers, storage, and networking. With IaaS, the cloud provider manages the physical hardware, but your engineering team is responsible for everything that runs on it - the operating system, middleware, runtime, applications, and data.

IaaS gives you maximum control and flexibility but also maximum responsibility. Your team must patch operating systems, configure firewalls, manage server capacity, and handle backups. IaaS is the right choice when you need fine-grained control over the computing environment or when running software that requires specific operating system configurations.

### Platform as a Service (PaaS)

**Platform as a Service (PaaS)** provides a higher-level abstraction where the cloud provider manages the operating system, runtime, and middleware in addition to the hardware. Your engineering team only needs to manage the application code and data. PaaS platforms like Heroku, Google App Engine, and AWS Elastic Beanstalk handle the undifferentiated heavy lifting of server management.

PaaS accelerates development by eliminating infrastructure concerns, allowing engineers to focus entirely on building product features. The trade-off is less control over the underlying environment, which can be limiting for applications with unusual requirements.

### Software as a Service (SaaS)

**Software as a Service (SaaS)** is the fully managed model where the provider delivers a complete application over the internet. Users access SaaS applications through a web browser or API without installing, maintaining, or managing any infrastructure. Examples include Salesforce, Slack, Google Workspace, and Datadog.

As a technical PM, you interact with SaaS in two ways: as a consumer (your team uses SaaS tools for analytics, monitoring, communication) and potentially as a provider (if your product is delivered as a SaaS application to customers).

| Service Model | You Manage | Provider Manages | Example |
|--------------|------------|-----------------|---------|
| **IaaS** | Applications, data, runtime, OS | Virtualization, servers, storage, networking | AWS EC2, Azure VMs, Google Compute Engine |
| **PaaS** | Applications, data | Runtime, OS, virtualization, servers, storage | Heroku, Google App Engine, AWS Elastic Beanstalk |
| **SaaS** | Nothing (just use it) | Everything | Salesforce, Slack, Google Workspace |

#### Diagram: Cloud Service Models Stack
<iframe src="../../sims/cloud-service-models/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Cloud Service Models Stack</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: classify, explain
Learning Objective: Students will be able to classify cloud services into IaaS, PaaS, and SaaS categories and explain what each model abstracts away from the engineering team.

Layout: Three-column stacked diagram showing the responsibility layers for IaaS, PaaS, and SaaS. Each column shows the full stack from hardware to application, with color coding indicating what the provider manages vs. what the customer manages.

Interactive elements: Hover over each layer to see a description of what it includes and example technologies. Click columns to see real-world examples of products built on each model.

Color scheme: Blue for customer-managed layers, green for provider-managed layers
Implementation: HTML/CSS/JavaScript with responsive stacked layout
</details>

### Serverless Computing

**Serverless computing** is a cloud execution model where the provider dynamically allocates computing resources and only charges for the actual compute time consumed. Despite the name, servers are still involved - you just do not manage, provision, or even think about them. Your engineering team writes functions that execute in response to events (an API call, a file upload, a database change), and the cloud provider handles everything else.

Serverless computing represents the most extreme abstraction in the cloud model stack. Popular serverless platforms include AWS Lambda, Azure Functions, and Google Cloud Functions.

Key characteristics of serverless computing:

- **Event-driven** - Functions execute in response to triggers, not continuous server processes
- **Auto-scaling** - The platform automatically scales from zero to thousands of concurrent executions
- **Pay-per-execution** - You pay only for the compute time your functions actually consume, measured in milliseconds
- **No server management** - No operating systems to patch, no capacity to plan, no servers to monitor

!!! warning "Serverless Trade-offs"
    Serverless is not ideal for all workloads. Functions have execution time limits (typically 15 minutes), cold start latency can affect user experience, long-running processes are expensive, and debugging distributed serverless applications can be challenging. It works best for event-driven, short-duration tasks like API handlers, data processing pipelines, and scheduled jobs.

## Containerization: Docker and Kubernetes

### What Is Containerization?

**Containerization** is a technology that packages an application together with all its dependencies - code, runtime, libraries, and system tools - into a single, portable unit called a container. A container includes everything the application needs to run, ensuring it behaves identically regardless of where it is deployed. This solves the classic "it works on my machine" problem that has plagued software development for decades.

Containers are lighter weight than virtual machines because they share the host operating system's kernel rather than bundling an entire OS. This makes them faster to start, more efficient with resources, and easier to manage at scale.

| Characteristic | Container | Virtual Machine |
|---------------|-----------|----------------|
| **Boot time** | Seconds | Minutes |
| **Size** | Megabytes | Gigabytes |
| **OS** | Shares host kernel | Full OS per VM |
| **Isolation** | Process-level | Hardware-level |
| **Density** | Hundreds per server | Tens per server |
| **Portability** | Highly portable | Less portable |

### Docker Overview

**Docker** is the most widely used containerization platform, providing tools to build, distribute, and run containers. Docker introduced a standardized container format and a simple workflow that made containerization accessible to mainstream engineering teams. Before Docker, containerization technology existed but was too complex for widespread adoption.

The Docker workflow consists of three core concepts:

1. **Dockerfile** - A text file containing instructions for building a container image (what OS base to use, what software to install, what code to include)
2. **Image** - A read-only template created from a Dockerfile that defines the container's contents (like a snapshot or blueprint)
3. **Container** - A running instance of an image (like a process started from the blueprint)

For technical PMs, Docker matters because it standardizes how software is packaged and deployed. When an engineer says "we've containerized the service," it means the service can be deployed consistently across any environment that supports Docker - development laptops, test servers, staging environments, and production infrastructure.

### Kubernetes Overview

**Kubernetes** (often abbreviated as K8s) is an open-source platform for automating the deployment, scaling, and management of containerized applications. While Docker packages individual applications into containers, Kubernetes orchestrates many containers across many machines, handling the complexity of running distributed applications at scale.

Kubernetes solves problems that arise when you have dozens or hundreds of containers to manage:

- **Scheduling** - Deciding which physical machine should run each container based on resource availability
- **Scaling** - Automatically increasing or decreasing the number of container instances based on demand
- **Self-healing** - Detecting failed containers and restarting them automatically
- **Service discovery** - Enabling containers to find and communicate with each other
- **Rolling updates** - Deploying new versions of an application without downtime

!!! tip "The PM's Container Vocabulary"
    You do not need to understand Kubernetes configuration files or Docker commands. You need to understand what these tools accomplish: Docker ensures consistent packaging and deployment; Kubernetes ensures reliable operation at scale. When engineers discuss container orchestration, they are talking about managing the lifecycle of many interconnected services running across many machines.

## Scaling Strategies

Scaling is the ability to handle increasing workloads - more users, more data, more transactions - without degrading performance. As a technical PM, scaling decisions directly affect your product's growth potential and infrastructure costs.

### Vertical Scaling

**Vertical scaling** (also called "scaling up") means increasing the capacity of a single machine by adding more CPU, memory, storage, or network bandwidth. It is the simplest scaling approach: if your server is running slowly, get a bigger server.

Vertical scaling advantages:

- Simple to implement (no code changes required)
- No distributed system complexity
- Consistent performance characteristics

Vertical scaling limitations:

- There is a physical ceiling (you cannot make a single machine infinitely powerful)
- Requires downtime to upgrade hardware
- Single point of failure (one big machine going down takes everything with it)
- Cost increases non-linearly (a server with twice the CPU often costs more than twice as much)

### Horizontal Scaling

**Horizontal scaling** (also called "scaling out") means adding more machines to distribute the workload across them. Instead of one powerful server, you run many smaller servers behind a load balancer. Horizontal scaling is the approach used by virtually all large-scale web applications.

Horizontal scaling advantages:

- Virtually unlimited capacity (keep adding machines)
- No single point of failure (if one machine goes down, others continue)
- Cost-efficient (many commodity machines are cheaper than one high-end machine)
- Can be automated (auto-scaling based on demand)

Horizontal scaling challenges:

- Application must be designed to run across multiple machines (stateless design)
- Data consistency becomes more complex
- Requires load balancing and service discovery infrastructure
- More operational complexity to manage many machines

| Dimension | Vertical Scaling | Horizontal Scaling |
|-----------|-----------------|-------------------|
| **Approach** | Bigger machine | More machines |
| **Complexity** | Simple | Complex |
| **Upper limit** | Hardware ceiling | Virtually unlimited |
| **Failure risk** | Single point of failure | Distributed, resilient |
| **Cost curve** | Non-linear (expensive at top) | Linear (predictable) |
| **Downtime** | Usually required | Zero-downtime possible |

#### Diagram: Scaling Strategies Comparison
<iframe src="../../sims/scaling-strategies/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Scaling Strategies Comparison</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, compare
Learning Objective: Students will be able to demonstrate the difference between vertical and horizontal scaling and compare their effectiveness under increasing load.

Layout: Side-by-side animation showing vertical scaling (one server getting larger) vs. horizontal scaling (more servers being added) as simulated user load increases. Metrics show response time, cost, and failure risk for each approach.

Interactive elements: Slider to increase simulated user load; toggle between scaling strategies; observe real-time metrics for response time, cost, and capacity utilization.

Color scheme: Orange for vertical scaling, blue for horizontal scaling
Implementation: HTML/CSS/JavaScript with animated scaling visualization
</details>

#### Diagram: Scaling Under Load Simulator

<iframe src="../../sims/scaling-load-simulator/main.html" width="100%" height="750px" scrolling="no"></iframe>

<details markdown="1">
<summary>Scaling Under Load Simulator</summary>
Type: microsim

Bloom Level: Evaluate (L5)
Bloom Verb: assess, compare
Learning Objective: Students will be able to explain the difference between scaling up and scaling out, and assess when each strategy is appropriate by observing how each handles increasing traffic load.

Layout: p5.js canvas showing animated request dots flowing from left toward server(s) on the right. A traffic slider controls the request rate. A strategy toggle switches between vertical scaling (single server grows larger, eventually overloads) and horizontal scaling (new server instances spawn behind a load balancer). Metrics below show response time, cost, failure risk, and capacity.

Interactive elements: Traffic load slider (100 to 50K req/s), vertical/horizontal strategy toggle, animated request dots with server load visualization, real-time metrics and contextual insight text.

Color scheme: Orange/amber for vertical scaling, blue for horizontal scaling, red for overloaded state
Implementation: p5.js with HTML controls
</details>

## Caching Strategies

**Caching strategies** are techniques for storing copies of frequently accessed data in a fast-access storage layer (the cache) to reduce the load on slower backend systems and improve response times. Caching is one of the most effective and cost-efficient performance optimization techniques in software engineering.

The basic principle is simple: if many users request the same data, compute it once and store the result in a cache. Subsequent requests are served from the cache instead of recomputing or re-fetching from the database, which is dramatically faster.

Common caching patterns include:

- **Application cache** - In-memory storage within the application process (fastest but limited by server memory)
- **Distributed cache** - A shared cache service like Redis or Memcached that multiple application servers can access
- **Database query cache** - Storing the results of expensive database queries
- **HTTP cache** - Browser and CDN caching of static assets and API responses
- **Full-page cache** - Storing the complete rendered output of a page

Caching introduces its own challenges, primarily around cache invalidation - determining when cached data is stale and needs to be refreshed. As the famous computer science saying goes: "There are only two hard things in computer science: cache invalidation and naming things."

!!! tip "Caching Questions for PMs"
    When discussing performance improvements with engineers, ask: "What is our cache hit rate?" (percentage of requests served from cache vs. the backend), "What is the cache TTL?" (how long cached data lives before being refreshed), and "What happens when the cache goes down?" (does the system degrade gracefully or fail?).

## Content Delivery Networks

A **content delivery network (CDN)** is a geographically distributed network of servers that delivers web content to users from the server closest to their physical location. CDNs cache static assets like images, JavaScript files, CSS stylesheets, and video content at edge locations around the world, dramatically reducing the distance data must travel and therefore reducing latency.

Without a CDN, a user in Tokyo accessing a website hosted in Virginia would experience significant latency as every request travels across the Pacific Ocean and back. With a CDN, that same content is served from an edge server in Tokyo, reducing latency from hundreds of milliseconds to single-digit milliseconds.

CDNs provide several benefits:

- **Reduced latency** - Content is served from nearby edge locations
- **Increased availability** - Traffic is distributed across many servers globally
- **DDoS protection** - CDN infrastructure absorbs distributed denial-of-service attacks
- **Reduced origin load** - Your backend servers handle fewer requests because the CDN serves cached content
- **Cost savings** - Bandwidth from CDN edge servers is often cheaper than bandwidth from your cloud provider

Popular CDN providers include Cloudflare, Amazon CloudFront, Akamai, and Fastly.

#### Diagram: CDN Request Flow
<iframe src="../../sims/cdn-request-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>CDN Request Flow</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, trace
Learning Objective: Students will be able to explain how a CDN delivers content to users and trace a request through the CDN to understand cache hit vs. cache miss scenarios.

Layout: World map showing an origin server, multiple CDN edge locations, and user locations. Animated arrows show request flow for cache hit (user to nearby edge) vs. cache miss (user to edge to origin and back).

Interactive elements: Click on different user locations to see which edge server serves them. Toggle between cache hit and cache miss scenarios to see the difference in request flow and latency.

Color scheme: Blue for origin, green for edge servers, orange for users
Implementation: HTML/CSS/JavaScript with SVG world map
</details>

## Making Infrastructure Decisions as a PM

Cloud and infrastructure decisions are deeply intertwined with product decisions. The choice of cloud service model affects development speed and operational burden. The choice of scaling strategy determines growth capacity and cost structure. The choice of caching and CDN strategy shapes the user experience across geographies.

As a technical PM, your role in infrastructure decisions includes:

- **Understanding cost implications** - Cloud costs scale with usage. You should understand how your product's growth projections translate to infrastructure costs and work with engineering to optimize spend
- **Evaluating build-vs-buy** - For many capabilities (authentication, payment processing, email delivery), SaaS solutions are faster and cheaper than building in-house. Knowing when to build and when to buy is a core PM skill
- **Setting performance requirements** - Define latency and throughput targets based on user expectations and competitive benchmarks, then work with engineering to select the infrastructure that can meet them
- **Planning for growth** - Ensure the infrastructure architecture can scale to your 12-month and 24-month growth projections without requiring a complete rebuild

??? question "Self-Check: Can you answer these questions?"
    1. What are the three main cloud service models (IaaS, PaaS, SaaS), and what does the engineering team manage in each?
    2. How does serverless computing differ from traditional cloud computing? What are its advantages and limitations?
    3. What is the difference between Docker and Kubernetes? Why would a team need both?
    4. Compare vertical and horizontal scaling. Under what circumstances would each be the better choice?
    5. How does a CDN improve performance for users in different geographic locations?

## Key Takeaways

- **Cloud computing** delivers computing resources over the internet on a pay-as-you-go basis, enabling rapid provisioning, global deployment, and elastic scaling
- **Infrastructure as a Service** provides maximum control but maximum responsibility; **Platform as a Service** abstracts away server management; **Software as a Service** delivers complete applications
- **Serverless computing** automatically scales and charges only for actual execution time, ideal for event-driven, short-duration workloads
- **Containerization** packages applications with all dependencies for consistent deployment; **Docker** provides the packaging standard; **Kubernetes** orchestrates containers at scale
- **Vertical scaling** (bigger machines) is simple but limited; **horizontal scaling** (more machines) is complex but virtually unlimited - most large-scale products use horizontal scaling
- **Caching strategies** store frequently accessed data in fast-access layers to reduce backend load and improve response times - cache invalidation is the primary challenge
- **Content delivery networks** serve content from edge locations geographically close to users, dramatically reducing latency and improving global performance
- Infrastructure decisions are product decisions - they affect cost structure, performance, growth capacity, and development velocity
