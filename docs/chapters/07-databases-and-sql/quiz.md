# Quiz: Databases and SQL

Test your understanding of databases and SQL with these review questions.

---

#### 1. What is the primary purpose of a database management system (DBMS)?

<div class="upper-alpha" markdown>
1. To create user interfaces for web applications
2. To provide reliable storage, efficient retrieval, and concurrent access to structured data
3. To replace spreadsheets with a faster file format
4. To generate SQL queries automatically from natural language
</div>

??? question "Show Answer"
    The correct answer is **B**. A database management system (DBMS) is software that manages a structured collection of data, providing reliable storage, efficient retrieval, and concurrent access for multiple users and applications simultaneously. While databases work alongside applications that have user interfaces, the DBMS itself is focused on data management rather than presentation, query generation, or simply replacing spreadsheets.

    **Concept Tested:** Database Fundamentals

---

#### 2. In a relational database, what does each row in a data table represent?

<div class="upper-alpha" markdown>
1. A single record of the entity that the table stores
2. A column definition with a data type
3. A relationship between two tables
4. A query result from a SELECT statement
</div>

??? question "Show Answer"
    The correct answer is **A**. In a relational database, each table stores data about one type of entity (such as users, orders, or products), and each row represents a single record of that entity. For example, one row in a users table represents one user, containing their name, email, plan, and creation date. Columns define the attributes, but individual rows are the records themselves.

    **Concept Tested:** Data Tables

---

#### 3. Which SQL clause is used to filter rows based on a condition before they are grouped or returned?

<div class="upper-alpha" markdown>
1. ORDER BY
2. GROUP BY
3. HAVING
4. WHERE
</div>

??? question "Show Answer"
    The correct answer is **D**. The WHERE clause filters rows based on a condition, such as `WHERE plan = 'Pro'` to return only Pro users. ORDER BY sorts results, GROUP BY groups rows for aggregation, and HAVING filters groups after aggregation. WHERE is applied before grouping takes place, making it the correct choice for filtering individual rows based on criteria like dates, plan types, or status values.

    **Concept Tested:** SQL Queries

---

#### 4. A PM wants to find all users who have never placed an order. Which SQL join type is most appropriate?

<div class="upper-alpha" markdown>
1. INNER JOIN with a COUNT filter
2. RIGHT JOIN with a GROUP BY clause
3. LEFT JOIN with a WHERE clause checking for NULL
4. FULL OUTER JOIN with a HAVING clause
</div>

??? question "Show Answer"
    The correct answer is **C**. A LEFT JOIN returns all rows from the left table (users) along with matching rows from the right table (orders). Users without orders will have NULL values in the order columns. By adding `WHERE orders.order_id IS NULL`, you filter to only those users with no matches. This is exactly the pattern shown in the chapter as "Pattern 3: Which users have never placed an order?" using a LEFT JOIN combined with an IS NULL check.

    **Concept Tested:** SQL Joins

---

#### 5. What distinguishes a primary key from a foreign key?

<div class="upper-alpha" markdown>
1. A primary key can contain NULL values, while a foreign key cannot
2. A primary key uniquely identifies each row in its own table, while a foreign key references the primary key of another table
3. A primary key is always an integer, while a foreign key is always a string
4. A primary key is used in NoSQL databases, while a foreign key is used only in relational databases
</div>

??? question "Show Answer"
    The correct answer is **B**. A primary key is a column (or combination of columns) that uniquely identifies each row in a table, with no two rows sharing the same value and no NULL values allowed. A foreign key is a column in one table that references the primary key of another table, creating a relationship between them. For example, `user_id` is the primary key in the users table and a foreign key in the orders table, linking each order to the user who placed it.

    **Concept Tested:** Primary Keys, Foreign Keys

---

#### 6. Your product stores user profiles where different users have different optional fields (some have phone numbers, some have social media links, some have neither). Which database type is best suited for this variable-structure data?

<div class="upper-alpha" markdown>
1. A key-value store like Redis
2. A normalized relational database in Third Normal Form
3. A relational database with additional columns for every possible field
4. A document database like MongoDB
</div>

??? question "Show Answer"
    The correct answer is **D**. Document databases store data as semi-structured documents (typically JSON-like) where different documents in the same collection can have different fields. This makes them ideal for data with variable structure, such as user profiles where attributes vary from user to user. A relational database would require adding columns for every possible field (most of which would be NULL), while a key-value store lacks the ability to query by individual fields within the stored values.

    **Concept Tested:** Document Databases

---

#### 7. What problem does data normalization primarily solve?

<div class="upper-alpha" markdown>
1. Slow query performance on large tables
2. Security vulnerabilities in database access patterns
3. Data redundancy and inconsistency caused by storing the same information in multiple places
4. The inability of relational databases to handle JSON data
</div>

??? question "Show Answer"
    The correct answer is **C**. Data normalization organizes database tables to minimize data redundancy and dependency issues. As the chapter illustrates, in a denormalized table where Sarah Chen's name, email, and plan are repeated in every order row, updating her email requires changing every row. Miss one and the data becomes inconsistent. Normalization structures tables so each piece of information is stored in exactly one place, connected through foreign key references.

    **Concept Tested:** Data Normalization

---

#### 8. A PM needs to write a query that shows total revenue broken down by subscription plan. The revenue data is in the orders table and the plan data is in the users table. Which SQL approach should they use?

<div class="upper-alpha" markdown>
1. JOIN the users and orders tables on user_id, then GROUP BY plan with SUM on amount
2. SELECT from the orders table with a WHERE clause filtering by plan
3. Use two separate queries and combine the results in a spreadsheet
4. SELECT from the users table with a subquery on the orders table
</div>

??? question "Show Answer"
    The correct answer is **A**. When data spans multiple tables, you need a JOIN to combine them. The chapter demonstrates this exact pattern as "Pattern 2: What is the revenue by plan type?" which uses an INNER JOIN between orders and users on user_id, then applies GROUP BY on users.plan with SUM(orders.amount) to calculate total revenue per plan. This single query replaces what would otherwise require manual combination of separate data pulls.

    **Concept Tested:** SQL Joins, SQL Queries

---

#### 9. Which of the following best describes why key-value stores like Redis are used for caching and session management rather than a relational database?

<div class="upper-alpha" markdown>
1. Key-value stores automatically normalize data to prevent redundancy
2. Key-value stores provide extremely fast lookups by key, often with sub-millisecond response times from in-memory storage
3. Key-value stores support complex SQL joins that relational databases cannot perform
4. Key-value stores enforce stronger data consistency than relational databases
</div>

??? question "Show Answer"
    The correct answer is **B**. Key-value stores are the simplest type of NoSQL database, storing data as pairs of unique keys and their associated values. Lookups by key are the simplest possible database operation, which makes them extremely fast. Redis, the most popular key-value store, processes millions of operations per second and stores data in memory for sub-millisecond response times. This speed makes key-value stores ideal for caching, session management, rate limiting, and other use cases where low latency is critical.

    **Concept Tested:** Key-Value Stores

---

#### 10. A startup is designing the database architecture for a new SaaS product. They need strong consistency for billing and user accounts, flexible storage for a product catalog with varying attributes, and fast caching for session data. Which architectural approach best addresses all three requirements?

<div class="upper-alpha" markdown>
1. Use a single relational database for everything to keep the architecture simple
2. Use a single document database like MongoDB since it can handle all three use cases
3. Use a key-value store for all data since speed is the most important factor
4. Use polyglot persistence: a relational database for billing and accounts, a document database for the catalog, and a key-value store for sessions
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter describes polyglot persistence as the approach most modern products use, choosing the right database type for each data storage need. A relational database like PostgreSQL provides the ACID transactions and strong consistency required for billing and user accounts. A document database like MongoDB handles the varying attributes of a product catalog without requiring a rigid schema. A key-value store like Redis delivers the sub-millisecond response times needed for session management and caching. Using a single database type would sacrifice capabilities in at least one area.

    **Concept Tested:** NoSQL Databases, Database Fundamentals
