---
title: Databases and SQL
description: How product data is stored and accessed, from relational database fundamentals and SQL queries through schema design, normalization, and NoSQL alternatives
generated_by: claude skill chapter-content-generator
date: 2026-02-11
version: 0.04
---

# Databases and SQL

## Summary

This chapter introduces the database concepts every technical PM needs to query data and make informed product decisions. You will learn about relational databases, write SQL queries and joins, and understand data tables, primary keys, foreign keys, schema design, and normalization. The chapter also covers NoSQL databases including document databases and key-value stores, giving you a well-rounded understanding of how product data is stored and accessed.

## Concepts Covered

This chapter covers the following 13 concepts from the learning graph:

1. Database Fundamentals
2. Relational Databases
3. SQL Basics
4. SQL Queries
5. SQL Joins
6. Data Tables
7. Primary Keys
8. Foreign Keys
9. Database Schema
10. Data Normalization
11. NoSQL Databases
12. Document Databases
13. Key-Value Stores

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Product Management Foundations](../01-pm-foundations/index.md)

---

## Why Databases Matter for Product Managers

Every product you manage generates and relies on data - user accounts, transactions, content, analytics events, configuration settings, and more. That data has to live somewhere organized and accessible. **Database fundamentals** encompass the core principles of how data is stored, organized, retrieved, and protected in software systems. A database is a structured collection of data managed by software (a database management system, or DBMS) that provides reliable storage, efficient retrieval, and concurrent access for multiple users and applications simultaneously.

As a technical PM, database literacy gives you three critical capabilities. First, you can query your own product data rather than waiting for an analyst to pull numbers. Second, you can evaluate engineering proposals about data architecture with informed questions. Third, you can understand performance constraints that affect user experience - why some pages load slowly, why certain reports take minutes to generate, and why "just adding a field" is sometimes harder than it sounds.

!!! info "The PM Who Can Query"
    Technical PMs who can write basic SQL queries gain a significant advantage. Instead of filing a ticket and waiting two days to learn how many users completed onboarding last week, you can answer that question yourself in two minutes. This chapter gives you that capability.

## Relational Databases

A **relational database** is a type of database that organizes data into structured tables with rows and columns, where relationships between tables are defined through shared values. Developed by Edgar F. Codd at IBM in 1970, the relational model remains the most widely used approach for storing structured business data. Popular relational database systems include PostgreSQL, MySQL, Microsoft SQL Server, and Oracle Database.

The relational model is built on a simple but powerful idea: store each type of information in its own table, and use references (keys) to connect related information across tables. This approach eliminates data duplication, enforces consistency, and makes it easy to answer complex questions by combining data from multiple tables.

### Data Tables

**Data tables** (also called relations) are the fundamental storage structures in a relational database. Each table stores data about one type of entity - users, orders, products, subscriptions - organized into rows and columns. Each row represents a single record (one user, one order), and each column represents a specific attribute of that entity (name, email, creation date).

Here is an example of a `users` table:

| user_id | name | email | plan | created_at |
|---------|------|-------|------|------------|
| 1 | Sarah Chen | sarah@example.com | Pro | 2025-01-15 |
| 2 | James Wilson | james@example.com | Free | 2025-02-20 |
| 3 | Maria Garcia | maria@example.com | Enterprise | 2025-03-01 |
| 4 | Alex Kim | alex@example.com | Pro | 2025-03-15 |

And a related `orders` table:

| order_id | user_id | product | amount | order_date |
|----------|---------|---------|--------|------------|
| 101 | 1 | Dashboard Add-on | 29.99 | 2025-04-01 |
| 102 | 1 | API Access Pack | 49.99 | 2025-04-15 |
| 103 | 3 | Custom Reports | 99.99 | 2025-04-20 |
| 104 | 4 | Dashboard Add-on | 29.99 | 2025-05-01 |

Notice how `user_id` appears in both tables - this is the link that connects users to their orders. This connection is the essence of the relational model.

### Primary Keys and Foreign Keys

A **primary key** is a column (or combination of columns) that uniquely identifies each row in a table. No two rows can have the same primary key value, and the value cannot be empty (null). In the `users` table above, `user_id` is the primary key - every user has a unique ID that distinguishes them from all other users.

A **foreign key** is a column in one table that references the primary key of another table, creating a relationship between the two tables. In the `orders` table, `user_id` is a foreign key that references `users.user_id`. This reference enforces **referential integrity** - the database ensures you cannot create an order for a user that does not exist, and you cannot delete a user who has existing orders (without explicitly handling the orders first).

#### Diagram: Primary Keys and Foreign Keys Relationship
<iframe src="../../sims/primary-foreign-keys/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Primary Keys and Foreign Keys Relationship</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, illustrate
Learning Objective: Students will be able to explain how primary keys uniquely identify records and how foreign keys create relationships between tables.

Layout: Two tables displayed side by side with connecting lines showing the key relationships. Left table shows users with user_id as PK highlighted in gold. Right table shows orders with order_id as PK and user_id as FK highlighted in blue. Connecting lines from matching user_id values illustrate the one-to-many relationship.

Color scheme: Gold (primary keys), blue (foreign keys), green (valid connections)
Implementation: HTML/CSS/JavaScript with SVG table visualization
</details>

## SQL: The Language of Data

### SQL Basics

**SQL (Structured Query Language)** is the standard programming language for managing and querying relational databases. Pronounced "sequel" or "S-Q-L," SQL has been the dominant database language since the 1970s and remains essential today. Unlike general-purpose programming languages, SQL is declarative - you describe *what* data you want, not *how* to retrieve it. The database engine figures out the most efficient way to execute your request.

SQL provides four categories of operations:

- **Querying** (SELECT) - Retrieving data from one or more tables
- **Inserting** (INSERT) - Adding new rows to a table
- **Updating** (UPDATE) - Modifying existing rows
- **Deleting** (DELETE) - Removing rows from a table

For PMs, SELECT queries are by far the most important. You will use them to pull product data, analyze user behavior, and answer business questions. The other operations are primarily the domain of application code and database administrators.

### SQL Queries

**SQL queries** are SELECT statements that retrieve data from the database based on specified criteria. A query tells the database which columns you want, from which table, and under what conditions. Learning to write basic SQL queries is one of the most practical technical skills a PM can acquire.

Here are progressively more complex queries using our example tables:

**Basic query - all users:**
```sql
SELECT name, email, plan
FROM users;
```

**Filtered query - only Pro users:**
```sql
SELECT name, email
FROM users
WHERE plan = 'Pro';
```

**Aggregation - count users by plan:**
```sql
SELECT plan, COUNT(*) as user_count
FROM users
GROUP BY plan
ORDER BY user_count DESC;
```

**Date filtering - users who signed up in March 2025:**
```sql
SELECT name, email, created_at
FROM users
WHERE created_at >= '2025-03-01'
  AND created_at < '2025-04-01';
```

| SQL Clause | Purpose | Example |
|-----------|---------|---------|
| `SELECT` | Which columns to return | `SELECT name, email` |
| `FROM` | Which table to query | `FROM users` |
| `WHERE` | Filter rows by condition | `WHERE plan = 'Pro'` |
| `GROUP BY` | Group rows for aggregation | `GROUP BY plan` |
| `HAVING` | Filter groups (after GROUP BY) | `HAVING COUNT(*) > 10` |
| `ORDER BY` | Sort results | `ORDER BY created_at DESC` |
| `LIMIT` | Restrict number of rows returned | `LIMIT 100` |

!!! tip "SQL for Product Questions"
    Think of SQL as a way to ask your database questions in a structured format. "How many users signed up last month?" becomes a SELECT with COUNT and a WHERE clause on the date. "What is our most popular plan?" becomes a GROUP BY with ORDER BY. Once you internalize this translation, SQL becomes a natural extension of your analytical thinking.

### SQL Joins

**SQL joins** combine rows from two or more tables based on a related column, allowing you to answer questions that span multiple entities. Joins are where SQL becomes truly powerful for product analysis - you can connect user data with order data, subscription data with usage data, and any other related datasets.

The most common join types:

**INNER JOIN** - Returns only rows that have matching values in both tables:
```sql
SELECT users.name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.user_id = orders.user_id;
```

This returns only users who have orders. User James Wilson (who has no orders) would not appear in the results.

**LEFT JOIN** - Returns all rows from the left table and matching rows from the right table:
```sql
SELECT users.name, orders.product, orders.amount
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id;
```

This returns all users, including James Wilson with NULL values for product and amount (since he has no orders). LEFT JOINs are especially useful for finding records without matches - such as users who never made a purchase.

| Join Type | What It Returns | Use Case |
|-----------|----------------|----------|
| **INNER JOIN** | Only matching rows from both tables | "Show me users and their orders" |
| **LEFT JOIN** | All rows from left table, matches from right | "Show all users, including those without orders" |
| **RIGHT JOIN** | All rows from right table, matches from left | "Show all orders, including orphaned ones" |
| **FULL OUTER JOIN** | All rows from both tables | "Show everything, matched or not" |

#### Diagram: SQL Join Types Visualized
<iframe src="../../sims/sql-join-types/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>SQL Join Types Visualized</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: compare, distinguish
Learning Objective: Students will be able to compare the four main SQL join types and distinguish which rows each type includes or excludes.

Layout: Four Venn diagram pairs arranged in a 2x2 grid, each showing two overlapping circles representing Table A (users) and Table B (orders). Each diagram highlights which regions are included in the join result: INNER JOIN highlights only the overlap, LEFT JOIN highlights all of circle A plus overlap, RIGHT JOIN highlights all of circle B plus overlap, FULL OUTER JOIN highlights both entire circles.

Color scheme: Green (inner), blue (left), orange (right), purple (full outer)
Implementation: HTML/CSS/JavaScript with SVG Venn diagrams
</details>

## Database Design

### Database Schema

A **database schema** is the formal definition of a database structure, including its tables, columns, data types, relationships, constraints, and indexes. The schema is the blueprint for how data is organized and related. Schema design decisions made early in a product life can be difficult and expensive to change later, which is why technical PMs should understand the trade-offs involved.

A schema defines several things for each table:

- **Column names and data types** - What information is stored and in what format (text, integer, date, boolean)
- **Constraints** - Rules like NOT NULL (value required), UNIQUE (no duplicates), and CHECK (value must meet a condition)
- **Relationships** - How tables connect through primary and foreign keys
- **Indexes** - Optimizations that speed up specific queries (covered in Chapter 8)

Here is a simplified schema for a product management SaaS application:

```
users
-- user_id (INTEGER, PRIMARY KEY)
-- name (VARCHAR(100), NOT NULL)
-- email (VARCHAR(255), UNIQUE, NOT NULL)
-- plan (VARCHAR(20), NOT NULL)
-- created_at (TIMESTAMP, NOT NULL)

orders
-- order_id (INTEGER, PRIMARY KEY)
-- user_id (INTEGER, FOREIGN KEY -> users.user_id)
-- product (VARCHAR(100), NOT NULL)
-- amount (DECIMAL(10,2), NOT NULL)
-- order_date (DATE, NOT NULL)

subscriptions
-- subscription_id (INTEGER, PRIMARY KEY)
-- user_id (INTEGER, FOREIGN KEY -> users.user_id)
-- plan (VARCHAR(20), NOT NULL)
-- status (VARCHAR(20), NOT NULL)
-- started_at (TIMESTAMP, NOT NULL)
-- expires_at (TIMESTAMP)
```

### Data Normalization

**Data normalization** is the process of organizing database tables to minimize data redundancy and dependency issues. Normalization involves structuring tables so that each piece of information is stored in exactly one place. When data is duplicated across multiple tables, updates become error-prone - change the data in one place but forget another, and you have inconsistent data.

Consider a poorly normalized (denormalized) table:

| order_id | user_name | user_email | user_plan | product | amount |
|----------|-----------|------------|-----------|---------|--------|
| 101 | Sarah Chen | sarah@example.com | Pro | Dashboard Add-on | 29.99 |
| 102 | Sarah Chen | sarah@example.com | Pro | API Access Pack | 49.99 |
| 103 | Maria Garcia | maria@example.com | Enterprise | Custom Reports | 99.99 |

The problem is clear: Sarah Chen name, email, and plan are stored in every order row. If she changes her email, you must update every order row - miss one and your data is inconsistent. The normalized approach uses separate tables (as shown earlier) with foreign keys connecting them.

Normalization follows progressive levels called "normal forms":

| Normal Form | Rule | What It Prevents |
|-------------|------|-----------------|
| **1NF** | Each column contains atomic (indivisible) values; no repeating groups | Storing comma-separated lists in a single column |
| **2NF** | Meet 1NF + every non-key column depends on the entire primary key | Partial dependencies that cause update anomalies |
| **3NF** | Meet 2NF + no non-key column depends on another non-key column | Transitive dependencies that duplicate data |

!!! note "Normalization vs. Performance"
    Normalization reduces redundancy but can require more joins to reassemble data, which affects query performance. In practice, most applications normalize to Third Normal Form (3NF) and selectively denormalize specific tables for performance-critical queries. This trade-off between data integrity and read performance is a common engineering discussion that PMs should understand.

## Beyond Relational: NoSQL Databases

### NoSQL Databases

**NoSQL databases** (often interpreted as "Not Only SQL") are a category of database systems that store data in formats other than the traditional relational table structure. NoSQL databases emerged to address limitations of relational databases when handling massive scale, flexible data structures, or high-velocity data that does not fit neatly into rows and columns.

NoSQL databases do not replace relational databases - they complement them. Many modern products use both: a relational database for structured transactional data (users, orders, billing) and a NoSQL database for semi-structured or high-volume data (user activity logs, product catalogs, session data). The choice depends on the data characteristics and access patterns.

| Dimension | Relational (SQL) | NoSQL |
|-----------|------------------|-------|
| Data structure | Fixed schema (tables, rows, columns) | Flexible schema (documents, key-value, graphs) |
| Scaling approach | Vertical (bigger server) | Horizontal (more servers) |
| Consistency | Strong (ACID transactions) | Varies (eventual consistency common) |
| Query language | SQL (standardized) | Database-specific APIs |
| Best for | Structured data, complex queries, transactions | Flexible data, massive scale, simple access patterns |
| Examples | PostgreSQL, MySQL, SQL Server | MongoDB, DynamoDB, Redis, Cassandra |

### Document Databases

A **document database** stores data as semi-structured documents, typically in JSON-like format. Each document contains all the data for a single entity, including nested objects and arrays, without requiring a fixed schema. This means different documents in the same collection can have different fields - one user document might include a phone number while another does not.

MongoDB, the most popular document database, stores data like this:

```json
{
  "_id": "user_001",
  "name": "Sarah Chen",
  "email": "sarah@example.com",
  "plan": "Pro",
  "preferences": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  },
  "recent_activity": [
    {"action": "login", "timestamp": "2025-04-01T09:00:00Z"},
    {"action": "created_report", "timestamp": "2025-04-01T09:15:00Z"}
  ]
}
```

Document databases excel when your data has variable structure (not every record has the same fields), when you frequently read and write entire documents at once, and when horizontal scaling is a priority. They are popular for content management systems, user profiles with varying attributes, and product catalogs where items have different characteristics.

### Key-Value Stores

A **key-value store** is the simplest type of NoSQL database, storing data as pairs of unique keys and their associated values. Think of it as a giant dictionary or hash map - you provide a key and get back the corresponding value. The value can be anything: a string, a number, a JSON document, or even a binary file. The database does not inspect or index the value; it just stores and retrieves it by key.

| Key | Value |
|-----|-------|
| `session:abc123` | `{"user_id": 1, "expires": "2025-04-01T10:00:00Z"}` |
| `cache:product:42` | `{"name": "Analytics Pro", "price": 49.99}` |
| `config:feature_flags` | `{"dark_mode": true, "new_search": false}` |
| `rate_limit:user:1` | `47` (requests remaining) |

Key-value stores are extremely fast because lookups by key are the simplest possible database operation. Redis, the most popular key-value store, processes millions of operations per second and stores data in memory for sub-millisecond response times.

Common use cases for key-value stores:

- **Session management** - Storing user session data for logged-in users
- **Caching** - Storing frequently accessed data to avoid expensive database queries
- **Feature flags** - Storing configuration that controls feature availability
- **Rate limiting** - Tracking API request counts per user or IP address
- **Leaderboards** - Maintaining sorted rankings that update in real time

#### Diagram: Database Type Decision Guide
<iframe src="../../sims/database-type-decision/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Database Type Decision Guide</summary>
Type: diagram

Bloom Level: Evaluate (L5)
Bloom Verb: assess, recommend
Learning Objective: Students will be able to assess a data storage requirement and recommend the appropriate database type based on data characteristics, access patterns, and scale requirements.

Layout: Decision flowchart starting from "What type of data are you storing?" with branching paths leading to database type recommendations. Branches cover structured data with complex relationships (relational), semi-structured with varying fields (document), simple lookups needing speed (key-value), and large-scale analytics (forward reference to Chapter 8).

Color scheme: Blue (decisions), green (relational), orange (document), purple (key-value)
Implementation: HTML/CSS/JavaScript with interactive decision tree
</details>

## Practical SQL for Product Managers

Now that you understand the theory, here are five SQL query patterns that cover the majority of questions a PM asks of a database. These patterns apply regardless of which relational database your team uses.

**Pattern 1: How many users signed up each month?**
```sql
SELECT
    DATE_TRUNC('month', created_at) AS signup_month,
    COUNT(*) AS new_users
FROM users
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY signup_month;
```

**Pattern 2: What is the revenue by plan type?**
```sql
SELECT
    users.plan,
    SUM(orders.amount) AS total_revenue,
    COUNT(DISTINCT orders.user_id) AS paying_users
FROM orders
INNER JOIN users ON orders.user_id = users.user_id
GROUP BY users.plan
ORDER BY total_revenue DESC;
```

**Pattern 3: Which users have never placed an order?**
```sql
SELECT users.name, users.email, users.plan
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id
WHERE orders.order_id IS NULL;
```

**Pattern 4: What is the average order value by month?**
```sql
SELECT
    DATE_TRUNC('month', order_date) AS order_month,
    AVG(amount) AS avg_order_value,
    COUNT(*) AS total_orders
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY order_month;
```

**Pattern 5: Who are the top 10 customers by total spend?**
```sql
SELECT
    users.name,
    users.email,
    SUM(orders.amount) AS total_spent,
    COUNT(orders.order_id) AS order_count
FROM users
INNER JOIN orders ON users.user_id = orders.user_id
GROUP BY users.user_id, users.name, users.email
ORDER BY total_spent DESC
LIMIT 10;
```

!!! tip "Start Simple, Iterate"
    Do not try to write the perfect query on the first attempt. Start with a basic SELECT to see your data, add a WHERE clause to filter it, then layer in JOINs, GROUP BY, and aggregations. Build your query piece by piece, checking results at each step. This iterative approach is how experienced analysts work too.

## Choosing Between SQL and NoSQL

The relational-vs-NoSQL decision is one of the most consequential technical choices your engineering team will make. As a PM, you should understand the trade-offs well enough to ask informed questions and evaluate proposals.

| Factor | Favors Relational | Favors NoSQL |
|--------|-------------------|-------------|
| Data structure | Well-defined, consistent schema | Evolving, variable schema |
| Query complexity | Complex joins across many tables | Simple lookups by key or document |
| Transaction needs | Financial data, inventory, anything requiring ACID | Social feeds, logs, analytics events |
| Scale pattern | Moderate scale, read-heavy | Massive scale, write-heavy |
| Team expertise | Strong SQL skills | Experience with specific NoSQL system |
| Development speed | Schema changes require migrations | Flexible schema adapts quickly |

In practice, the answer is often "both." A typical modern product might use PostgreSQL for user accounts, billing, and orders (where consistency matters), MongoDB for a product catalog with varying attributes, and Redis for session management and caching. This polyglot persistence approach uses each database type for what it does best.

??? question "Self-Check: Can you answer these questions?"
    1. What is the difference between a primary key and a foreign key, and how do they work together?
    2. Write a SQL query that counts the number of orders per user, showing only users with more than 5 orders.
    3. Explain the difference between an INNER JOIN and a LEFT JOIN. When would you use each?
    4. What is data normalization, and what problem does it solve?
    5. Name two scenarios where a document database would be a better choice than a relational database.
    6. What is a key-value store, and why is it used for caching rather than a relational database?

## Key Takeaways

- **Database fundamentals** provide the foundation for understanding how product data is stored, organized, and retrieved - database literacy is a high-leverage PM skill
- **Relational databases** organize data into **data tables** with rows and columns, connected through **primary keys** (unique identifiers) and **foreign keys** (cross-table references)
- **SQL basics** revolve around the SELECT statement, which lets PMs query data directly to answer product questions without waiting for analyst support
- **SQL queries** use clauses like WHERE (filter), GROUP BY (aggregate), ORDER BY (sort), and LIMIT (restrict) to extract specific insights from data
- **SQL joins** combine data from multiple tables - INNER JOIN returns only matches, LEFT JOIN includes all rows from the left table even without matches
- A **database schema** defines the complete structure of a database, and **data normalization** eliminates redundancy by ensuring each piece of data is stored in exactly one place
- **NoSQL databases** offer alternatives for data that does not fit neatly into relational tables, with trade-offs around flexibility, scale, and consistency
- **Document databases** (like MongoDB) store semi-structured JSON-like documents with flexible schemas, ideal for variable data structures
- **Key-value stores** (like Redis) provide extremely fast lookups by key, perfect for caching, session management, and real-time counters
- Most modern products use multiple database types together (polyglot persistence), choosing the right tool for each data storage need
