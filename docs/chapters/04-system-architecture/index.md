---
title: System Architecture Fundamentals
description: How software systems are designed and structured, covering architectural patterns, distributed systems, reliability, and performance concepts for technical product managers
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# System Architecture Fundamentals

## Summary

This chapter explores how software systems are designed and structured, giving you the ability to evaluate technical proposals and participate in architecture discussions. You will learn about key architectural patterns including monolithic vs microservices, client-server models, and distributed systems. The chapter also covers system reliability, availability, fault tolerance, and performance concepts like latency, throughput, and load balancing that are central to technical decision-making.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. System Architecture
2. Software Components
3. Client-Server Model
4. Monolithic Architecture
5. Microservices
6. Service-Oriented Architecture
7. Distributed Systems
8. Load Balancing
9. System Reliability
10. High Availability
11. Fault Tolerance
12. System Latency
13. System Throughput

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Product Management Foundations](../01-pm-foundations/index.md)
- [Chapter 2: Software Development Essentials](../02-software-development-essentials/index.md)

---

## What Is System Architecture?

**System architecture** is the high-level structure of a software system, defining how its components are organized, how they interact with each other, and how they collectively deliver the product's functionality. Think of architecture as the blueprint for your software - just as a building's architecture determines its structural integrity, capacity, and flexibility for future modifications, a software system's architecture determines its performance, scalability, and maintainability.

As a technical PM, you will not be designing system architecture yourself. However, you need to understand architectural concepts well enough to evaluate proposals from your engineering team, ask informed questions during design reviews, and appreciate how architectural decisions affect product timelines, costs, and capabilities. An architecture decision made early in a product's life can have consequences that persist for years.

Architecture decisions typically involve trade-offs across several dimensions:

- **Complexity vs. simplicity** - More sophisticated architectures handle more scenarios but are harder to build and maintain
- **Performance vs. cost** - Faster systems often require more expensive infrastructure
- **Flexibility vs. speed** - Building for future extensibility takes longer than building for today's needs
- **Consistency vs. availability** - In distributed systems, you sometimes must choose between data accuracy and system uptime

!!! note "Why Architecture Matters to PMs"
    When your engineering team says "we need to re-architect the payment service," they are describing work that may take months and produce no visible user-facing changes. Understanding architecture helps you explain to stakeholders why this investment is necessary and what risks exist if it is deferred.

## Software Components and the Client-Server Model

### Software Components

**Software components** are the discrete, self-contained building blocks that make up a software system. Each component has a defined responsibility, a clear interface for communicating with other components, and an internal implementation that can be modified without affecting the rest of the system. Well-designed components follow the principle of separation of concerns - each component does one thing well.

Common types of software components include:

- **Services** - Backend processes that handle specific business logic (user authentication, payment processing, search)
- **Databases** - Components that store and retrieve data persistently
- **Message queues** - Components that enable asynchronous communication between services
- **Caches** - Components that store frequently accessed data in fast-access memory
- **API gateways** - Components that route incoming requests to the appropriate backend service
- **Load balancers** - Components that distribute traffic across multiple instances of a service

### The Client-Server Model

The **client-server model** is the foundational architectural pattern underlying virtually all modern web and mobile applications. In this model, the system is divided into two roles: clients that request services and servers that provide them. When you open a mobile app or visit a website, your device acts as the client, sending requests over the network to servers that process those requests and return responses.

| Aspect | Client | Server |
|--------|--------|--------|
| **Role** | Initiates requests | Responds to requests |
| **Location** | User's device (browser, mobile app) | Data center or cloud |
| **Examples** | Web browser, iOS app, Android app | Web server, API server, database server |
| **Resources** | Limited by device capability | Can be scaled with more hardware |
| **State** | Temporary (session-based) | Persistent (stored in databases) |

The client-server model is important for PMs because it determines how work is distributed between the user's device and your infrastructure. Decisions about what logic runs on the client vs. the server affect performance, offline capability, security, and infrastructure costs.

#### Diagram: Client-Server Architecture
<iframe src="../../sims/client-server-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Client-Server Architecture</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, classify
Learning Objective: Students will be able to explain how the client-server model works and classify different system components as client-side or server-side.

Layout: Left-right diagram showing clients on the left communicating with servers on the right through a network layer in the middle. Multiple client types (browser, mobile, desktop) connect to multiple server types (web server, API server, database) through the network.

Interactive elements: Hover over each component to see its role and example technologies. Click on connection arrows to see example request/response data.

Color scheme: Blue for clients, green for servers, gray for network layer
Implementation: HTML/CSS/JavaScript with responsive layout
</details>

## Architectural Patterns

### Monolithic Architecture

**Monolithic architecture** is a software design pattern where the entire application is built and deployed as a single, unified unit. All functionality - user interface logic, business rules, data access, and background processing - lives in one codebase and runs as one process. When you deploy a monolith, you deploy everything at once.

Monolithic architecture is not inherently bad. For many products, especially those in the early stages of the product lifecycle, a monolith is the right choice. It is simpler to build, easier to debug, and faster to deploy than more distributed alternatives.

| Advantages | Disadvantages |
|-----------|--------------|
| Simple to develop and understand | Changes in one area can break unrelated features |
| Easy to test end-to-end | Scaling requires scaling the entire application |
| Single deployment unit | Large codebases become difficult to maintain |
| Good performance (no network calls between components) | Technology choices are locked in for the whole application |
| Ideal for small teams and early-stage products | Deployment risk increases as the application grows |

### Microservices Architecture

**Microservices** is an architectural pattern where the application is decomposed into small, independently deployable services, each responsible for a specific business capability. Each microservice has its own codebase, its own database (ideally), and can be developed, deployed, and scaled independently. Services communicate with each other through well-defined APIs, typically using HTTP/REST or message queues.

The transition from monolith to microservices is one of the most significant architectural decisions a product team can make. It affects development velocity, operational complexity, team organization, and infrastructure costs. As a technical PM, you should understand both the benefits and the considerable costs of this transition.

- **Benefits**: Independent deployment enables faster iteration on individual services; teams can choose the best technology for each service; services can be scaled independently based on demand; failure in one service does not necessarily bring down the entire system
- **Costs**: Distributed systems are inherently more complex to debug and monitor; network communication between services adds latency; data consistency across services is challenging; you need sophisticated deployment and monitoring infrastructure

!!! warning "The Microservices Trap"
    Many teams adopt microservices prematurely, before they have the operational maturity to manage the complexity. A common pattern is to start with a monolith, identify the components that need independent scaling or deployment, and extract those into microservices incrementally. Do not let "microservices" become a buzzword that drives premature architectural decisions.

### Service-Oriented Architecture

**Service-oriented architecture (SOA)** is an architectural style that predates microservices, organizing software as a collection of loosely coupled services that communicate through standardized interfaces. While microservices evolved from SOA principles, there are key differences: SOA services tend to be larger in scope, often share databases, and typically use an enterprise service bus (ESB) for communication. Microservices favor smaller, more independent services with direct communication.

For practical purposes as a technical PM, the distinction matters less than the underlying principle both patterns share: decomposing a system into modular services with well-defined boundaries and interfaces. Whether your team calls their architecture SOA or microservices, the questions you should ask are the same: What are the service boundaries? How do services communicate? How do you handle failures?

#### Diagram: Architecture Patterns Comparison
<iframe src="../../sims/architecture-patterns/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Architecture Patterns Comparison</summary>
Type: comparison-table

Bloom Level: Analyze (L4)
Bloom Verb: compare, differentiate
Learning Objective: Students will be able to compare monolithic, SOA, and microservices architectures and differentiate their trade-offs for different product scenarios.

Layout: Three-column comparison showing Monolithic, SOA, and Microservices architectures side by side with visual representations, key characteristics, best-fit scenarios, and trade-offs.

Interactive elements: Click each architecture to see a detailed case study. Hover over trade-offs to see real-world examples.

Color scheme: Blue for monolith, teal for SOA, green for microservices
Implementation: HTML/CSS/JavaScript with responsive card layout
</details>

#### Diagram: Monolith vs. Microservices Explorer

<iframe src="../../sims/monolith-vs-microservices/main.html" width="100%" height="750px" scrolling="no"></iframe>

<details markdown="1">
<summary>Monolith vs. Microservices Explorer</summary>
Type: diagram

Bloom Level: Evaluate (L5)
Bloom Verb: assess, judge
Learning Objective: Students will be able to assess which architecture pattern (monolith, modular monolith, or microservices) best fits a given set of project constraints by adjusting team size, system complexity, and expected user scale.

Layout: p5.js canvas showing a morphing architecture diagram that transitions from a single monolith block to modular monolith to independent microservices. Three sliders below control the inputs. A recommendation panel provides contextual guidance.

Interactive elements: Three sliders (team size, system complexity, expected users) drive real-time visual morphing of the architecture diagram and dynamic recommendation text.

Color scheme: Blue (#3b82f6) for monolith, teal (#14b8a6) for modular monolith, green (#22c55e) for microservices
Implementation: p5.js with HTML slider controls
</details>

## Distributed Systems

A **distributed system** is a collection of independent computers that appears to its users as a single coherent system. When your application runs across multiple servers, data centers, or cloud regions, it is a distributed system. Most modern web applications are distributed systems by necessity - no single server can handle the traffic, data, and computational requirements of a product with millions of users.

Distributed systems introduce fundamental challenges that do not exist in single-machine applications:

- **Network unreliability** - Communication between machines can fail, be delayed, or deliver messages out of order
- **Partial failures** - Some components can fail while others continue operating
- **Clock synchronization** - Different machines may disagree about the current time
- **Data consistency** - Keeping data synchronized across multiple locations is inherently difficult

Understanding these challenges helps you appreciate why some engineering tasks take longer than expected and why certain guarantees (like "the data is always perfectly consistent") may be technically impossible or prohibitively expensive in a distributed system.

## Performance: Latency and Throughput

### System Latency

**System latency** is the time elapsed between initiating a request and receiving the first byte of the response. It measures how long users wait for the system to respond to their actions. Latency is one of the most user-perceptible performance metrics - research consistently shows that even small increases in latency lead to measurable drops in user engagement, conversion rates, and satisfaction.

Latency has multiple components:

| Component | Description | Typical Range |
|-----------|------------|---------------|
| **Network latency** | Time for data to travel across the network | 1-200ms depending on distance |
| **Processing latency** | Time for the server to compute the response | 1-500ms depending on complexity |
| **Database latency** | Time to read from or write to a database | 1-100ms for indexed queries |
| **Serialization** | Time to convert data to/from transmission format | <1ms typically |
| **Queue wait time** | Time spent waiting in a processing queue | 0-1000ms+ under load |

### System Throughput

**System throughput** is the number of requests or transactions a system can process per unit of time, typically measured in requests per second (RPS) or transactions per second (TPS). While latency measures how fast a single request is handled, throughput measures how many requests the system can handle simultaneously.

Latency and throughput are related but not identical. A system can have low latency (each request is fast) but low throughput (it can only handle a few requests at once). Conversely, a system can have high throughput (handles many requests) with moderate latency per individual request.

!!! tip "The PM's Performance Conversation"
    When discussing performance with engineers, always ask about both latency and throughput. "How fast is it?" (latency) and "How many users can it handle?" (throughput) are different questions with different answers. Also ask about performance under load: "What happens to latency when we are at peak traffic?"

## Load Balancing

**Load balancing** is the practice of distributing incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. A load balancer acts as a traffic director, sitting between clients and a pool of backend servers, routing each request to the server best able to handle it.

Load balancing is essential for any product that needs to serve more users than a single server can handle. It also provides redundancy: if one server fails, the load balancer automatically routes traffic to the remaining healthy servers.

Common load balancing strategies include:

- **Round robin** - Requests are distributed to servers sequentially (Server 1, Server 2, Server 3, repeat)
- **Least connections** - Requests go to the server currently handling the fewest active connections
- **IP hash** - The client's IP address determines which server receives the request, ensuring the same user consistently reaches the same server
- **Weighted** - Servers with more capacity receive proportionally more traffic

#### Diagram: Load Balancing in Action
<iframe src="../../sims/load-balancing/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Load Balancing in Action</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: demonstrate, illustrate
Learning Objective: Students will be able to demonstrate how different load balancing strategies distribute traffic and illustrate the impact on server utilization.

Layout: Animation showing incoming requests being distributed across a pool of servers by a load balancer. Users can switch between round-robin, least-connections, and weighted strategies.

Interactive elements: Select load balancing strategy from dropdown; adjust simulated traffic volume with slider; observe server load indicators in real time.

Color scheme: Blue for load balancer, green gradient for server utilization
Implementation: HTML/CSS/JavaScript with animated request flow
</details>

## Reliability, Availability, and Fault Tolerance

### System Reliability

**System reliability** is the probability that a system will perform its intended function without failure over a specified period of time. A reliable system consistently produces correct results and behaves predictably. Reliability is built through careful engineering practices including thorough testing, code review, monitoring, and redundancy.

Reliability matters enormously for product trust. Users who experience frequent errors, data loss, or unexpected behavior lose confidence in the product and eventually leave. For technical PMs, reliability is not just an engineering metric - it is a core component of the user experience and directly affects retention, NPS, and revenue.

### High Availability

**High availability** refers to a system's ability to remain operational and accessible for a very high percentage of time, minimizing downtime whether planned (maintenance) or unplanned (failures). Availability is typically expressed as a percentage, often referred to as "nines":

| Availability | Downtime Per Year | Downtime Per Month | Common Name |
|-------------|-------------------|-------------------|-------------|
| 99% | 3.65 days | 7.3 hours | "Two nines" |
| 99.9% | 8.76 hours | 43.8 minutes | "Three nines" |
| 99.95% | 4.38 hours | 21.9 minutes | |
| 99.99% | 52.6 minutes | 4.38 minutes | "Four nines" |
| 99.999% | 5.26 minutes | 26.3 seconds | "Five nines" |

Each additional "nine" of availability requires significantly more engineering investment and operational discipline. Moving from 99.9% to 99.99% is far more expensive than moving from 99% to 99.9%. As a technical PM, you need to determine the right availability target for your product based on user expectations, contractual obligations (SLAs), and the cost of downtime versus the cost of achieving higher availability.

### Fault Tolerance

**Fault tolerance** is a system's ability to continue operating correctly even when one or more of its components fail. A fault-tolerant system is designed with the assumption that failures will happen and incorporates mechanisms to detect, isolate, and recover from them without user impact.

Fault tolerance strategies include:

- **Redundancy** - Running multiple copies of critical components so that if one fails, others continue serving
- **Failover** - Automatically switching to a backup system when the primary fails
- **Circuit breakers** - Detecting when a downstream service is failing and temporarily stopping requests to prevent cascading failures
- **Graceful degradation** - Reducing functionality rather than failing completely (showing cached data when the database is slow)
- **Health checks** - Continuously monitoring component health and removing unhealthy instances from service

!!! tip "Reliability vs. Availability vs. Fault Tolerance"
    These three concepts are related but distinct. **Reliability** means the system works correctly. **Availability** means the system is accessible when users need it. **Fault tolerance** means the system handles component failures gracefully. A system can be highly available but unreliable (it is always up but sometimes returns wrong data). A system can be reliable but not fault-tolerant (it works perfectly until a component fails, then crashes entirely).

#### Diagram: Availability & Downtime Calculator

<iframe src="../../sims/availability-calculator/main.html" width="100%" height="750px" scrolling="no"></iframe>

<details markdown="1">
<summary>Availability & Downtime Calculator</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: calculate, compare
Learning Objective: Students will be able to calculate the downtime allowed at various availability percentages and compare the engineering cost and revenue impact across tiers.

Layout: p5.js canvas with uptime/downtime bar and log-scale tier comparison chart. Two sliders control availability target (90% to 99.9999%) and revenue per hour ($1K to $1M). Downtime cards show per-year, per-month, revenue loss, and engineering cost. SLA analysis panel provides contextual guidance.

Interactive elements: Availability target slider (7 tiers), revenue per hour slider, animated bar chart, real-time metrics and SLA analysis text.

Color scheme: Red for low availability, amber/teal/green gradient for higher tiers
Implementation: p5.js with HTML slider controls
</details>

## Bringing Architecture Decisions to Product Strategy

Architecture decisions are product decisions. The choice between a monolith and microservices affects team velocity, deployment frequency, and the types of features you can build. The choice of availability targets determines infrastructure costs and on-call requirements. The choice of latency targets shapes the user experience.

As a technical PM, your role in architecture discussions is to represent the product perspective:

- **What are the user expectations?** A consumer social app needs sub-second response times; an internal analytics tool can tolerate slower queries
- **What scale do we need to support?** Architecture that works for 1,000 users may not work for 1,000,000
- **What is our tolerance for downtime?** An e-commerce checkout needs higher availability than a blog
- **How fast do we need to iterate?** If rapid experimentation is critical, the architecture must support frequent, safe deployments
- **What is our budget?** More sophisticated architectures cost more to build and operate

??? question "Self-Check: Can you answer these questions?"
    1. What is the difference between monolithic and microservices architecture? When might each be the better choice?
    2. Explain the client-server model and give an example of a product that uses it.
    3. What is the relationship between latency and throughput? Can a system have high throughput but high latency?
    4. What does "99.99% availability" mean in practical terms? How many minutes of downtime per month does it allow?
    5. Name three fault tolerance strategies and explain how each one prevents user-facing failures.

## Key Takeaways

- **System architecture** is the high-level structure defining how components are organized and interact - it shapes performance, scalability, and maintainability for years
- **Software components** are self-contained building blocks with defined responsibilities; the **client-server model** is the foundational pattern for web and mobile applications
- **Monolithic architecture** is simpler and faster to build, making it ideal for early-stage products; **microservices** enable independent scaling and deployment but add operational complexity
- **Service-oriented architecture** shares principles with microservices but predates them with larger, more loosely defined service boundaries
- **Distributed systems** introduce challenges around network reliability, partial failures, and data consistency that do not exist in single-machine applications
- **System latency** measures response time for individual requests; **system throughput** measures how many requests the system handles per unit of time
- **Load balancing** distributes traffic across multiple servers to improve throughput and provide redundancy
- **System reliability** means the system works correctly; **high availability** means it is accessible when needed; **fault tolerance** means it handles component failures gracefully
- Architecture decisions are product decisions - always evaluate them through the lens of user expectations, scale requirements, iteration speed, and budget

[See Annotated References](./references.md)
