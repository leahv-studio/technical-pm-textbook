---
title: APIs and Integrations
description: How software systems communicate through APIs, including REST, GraphQL, authentication, data formats, testing, and third-party integrations
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# APIs and Integrations

## Summary

This chapter provides a comprehensive introduction to APIs - the connective tissue of modern software products. You will learn about REST APIs and GraphQL, understand HTTP methods, endpoints, authentication, and rate limiting, and explore data serialization formats like JSON and XML. The chapter also covers API documentation, testing with tools like Postman, webhooks, third-party integrations, SDKs, and API gateways - all essential knowledge for PMs who manage products with integrations.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. API Fundamentals
2. REST API
3. GraphQL Overview
4. API Endpoints
5. HTTP Methods
6. API Authentication
7. API Rate Limiting
8. API Versioning
9. API Documentation
10. Webhooks
11. Third-Party Integrations
12. API Gateway
13. Middleware
14. Data Serialization
15. JSON Format
16. XML Format
17. SDK Overview
18. API Testing
19. Postman Tool
20. API Error Handling

## Prerequisites

This chapter builds on concepts from:

- [Chapter 2: Software Development Essentials](../02-software-development-essentials/index.md)
- [Chapter 3: Technical Documentation and Requirements](../03-technical-documentation/index.md)
- [Chapter 4: System Architecture Fundamentals](../04-system-architecture/index.md)

---

## What Is an API?

**API fundamentals** encompass the core principles of Application Programming Interfaces - standardized contracts that define how separate software systems communicate with each other. An API specifies what requests a system accepts, what data it expects, and what responses it returns. If you think of a restaurant, the API is the menu: it tells you what you can order, what information you need to provide (table number, modifications), and what you will get back. The kitchen (backend system) handles the actual work, but you interact only through the menu.

As a technical PM, APIs are arguably the most important technical concept you will encounter. Nearly every modern product either exposes an API for others to use, consumes APIs from third-party services, or both. When your payment system talks to Stripe, when your analytics dashboard pulls data from Mixpanel, when your mobile app loads user profiles from your backend - all of these interactions happen through APIs.

Understanding APIs transforms your ability to evaluate integration partnerships, estimate engineering effort for new features, and communicate with developers about system design. The rest of this chapter builds your vocabulary and mental models for working confidently with API-driven architectures.

!!! info "Why APIs Matter for PMs"
    A 2024 survey by Postman found that over 75% of organizations consider APIs critical to their business strategy. For technical PMs, API literacy is not optional - it is the language in which modern product capabilities are negotiated, built, and delivered.

## REST APIs: The Dominant Pattern

A **REST API** (Representational State Transfer) is the most widely adopted architectural style for building web APIs. REST treats every piece of data as a "resource" identified by a unique URL, and uses standard HTTP methods to perform operations on those resources. REST popularity stems from its simplicity, predictability, and alignment with how the web already works.

REST APIs follow several key principles:

- **Stateless** - Each request contains all the information the server needs to process it; the server does not remember previous requests
- **Resource-based** - Everything is a resource (a user, an order, a product) with a unique URL
- **Standard methods** - Operations use HTTP methods (GET, POST, PUT, DELETE) with consistent meanings
- **Uniform interface** - All resources follow the same patterns, making the API predictable

### API Endpoints

An **API endpoint** is a specific URL that represents a resource or collection of resources in an API. Endpoints are the addressable locations where your application sends requests. Well-designed endpoints follow a consistent, hierarchical naming convention that makes the API intuitive to use.

Here are examples of typical REST API endpoints for a product management tool:

| Endpoint | Purpose | Example |
|----------|---------|---------|
| `GET /api/v1/products` | List all products | Retrieve the product catalog |
| `GET /api/v1/products/42` | Get a specific product | Fetch details for product #42 |
| `POST /api/v1/products` | Create a new product | Add a new product to the catalog |
| `PUT /api/v1/products/42` | Update a product | Modify product #42 details |
| `DELETE /api/v1/products/42` | Remove a product | Delete product #42 |
| `GET /api/v1/products/42/reviews` | List product reviews | Get all reviews for product #42 |

Notice the pattern: the URL identifies the resource, and the HTTP method specifies the action. This predictability is one of REST greatest strengths.

### HTTP Methods

**HTTP methods** (also called HTTP verbs) are the standardized operations that clients use to interact with API resources. Each method has a specific semantic meaning that both the client and server agree upon. Understanding these methods helps you read API documentation, evaluate integration complexity, and discuss system behavior with engineers.

The four primary HTTP methods map cleanly to database operations (CRUD):

| HTTP Method | Purpose | CRUD Operation | Idempotent? | Example |
|-------------|---------|---------------|-------------|---------|
| **GET** | Retrieve data | Read | Yes | Fetch a user profile |
| **POST** | Create new data | Create | No | Submit a new order |
| **PUT** | Replace existing data | Update | Yes | Update a user address |
| **DELETE** | Remove data | Delete | Yes | Cancel a subscription |

!!! tip "Idempotency: A Concept Engineers Love to Discuss"
    An **idempotent** operation produces the same result whether you execute it once or multiple times. GET, PUT, and DELETE are idempotent - fetching, updating, or deleting the same resource repeatedly has the same effect. POST is not idempotent - submitting an order twice creates two orders. This distinction matters for retry logic and error recovery.

## GraphQL: An Alternative Approach

A **GraphQL overview** reveals a query language for APIs developed by Facebook (now Meta) in 2015 as an alternative to REST. While REST returns fixed data structures for each endpoint, GraphQL lets the client specify exactly what data it needs in a single request. This solves two common REST problems: over-fetching (getting more data than you need) and under-fetching (needing multiple requests to assemble the data you want).

Consider a mobile app that needs to display a user name and their three most recent orders. With REST, you might need two separate API calls - one for the user profile and one for the orders. With GraphQL, you send a single query requesting exactly those fields.

| Dimension | REST | GraphQL |
|-----------|------|---------|
| Data fetching | Fixed responses per endpoint | Client specifies exact fields needed |
| Number of requests | Multiple endpoints for related data | Single endpoint, single request |
| Over-fetching | Common (full resource returned) | Eliminated (only requested fields) |
| Caching | Simple (HTTP caching by URL) | More complex (query-level caching) |
| Learning curve | Lower (standard HTTP conventions) | Higher (query language to learn) |
| Best for | Simple CRUD operations, public APIs | Complex data relationships, mobile apps |

!!! note "PM Decision: REST vs. GraphQL"
    Most teams do not need to choose one or the other exclusively. A common pattern is to use REST for public-facing APIs (simpler for external developers) and GraphQL for internal APIs powering frontend applications (optimized for specific UI needs). Your engineering team familiarity with each technology should factor into the decision.

## Data Serialization and Formats

**Data serialization** is the process of converting structured data into a format that can be transmitted between systems and then reconstructed on the receiving end. When your frontend sends user data to the backend, or when your system calls a partner API, the data must be serialized into a text format that both sides understand. The two dominant formats are JSON and XML.

### JSON Format

**JSON (JavaScript Object Notation)** is the most widely used data serialization format for modern APIs. JSON represents data as key-value pairs and arrays using a lightweight, human-readable syntax. Despite its name referencing JavaScript, JSON is language-independent and supported by virtually every programming language and platform.

Here is an example of a product represented in JSON:

```json
{
  "id": 42,
  "name": "Analytics Dashboard Pro",
  "status": "active",
  "pricing": {
    "monthly": 49.99,
    "annual": 499.99
  },
  "features": ["real-time data", "custom reports", "API access"],
  "created_at": "2025-08-15T10:30:00Z"
}
```

JSON advantages include readability, compact size, and native support in web browsers. As a PM, you will encounter JSON in API documentation, webhook payloads, configuration files, and analytics exports.

### XML Format

**XML (Extensible Markup Language)** is an older data serialization format that uses tags (similar to HTML) to structure data. While JSON has largely replaced XML for new APIs, XML remains prevalent in enterprise systems, financial services, healthcare (HL7/FHIR), and government integrations. You will encounter XML when working with legacy systems or industry-specific standards.

The same product in XML:

```xml
<product>
  <id>42</id>
  <name>Analytics Dashboard Pro</name>
  <status>active</status>
  <pricing>
    <monthly>49.99</monthly>
    <annual>499.99</annual>
  </pricing>
  <features>
    <feature>real-time data</feature>
    <feature>custom reports</feature>
    <feature>API access</feature>
  </features>
</product>
```

| Characteristic | JSON | XML |
|---------------|------|-----|
| Readability | High (clean syntax) | Moderate (verbose tags) |
| File size | Smaller | Larger (tag overhead) |
| Data types | Strings, numbers, booleans, arrays, objects | Everything is text (types via schema) |
| Schema validation | JSON Schema (optional) | XSD (mature, widely used) |
| Modern API usage | Dominant (95%+ of new APIs) | Legacy and enterprise systems |
| Browser support | Native (JSON.parse) | Requires parsing libraries |

## Securing APIs

### API Authentication

**API authentication** is the process of verifying the identity of a client making an API request. Just as you need credentials to log into a website, applications need credentials to access APIs. Authentication answers the question: "Who is making this request?" Different authentication methods offer different trade-offs between security, complexity, and developer experience.

Common API authentication methods:

- **API Keys** - A unique string included in request headers or query parameters. Simple to implement but limited in security (keys can be leaked or shared)
- **OAuth 2.0** - An industry-standard protocol that grants limited access tokens without exposing user credentials. Used by Google, Facebook, GitHub, and most major platforms
- **JWT (JSON Web Tokens)** - Self-contained tokens that encode user identity and permissions. Popular for stateless authentication between microservices
- **Basic Authentication** - Username and password encoded in request headers. Simple but least secure; should only be used over HTTPS

!!! warning "API Key Security"
    API keys should never be embedded in frontend code, committed to public repositories, or shared in documentation. As a PM, ensure your team follows security best practices: store keys in environment variables, rotate them regularly, and use different keys for development and production environments.

### API Rate Limiting

**API rate limiting** is a mechanism that restricts the number of API requests a client can make within a specified time period. Rate limits protect APIs from abuse, ensure fair usage across all consumers, and prevent a single misbehaving client from overwhelming the system. Rate limits are typically expressed as requests per time unit (e.g., 1,000 requests per minute).

Rate limiting affects product decisions in several ways:

| Scenario | Impact | PM Response |
|----------|--------|-------------|
| Your API serves external developers | Rate limits affect developer experience | Set generous limits; provide clear documentation; offer paid tiers with higher limits |
| You consume a third-party API | Their rate limits constrain your features | Design caching strategies; implement queuing; negotiate higher limits |
| Internal service-to-service | Limits prevent cascade failures | Work with engineering on circuit breakers and graceful degradation |
| Sudden traffic spikes | Users hit rate limits unexpectedly | Implement retry logic with backoff; alert monitoring for limit events |

## API Versioning and Documentation

### API Versioning

**API versioning** is the practice of maintaining multiple versions of an API simultaneously so that existing consumers are not broken when changes are introduced. APIs are contracts - when external developers or partner systems build integrations against your API, changing that contract without warning can cause their systems to fail. Versioning provides a migration path.

Common versioning strategies include:

- **URL versioning** - `/api/v1/products` vs. `/api/v2/products` (most common, most visible)
- **Header versioning** - Client specifies version in request headers (cleaner URLs, less discoverable)
- **Query parameter versioning** - `/api/products?version=2` (simple but can be overlooked)

A key PM decision is the deprecation policy: how long do you support old versions? The answer depends on how many consumers use each version, the cost of maintaining multiple versions, and contractual obligations. A typical policy provides 12-18 months of notice before sunsetting a version.

### API Documentation

**API documentation** is the technical reference material that explains how to use an API, including available endpoints, required parameters, authentication methods, response formats, error codes, and example requests. Great API documentation is the single most important factor in developer adoption of your API. If developers cannot figure out how to use your API in under 30 minutes, they will choose a competitor.

Effective API documentation includes:

- **Getting started guide** - A quick-start tutorial that gets developers to a working integration in minutes
- **Authentication guide** - Clear instructions for obtaining and using credentials
- **Endpoint reference** - Complete listing of all endpoints with parameters, response schemas, and examples
- **Code samples** - Working examples in popular programming languages
- **Error reference** - Every possible error code with explanations and remediation steps
- **Changelog** - History of changes, new features, deprecations, and breaking changes

#### Diagram: API Request-Response Lifecycle
<iframe src="../../sims/api-request-response/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>API Request-Response Lifecycle</summary>
Type: workflow

Bloom Level: Understand (L2)
Bloom Verb: explain, trace
Learning Objective: Students will be able to trace the complete lifecycle of an API request from client to server and back, identifying each component involved.

Layout: Horizontal sequence diagram showing a client application on the left and a server on the right, with the request flowing left-to-right and the response flowing right-to-left.

Components (left to right):
1. Client Application (blue box): Constructs the request with method, endpoint, headers, authentication, and body
2. API Gateway (yellow box): Receives request, validates API key, checks rate limits, routes to correct service
3. Middleware (gray box): Processes request through logging, authentication verification, input validation
4. Application Logic (green box): Executes business logic, queries database, constructs response
5. Response (flows right to left): Status code, headers, response body (JSON/XML)

Color scheme: Blue (client), yellow (gateway), gray (middleware), green (server)
Implementation: HTML/CSS/JavaScript with responsive horizontal layout
</details>

## Event-Driven Communication

### Webhooks

**Webhooks** are automated HTTP callbacks that notify your system when a specific event occurs in an external system. Unlike standard API calls where your system asks "has anything changed?" (polling), webhooks push notifications to your system the moment something happens. This inversion of the communication pattern - from pull to push - is more efficient and provides near-real-time data.

Consider a payment processing example. Without webhooks, your system would need to check Stripe every few seconds asking "did the payment go through yet?" With webhooks, Stripe sends your system a notification the instant the payment succeeds or fails. This reduces unnecessary API calls and delivers faster user experiences.

Common webhook use cases for product teams:

- **Payment events** - Charge succeeded, subscription renewed, payment failed
- **CI/CD notifications** - Build completed, deployment succeeded, tests failed
- **CRM updates** - New lead created, deal stage changed, contact updated
- **Communication tools** - Message received, channel created, user mentioned
- **Monitoring alerts** - Error threshold exceeded, server down, performance degraded

!!! tip "Webhook Reliability"
    Webhooks can fail due to network issues, server downtime, or bugs. Well-designed webhook implementations include retry logic (resend if the receiving server does not respond), idempotency keys (prevent duplicate processing), and dead letter queues (store failed webhooks for later replay). Ask your engineers about these patterns when evaluating webhook-based integrations.

## Integration Architecture

### Third-Party Integrations

**Third-party integrations** are connections between your product and external services that extend your product capabilities without building everything from scratch. Integrations are a strategic lever for product growth - they increase your product value by connecting it to the tools your users already rely on. A project management tool that integrates with Slack, GitHub, and Jira is more valuable than one that stands alone.

Integration strategy is a core PM responsibility. You must evaluate:

- **Build vs. buy** - Should we build this capability or integrate with a specialist?
- **Partnership tiers** - Which integrations are strategic (deep, co-marketed) vs. tactical (basic data sync)?
- **Maintenance burden** - Each integration requires ongoing maintenance as partner APIs change
- **User demand** - Which integrations do customers request most frequently?

### API Gateway

An **API gateway** is a server that acts as the single entry point for all API requests, sitting between external clients and your internal services. The gateway handles cross-cutting concerns - authentication, rate limiting, request routing, logging, and response transformation - so that individual services do not have to implement these capabilities themselves.

For PMs managing products with multiple backend services (microservices architecture), the API gateway is critical infrastructure. It provides:

- **Unified entry point** - External developers interact with one domain, even if requests route to different internal services
- **Security enforcement** - Authentication and authorization happen at the gateway before requests reach services
- **Traffic management** - Rate limiting, load balancing, and request throttling
- **Analytics** - Centralized logging of all API traffic for usage analysis and debugging
- **Version management** - Route requests to different service versions based on API version

### Middleware

**Middleware** is software that sits between the incoming request and the application logic, processing or transforming the request at each step. Middleware components form a pipeline - each one performs a specific function (logging, authentication, input validation, error handling) before passing the request to the next component. Think of middleware as a series of checkpoints that a request passes through before reaching its destination.

Common middleware functions include:

- **Authentication middleware** - Verifies the caller identity before the request proceeds
- **Logging middleware** - Records request details for debugging and analytics
- **Validation middleware** - Checks that the request body contains required fields in the correct format
- **CORS middleware** - Manages cross-origin resource sharing policies for browser-based clients
- **Compression middleware** - Compresses responses to reduce bandwidth usage

#### Diagram: API Gateway and Middleware Architecture
<iframe src="../../sims/api-gateway-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>API Gateway and Middleware Architecture</summary>
Type: diagram

Bloom Level: Analyze (L4)
Bloom Verb: differentiate, organize
Learning Objective: Students will be able to differentiate the roles of API gateway, middleware, and application logic in processing an API request.

Layout: Left-to-right flow diagram showing external clients on the left, API gateway in the center, and multiple backend services on the right.

Components:
1. External Clients (left column, blue icons): Mobile App, Web App, Partner System, Third-Party Developer
2. API Gateway (center, large yellow box): Authentication, Rate Limiting, Request Routing, Logging, Load Balancing
3. Middleware Pipeline (gray boxes): Validation, Transformation, Caching
4. Backend Services (right column, green boxes): User Service, Order Service, Payment Service, Analytics Service

Color scheme: Blue (clients), yellow (gateway), gray (middleware), green (services)
Implementation: HTML/CSS/JavaScript with responsive flow diagram
</details>

## Developer Tools and SDKs

### SDK Overview

An **SDK (Software Development Kit)** is a collection of pre-built code libraries, tools, documentation, and examples that make it easier for developers to integrate with your API. While an API defines the raw interface, an SDK wraps that interface in convenient, language-specific packages that handle low-level details like authentication, request construction, error handling, and retry logic.

The distinction between APIs and SDKs is important for PMs:

| Aspect | API | SDK |
|--------|-----|-----|
| What it is | A contract defining how systems communicate | A toolkit for building against the API |
| Analogy | A set of LEGO instructions | A pre-assembled LEGO kit with helper tools |
| Language | Language-agnostic (HTTP-based) | Language-specific (Python SDK, Java SDK, etc.) |
| Maintenance | One API to maintain | Multiple SDKs (one per language) |
| Developer effort | Higher (build requests manually) | Lower (call pre-built functions) |
| Time to first integration | Longer | Shorter |

Offering SDKs in popular languages (Python, JavaScript, Java, Ruby, Go) significantly reduces the barrier to integration and improves developer experience. However, each SDK must be kept in sync with the API, which multiplies maintenance work. The PM decision is which languages to support based on your developer audience.

### API Testing

**API testing** is the practice of verifying that an API behaves correctly, returns expected responses, handles errors gracefully, and meets performance requirements. Unlike UI testing where you click through a user interface, API testing sends requests directly to endpoints and validates the responses. API testing catches bugs earlier in the development cycle and is faster and more reliable than UI-based testing.

API testing covers several dimensions:

- **Functional testing** - Does the endpoint return the correct data for valid requests?
- **Error handling testing** - Does the API return appropriate error codes and messages for invalid requests?
- **Authentication testing** - Are unauthenticated or unauthorized requests properly rejected?
- **Performance testing** - Does the API respond within acceptable latency under expected load?
- **Contract testing** - Does the API response match the documented schema?

### Postman Tool

**Postman** is the most widely used tool for API development and testing, providing a graphical interface for constructing, sending, and analyzing API requests without writing code. For technical PMs, Postman is invaluable for exploring APIs, verifying integration behavior, and reproducing issues reported by developers or customers.

Postman enables you to:

- **Explore APIs visually** - Build requests by filling in fields rather than writing code
- **Save and organize requests** - Create collections of API calls grouped by feature or workflow
- **Set up environments** - Switch between development, staging, and production configurations
- **Automate test sequences** - Chain requests together to simulate user workflows
- **Share with teams** - Collaborate on API collections with engineers and QA

!!! tip "Postman for PMs: A Practical Skill"
    Learning to use Postman is one of the highest-leverage technical skills a PM can develop. In under an hour, you can learn to send GET requests to your product API, inspect the response data, and understand what your backend actually returns. This ability to see the data yourself eliminates back-and-forth with engineers for basic questions.

### API Error Handling

**API error handling** defines how an API communicates failures to the client, including what went wrong, why, and what the client can do about it. Well-designed error handling uses standard HTTP status codes, provides clear error messages, and includes enough detail for developers to diagnose and fix issues without contacting support.

Standard HTTP status codes are grouped by category:

| Status Code Range | Category | Common Codes | Meaning |
|-------------------|----------|-------------|---------|
| 2xx | Success | 200 OK, 201 Created, 204 No Content | Request succeeded |
| 3xx | Redirection | 301 Moved, 304 Not Modified | Resource location changed |
| 4xx | Client Error | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests | Problem with the request |
| 5xx | Server Error | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable | Problem on the server side |

A well-structured error response includes:

```json
{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "The email field must be a valid email address",
    "field": "email",
    "documentation_url": "https://api.example.com/docs/errors#INVALID_PARAMETER"
  }
}
```

For PMs, error handling quality directly affects developer experience and integration success rates. APIs that return cryptic "500 Internal Server Error" messages with no detail frustrate developers and generate support tickets. APIs that return specific, actionable error messages help developers self-serve.

#### Diagram: API Error Handling Decision Tree
<iframe src="../../sims/api-error-handling-tree/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>API Error Handling Decision Tree</summary>
Type: diagram

Bloom Level: Apply (L3)
Bloom Verb: classify, implement
Learning Objective: Students will be able to classify API errors by their HTTP status code category and implement appropriate error handling strategies for each type.

Layout: Top-down decision tree starting from "API Request Sent" and branching into success and failure paths with status code categories (2xx, 3xx, 4xx, 5xx) and recommended actions for each.

Color scheme: Green (success), yellow (redirect), orange (client error), red (server error)
Implementation: HTML/CSS/JavaScript with responsive tree layout
</details>

## Putting It All Together: Integration Strategy for PMs

Understanding APIs is not just about technical vocabulary - it is about making better product decisions. Every integration your product supports, every partner API you consume, and every endpoint you expose to developers is a strategic choice with technical, business, and user experience implications.

Here is a practical framework for evaluating API-related decisions:

| Decision Area | Key Questions | Who to Involve |
|---------------|--------------|----------------|
| New integration request | How many customers request it? What is the revenue impact? | PM, Engineering Lead, Business Development |
| API design for new feature | REST or GraphQL? What data needs to be exposed? | PM, Backend Engineers, API Consumers |
| Authentication model | What security level is required? | PM, Security Team, Developer Relations |
| Rate limiting policy | What is fair usage? What tiers should we offer? | PM, Engineering, Product Marketing |
| Versioning and deprecation | How many consumers use each version? | PM, Developer Relations, Engineering |
| SDK investment | Which languages do our developers use? | PM, Developer Relations, Engineering |

#### Diagram: Integration Ecosystem Map
<iframe src="../../sims/integration-ecosystem-map/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Integration Ecosystem Map</summary>
Type: diagram

Bloom Level: Evaluate (L5)
Bloom Verb: assess, prioritize
Learning Objective: Students will be able to assess integration opportunities based on strategic value, technical complexity, and user demand.

Layout: Concentric circles with your product at the center, surrounded by integration categories in rings organized by strategic importance (core, growth, ecosystem).

Color scheme: Gold (center), green (core), blue (growth), gray (ecosystem)
Implementation: HTML/CSS/JavaScript with SVG concentric circle layout
</details>

## Applying API Knowledge as a Technical PM

API literacy gives you practical superpowers in your daily work. Here are the most common scenarios where this knowledge pays off:

- **Integration scoping** - When a customer requests a new integration, you can review the partner API documentation, assess the complexity, and provide realistic estimates before involving engineering
- **API-first product design** - You can advocate for designing APIs before UIs, ensuring your product is extensible by default
- **Developer experience advocacy** - You can champion good documentation, consistent error messages, and helpful SDKs because you understand what developers need
- **Incident response** - When an integration breaks, you can read error logs, identify whether the problem is a 4xx (our issue) or 5xx (their issue), and route the investigation appropriately
- **Vendor evaluation** - You can assess competing services by examining their API documentation, testing endpoints in Postman, and evaluating their SDK quality

??? question "Self-Check: Can you answer these questions?"
    1. What is the difference between REST and GraphQL, and when would you recommend each approach?
    2. Explain the four primary HTTP methods and what operation each performs.
    3. Why is API versioning important, and what happens if you skip it?
    4. Describe three different API authentication methods and their trade-offs.
    5. What is the difference between an API and an SDK? When should a product invest in building SDKs?
    6. A partner API returns a 429 status code when your system calls it. What does this mean, and how should your team handle it?

## Key Takeaways

- **API fundamentals** define how software systems communicate through standardized contracts - understanding APIs is the most important technical skill for PMs managing products with integrations
- **REST APIs** use resources, endpoints, and standard HTTP methods (GET, POST, PUT, DELETE) to provide predictable, stateless interfaces that dominate modern web development
- **GraphQL** offers an alternative that lets clients request exactly the data they need, reducing over-fetching and under-fetching problems common with REST
- **API endpoints** and **HTTP methods** form the vocabulary of API design - endpoints identify resources while methods specify operations
- **API authentication** (API keys, OAuth 2.0, JWT) secures APIs by verifying caller identity, while **API rate limiting** protects systems from abuse and ensures fair usage
- **API versioning** maintains backward compatibility as APIs evolve, and **API documentation** is the single most important factor in developer adoption
- **Data serialization** converts data for transmission using formats like **JSON** (dominant, lightweight) and **XML** (legacy, enterprise)
- **Webhooks** enable event-driven, push-based communication that is more efficient than polling
- **Third-party integrations** extend product value, while **API gateways** and **middleware** manage cross-cutting concerns like security, routing, and validation
- **SDKs** reduce integration effort by wrapping APIs in language-specific packages, and **API testing** tools like **Postman** enable PMs to explore and verify API behavior directly
- **API error handling** using standard HTTP status codes (2xx success, 4xx client error, 5xx server error) with clear messages is critical for developer experience

[See Annotated References](./references.md)
