# SQL Query Builder

An interactive simulation that lets you construct SQL queries visually and see how they retrieve and filter data from a relational database. Build SELECT, WHERE, ORDER BY, and JOIN clauses step by step.

<iframe src="./main.html" width="100%" height="920px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim teaches the fundamentals of SQL by letting you build queries interactively against a sample database:

- **Three tables** — Customers (5 rows), Orders (6 rows), Products (4 rows) — with realistic relationships
- **Visual query builder** — select FROM, JOIN, SELECT columns, WHERE filters, and ORDER BY without typing SQL
- **Live SQL preview** — watch the query form with color-coded syntax as you make choices
- **Run and see results** — matching rows highlight in the source tables and the result set appears below
- **Six example queries** — click any example to instantly load and run it

## How to Use

1. **Choose a table** from the FROM dropdown — this is the table your query starts from
2. **Optionally add a JOIN** to combine data from a related table
3. **Pick columns** to SELECT — choose "All (*)" or specific columns
4. **Add a WHERE filter** to narrow results (e.g., city = Seattle, price < 40)
5. **Set ORDER BY** to sort results ascending or descending
6. **Click Run Query** to execute — matching source rows highlight in teal and the result set appears below
7. Try the **example query buttons** to see common SQL patterns in action

## Sample Database

| Table | Rows | Description |
|-------|------|-------------|
| **Customers** | 5 | customer_id, name, email, city |
| **Orders** | 6 | order_id, customer_id, product_id, quantity, order_date |
| **Products** | 4 | product_id, product_name, category, price |

Relationships: Customers → Orders (one-to-many via customer_id), Orders → Products (many-to-one via product_id).

## Key Takeaways

- **SELECT** determines which columns appear in the result
- **FROM** specifies the source table
- **JOIN** combines rows from two tables using a shared key
- **WHERE** filters rows that don't meet the condition
- **ORDER BY** sorts the final result set
- SQL reads like English: "Select name and email from Customers where city equals Seattle, ordered by name"

## Learning Objectives

After using this simulation, you should be able to:

- Construct basic SELECT queries with column selection and table specification
- Apply WHERE clauses to filter data using comparison operators
- Use ORDER BY to sort result sets ascending or descending
- Write JOIN queries to combine data from related tables using foreign keys
- Predict the result set of a query before running it

## Related Content

This simulation supports [Chapter 7: Databases and SQL](../../chapters/07-databases-and-sql/index.md), which covers relational database concepts, SQL fundamentals, table design, and how PMs work with data teams to define data requirements.
