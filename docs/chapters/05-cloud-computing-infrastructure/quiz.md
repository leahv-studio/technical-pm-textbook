# Quiz: Cloud Computing, Scaling, and Infrastructure

Test your understanding of cloud computing and infrastructure with these review questions.

---

#### 1. Which cloud service model requires the engineering team to manage the operating system, middleware, runtime, applications, and data while the provider manages only the physical hardware?

<div class="upper-alpha" markdown>
1. Infrastructure as a Service (IaaS)
2. Platform as a Service (PaaS)
3. Software as a Service (SaaS)
4. Serverless Computing
</div>

??? question "Show Answer"
    The correct answer is **A**. Infrastructure as a Service (IaaS) provides the most basic cloud resources - virtual servers, storage, and networking - while leaving all software layers to the customer. The cloud provider manages the physical hardware and virtualization, but your engineering team is responsible for the operating system, middleware, runtime, applications, and data. This gives maximum control and flexibility but also maximum operational responsibility compared to PaaS or SaaS.

    **Concept Tested:** Infrastructure as a Service

---

#### 2. A product team uses Salesforce for their CRM and Slack for team communication. What cloud service model do these tools represent?

<div class="upper-alpha" markdown>
1. Infrastructure as a Service (IaaS)
2. Software as a Service (SaaS)
3. Platform as a Service (PaaS)
4. Serverless Computing
</div>

??? question "Show Answer"
    The correct answer is **B**. Software as a Service (SaaS) is the fully managed model where the provider delivers a complete application over the internet. Users access SaaS applications through a web browser or API without installing, maintaining, or managing any infrastructure. Salesforce and Slack are both classic SaaS examples where the customer manages nothing on the infrastructure side and simply uses the application as delivered.

    **Concept Tested:** Software as a Service

---

#### 3. What is the primary problem that containerization solves in software deployment?

<div class="upper-alpha" markdown>
1. Reducing the cost of cloud computing infrastructure
2. Enabling applications to auto-scale based on user demand
3. Ensuring applications behave identically across different environments
4. Providing built-in security for all application dependencies
</div>

??? question "Show Answer"
    The correct answer is **C**. Containerization packages an application together with all its dependencies - code, runtime, libraries, and system tools - into a single, portable unit called a container. This solves the classic "it works on my machine" problem by ensuring the application behaves identically regardless of where it is deployed, whether on a developer's laptop, a test server, or production infrastructure. While containers support scaling and may reduce costs, their primary purpose is deployment consistency.

    **Concept Tested:** Containerization

---

#### 4. Your product is experiencing slow performance during peak hours. An engineer proposes upgrading the server from 16 GB to 64 GB of RAM and switching to a faster CPU. What scaling strategy is this?

<div class="upper-alpha" markdown>
1. Horizontal scaling
2. Distributed scaling
3. Elastic scaling
4. Vertical scaling
</div>

??? question "Show Answer"
    The correct answer is **D**. Vertical scaling (also called "scaling up") means increasing the capacity of a single machine by adding more CPU, memory, storage, or network bandwidth. Upgrading from 16 GB to 64 GB of RAM on the same server is the textbook example of vertical scaling. It is the simplest approach since it requires no code changes or distributed system complexity, but it has limitations: a physical hardware ceiling, potential downtime during upgrades, and a single point of failure.

    **Concept Tested:** Vertical Scaling

---

#### 5. Your team is evaluating serverless computing for a new feature that processes uploaded images. Which characteristic makes serverless well-suited for this use case?

<div class="upper-alpha" markdown>
1. Serverless functions execute in response to events and auto-scale from zero
2. Serverless eliminates the need for any backend servers entirely
3. Serverless provides hardware-level isolation between processes
4. Serverless guarantees unlimited execution time for long-running tasks
</div>

??? question "Show Answer"
    The correct answer is **A**. Serverless computing is event-driven, meaning functions execute in response to triggers such as file uploads, API calls, or database changes. When an image is uploaded, a serverless function can be triggered to process it, and the platform automatically scales from zero to thousands of concurrent executions based on demand. Despite its name, servers still exist - you just do not manage them. Serverless functions have execution time limits (typically 15 minutes), so option D is incorrect.

    **Concept Tested:** Serverless Computing

---

#### 6. In the Docker workflow, what is the correct relationship between a Dockerfile, an image, and a container?

<div class="upper-alpha" markdown>
1. A container is built from a Dockerfile, which creates an image when deployed
2. An image is written by engineers, compiled into a Dockerfile, then run as a container
3. A Dockerfile contains instructions for building an image, and a container is a running instance of that image
4. A Dockerfile runs inside a container, which produces an image for deployment
</div>

??? question "Show Answer"
    The correct answer is **C**. Docker uses a three-step workflow: a Dockerfile is a text file containing instructions for building a container image (specifying the OS base, software to install, and code to include). An image is a read-only template created from the Dockerfile, like a blueprint or snapshot. A container is a running instance of an image, like a process started from that blueprint. Understanding this build-ship-run sequence helps PMs follow engineering conversations about deployment pipelines.

    **Concept Tested:** Docker Overview

---

#### 7. A technical PM is reviewing infrastructure costs and notices the monthly cloud bill has increased significantly. The team recently added auto-scaling, and traffic has grown 3x. Which scaling strategy most likely explains the predictable, linear cost increase?

<div class="upper-alpha" markdown>
1. Vertical scaling, because bigger machines cost proportionally more
2. Horizontal scaling, because adding more commodity machines scales cost linearly
3. Serverless scaling, because functions are billed per hour of uptime
4. Vertical scaling, because hardware upgrades follow a linear pricing model
</div>

??? question "Show Answer"
    The correct answer is **B**. Horizontal scaling adds more machines to distribute workload, and its cost curve is linear and predictable - each additional machine costs roughly the same. The chapter specifically notes that vertical scaling has a non-linear cost curve, where a server with twice the CPU often costs more than twice as much. Horizontal scaling with auto-scaling is the approach used by virtually all large-scale web applications precisely because it offers predictable cost growth alongside virtually unlimited capacity.

    **Concept Tested:** Horizontal Scaling

---

#### 8. A user in Tokyo is accessing your product hosted in Virginia. After implementing a CDN, their page load time drops from 400ms to 15ms. What is the primary reason for this improvement?

<div class="upper-alpha" markdown>
1. The CDN compresses all data to reduce file sizes before transmission
2. The CDN serves cached content from an edge server geographically close to the user
3. The CDN upgrades the network protocol to a faster standard
4. The CDN redirects the user to a mirror copy of the entire backend in Tokyo
</div>

??? question "Show Answer"
    The correct answer is **B**. A content delivery network is a geographically distributed network of servers that delivers content from the server closest to the user's physical location. Without a CDN, the Tokyo user's requests must travel across the Pacific Ocean to Virginia and back, adding hundreds of milliseconds of latency. With a CDN, static content is cached at an edge server in Tokyo, reducing latency from hundreds of milliseconds to single-digit milliseconds. The CDN does not replicate the entire backend; it caches static assets at edge locations.

    **Concept Tested:** Content Delivery Network

---

#### 9. Your engineering team needs to manage 200 containers running across 50 machines, handling automatic restarts when containers fail, scaling based on traffic, and deploying updates without downtime. Which technology is designed specifically to solve these orchestration challenges?

<div class="upper-alpha" markdown>
1. Docker
2. A content delivery network
3. Platform as a Service
4. Kubernetes
</div>

??? question "Show Answer"
    The correct answer is **D**. Kubernetes (K8s) is an open-source platform for automating the deployment, scaling, and management of containerized applications across many machines. While Docker packages individual applications into containers, Kubernetes orchestrates those containers at scale - handling scheduling, auto-scaling, self-healing (restarting failed containers), service discovery, and rolling updates without downtime. These are precisely the orchestration challenges described in the scenario.

    **Concept Tested:** Kubernetes Overview

---

#### 10. An engineer tells you the system's cache hit rate is 45% and recommends improving caching strategy. Analyze this situation: why would a low cache hit rate be a concern for your product's performance?

<div class="upper-alpha" markdown>
1. A low cache hit rate means the cache is storing too much data and consuming excessive memory
2. A low cache hit rate indicates the CDN edge servers are misconfigured and serving stale content
3. A low cache hit rate means the application is scaling vertically instead of horizontally
4. A low cache hit rate means most requests bypass the fast cache and hit the slower backend systems, increasing response times
</div>

??? question "Show Answer"
    The correct answer is **D**. A cache hit rate represents the percentage of requests served from the fast cache versus the slower backend. At 45%, more than half of all requests are going to the backend database or compute layer instead of being served from the cache, which is dramatically faster. This means users experience slower response times on the majority of requests. The chapter emphasizes that caching is one of the most effective performance optimization techniques - storing frequently accessed data in a fast-access layer to reduce backend load and improve response times.

    **Concept Tested:** Caching Strategies
