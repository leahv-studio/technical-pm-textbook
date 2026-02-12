# Quiz: System Architecture Fundamentals

Test your understanding of system architecture with these review questions.

---

#### 1. What is the primary role of system architecture in software development?

<div class="upper-alpha" markdown>
1. Writing the code that implements business logic
2. Defining the high-level structure of how components are organized and interact
3. Managing the day-to-day deployment schedule for engineering teams
4. Selecting the programming language used by the development team
</div>

??? question "Show Answer"
    The correct answer is **B**. System architecture is the high-level structure of a software system, defining how its components are organized, how they interact with each other, and how they collectively deliver the product's functionality. The chapter compares it to a building's blueprint, which determines structural integrity, capacity, and flexibility for future modifications. It is not about writing code or choosing languages, but about the structural decisions that shape performance, scalability, and maintainability for years.

    **Concept Tested:** System Architecture

---

#### 2. In the client-server model, which of the following is a characteristic of the server?

<div class="upper-alpha" markdown>
1. It runs exclusively on the user's mobile device
2. Its resources are limited by device capability
3. It initiates requests to other systems
4. It stores state persistently in databases
</div>

??? question "Show Answer"
    The correct answer is **D**. According to the chapter's comparison table for the client-server model, servers respond to requests (they do not initiate them), reside in data centers or the cloud (not on user devices), and maintain persistent state stored in databases. Clients are the ones with resources limited by device capability and temporary session-based state. Understanding which responsibilities belong to the client versus the server helps PMs reason about performance, offline capability, and infrastructure costs.

    **Concept Tested:** Client-Server Model

---

#### 3. Which of the following is listed in the chapter as an advantage of monolithic architecture?

<div class="upper-alpha" markdown>
1. Good performance because there are no network calls between components
2. Each component can use a different programming language
3. Failures in one area are automatically isolated from other areas
4. Individual features can be deployed independently
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter's advantages table for monolithic architecture explicitly lists "good performance (no network calls between components)" as a benefit. The other options describe characteristics of microservices, not monoliths. In a monolith, all functionality runs as a single process, which eliminates the network latency overhead that exists when services communicate across a network. This makes monolithic architecture simpler and faster for early-stage products and small teams.

    **Concept Tested:** Monolithic Architecture

---

#### 4. A startup with a small engineering team is building its first product and needs to ship quickly. Based on the chapter's guidance, which architectural approach is most appropriate?

<div class="upper-alpha" markdown>
1. Microservices architecture to ensure future scalability from day one
2. A distributed system spanning multiple cloud regions
3. Monolithic architecture for simplicity and speed of development
4. Service-oriented architecture with an enterprise service bus
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter explicitly states that monolithic architecture is "ideal for small teams and early-stage products" because it is simpler to develop, easier to test, and faster to deploy. It also includes a warning about "The Microservices Trap," cautioning that many teams adopt microservices prematurely before they have the operational maturity to manage the complexity. The recommended pattern is to start with a monolith and extract microservices incrementally as specific needs arise.

    **Concept Tested:** Monolithic Architecture

---

#### 5. What is the key difference between microservices and service-oriented architecture (SOA) as described in the chapter?

<div class="upper-alpha" markdown>
1. SOA does not use services, while microservices does
2. Microservices favor smaller, more independent services with direct communication, while SOA services tend to be larger and often use an enterprise service bus
3. SOA is designed for cloud environments, while microservices is designed for on-premise servers
4. Microservices always require shared databases, while SOA uses separate databases per service
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explains that while microservices evolved from SOA principles, there are key differences: SOA services tend to be larger in scope, often share databases, and typically use an enterprise service bus (ESB) for communication. Microservices favor smaller, more independent services with direct communication and ideally have their own databases. Both patterns share the underlying principle of decomposing systems into modular services with well-defined boundaries and interfaces.

    **Concept Tested:** Service-Oriented Architecture

---

#### 6. Your product team is experiencing slow page loads during peak traffic hours. The engineering team proposes adding a load balancer. Which load balancing strategy would route each request to the server currently handling the fewest active connections?

<div class="upper-alpha" markdown>
1. Round robin
2. IP hash
3. Weighted
4. Least connections
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter describes four common load balancing strategies. Least connections routes requests to the server currently handling the fewest active connections, making it well-suited for peak traffic scenarios where some requests take longer than others. Round robin distributes requests sequentially regardless of current load. IP hash routes based on the client's IP address. Weighted distribution sends proportionally more traffic to servers with greater capacity.

    **Concept Tested:** Load Balancing

---

#### 7. A system has an availability target of 99.99%. According to the chapter, how much downtime per month does this allow?

<div class="upper-alpha" markdown>
1. 7.3 hours
2. 43.8 minutes
3. 26.3 seconds
4. 4.38 minutes
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter's availability table shows that 99.99% availability (known as "four nines") allows only 4.38 minutes of downtime per month, or 52.6 minutes per year. By contrast, 99.9% ("three nines") allows 43.8 minutes per month, 99% allows 7.3 hours per month, and 99.999% ("five nines") allows only 26.3 seconds per month. Each additional nine requires significantly more engineering investment to achieve.

    **Concept Tested:** High Availability

---

#### 8. Your engineering team tells you that a downstream payment service is experiencing intermittent failures, and they want to implement a mechanism that temporarily stops sending requests to it to prevent cascading failures across the system. Which fault tolerance strategy are they describing?

<div class="upper-alpha" markdown>
1. Redundancy
2. Health checks
3. Circuit breakers
4. Failover
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter defines circuit breakers as a fault tolerance strategy that detects when a downstream service is failing and temporarily stops requests to prevent cascading failures. This is distinct from redundancy (running multiple copies of components), failover (switching to a backup system), and health checks (continuously monitoring component health). Circuit breakers are particularly important in microservices architectures where one failing service can trigger a chain reaction across dependent services.

    **Concept Tested:** Fault Tolerance

---

#### 9. The chapter states that "a system can be highly available but unreliable." Which scenario best illustrates this distinction?

<div class="upper-alpha" markdown>
1. A system that is always accessible but sometimes returns incorrect data to users
2. A system that crashes completely whenever any single component fails
3. A system that processes each request slowly but handles many requests simultaneously
4. A system that works perfectly but is only accessible during business hours
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter explicitly distinguishes between reliability, availability, and fault tolerance: reliability means the system works correctly, availability means the system is accessible when users need it, and fault tolerance means the system handles failures gracefully. A system that is always up (high availability) but sometimes returns wrong data (low reliability) demonstrates how these properties are independent. Option D would describe high reliability with low availability, which is the reverse scenario.

    **Concept Tested:** System Reliability

---

#### 10. An engineering team is evaluating whether to decompose their monolith into microservices. Based on the chapter's discussion of distributed systems challenges, which of the following is a challenge they should expect to encounter after the migration?

<div class="upper-alpha" markdown>
1. Elimination of all data consistency concerns through service isolation
2. Network communication between services adding latency and potential failures
3. Reduced infrastructure costs due to independent scaling
4. Simplified debugging because each service has a smaller codebase
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter identifies several fundamental challenges of distributed systems that do not exist in single-machine applications, including network unreliability (communication can fail, be delayed, or deliver messages out of order) and data consistency difficulties. The microservices section reinforces this by listing "network communication between services adds latency" and "data consistency across services is challenging" as costs. Options A, C, and D represent common misconceptions that oversimplify the trade-offs involved in a microservices migration.

    **Concept Tested:** Distributed Systems
