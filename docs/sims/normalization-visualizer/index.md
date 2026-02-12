# Database Normalization Visualizer

Watch a denormalized database table transform step by step through First, Second, and Third Normal Form. See how redundant data is eliminated and anomalies are resolved at each stage.

<iframe src="./main.html" width="100%" height="850px" scrolling="no" style="border: none; border-radius: 8px;"></iframe>

[View Fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim walks through the three normal forms using a concrete order management example:

- **Unnormalized** — A flat table with comma-separated values and heavy data duplication
- **1NF (First Normal Form)** — Atomic values only, no repeating groups, composite primary key introduced
- **2NF (Second Normal Form)** — Table split to remove partial dependencies on the composite key
- **3NF (Third Normal Form)** — Customer data extracted to eliminate transitive dependencies

At each step, redundant cells are highlighted in red, and the three anomaly cards below show whether update, insert, and delete anomalies are present or resolved.

## How to Use

1. Click the **step buttons** (Unnormalized, 1NF, 2NF, 3NF) to move through the normalization stages
2. Watch the canvas redraw the table structure at each step
3. Look for **red-highlighted cells** indicating duplicated data
4. Read the **explanation panel** to understand what changed and why
5. Check the **anomaly cards** to see which problems persist or are resolved

## What to Try

- **Start at Unnormalized** — Notice the comma-separated "items" column and how Sarah Chen's data appears in 2 rows
- **Step to 1NF** — See that every cell now has one value, but the table expanded to 6 rows with even more duplication
- **Step to 2NF** — Two tables appear, but customer data is still repeated in the orders table
- **Step to 3NF** — Three clean tables with no redundancy; all anomaly cards turn green

## Key Takeaway

Normalization is the process of eliminating data redundancy by decomposing tables so each fact is stored exactly once. While more tables mean more joins, the trade-off is data integrity — no update anomalies, no insert anomalies, no delete anomalies. Most production databases normalize to 3NF and selectively denormalize only for performance-critical queries.

## Learning Objectives

After using this simulation, you should be able to:

- Identify unnormalized data structures and the problems they cause
- Explain what each normal form (1NF, 2NF, 3NF) requires and what it fixes
- Recognize update, insert, and delete anomalies in a database design
- Describe the trade-off between normalization (data integrity) and denormalization (query performance)

## Related Content

This simulation supports [Chapter 7: Databases and SQL](../../chapters/07-databases-and-sql/index.md), which covers relational databases, SQL queries, schema design, normalization, and NoSQL alternatives.
