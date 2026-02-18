# Node.js Part 2 - Databases & SQL

> "Always pass on what you have learned."
> ―Yoda

In Node.js Part 1, you learned to build a REST API with in-memory data. Now it's time to persist that data in a real database using SQL.

## What is a Database?

A **database** is a system for storing and organizing data permanently. Unlike arrays in memory (which disappear when your server restarts), databases save data to disk.

### Types of Databases

**SQL Databases** (Relational):

- Store data in tables with rows and columns
- Use SQL (Structured Query Language) to query data
- Examples: PostgreSQL, MySQL, SQLite
- Good for: structured data with relationships

**NoSQL Databases** (Non-relational):

- Store data in various formats (documents, key-value, etc.)
- Examples: MongoDB, Redis
- Good for: flexible schemas, rapid development

In this section, we'll focus on **SQL databases** and specifically use **SQLite** because it's simple and requires no setup.

## Prerequisites

- Complete Node.js Part 1
- Understanding of CRUD operations
- Basic command line skills

## Introduction to SQL

**SQL** (Structured Query Language) is a language for managing data in relational databases.

### Basic SQL Commands

**CREATE TABLE** - Create a new table:

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT
);
```

**INSERT** - Add new data:

```sql
INSERT INTO users (name, email, role)
VALUES ('Luke Skywalker', 'luke@jedi.org', 'Jedi');
```

**SELECT** - Retrieve data:

```sql
-- Get all users
SELECT * FROM users;

-- Get specific columns
SELECT name, email FROM users;

-- Get with condition
SELECT * FROM users WHERE role = 'Jedi';

-- Get with ordering
SELECT * FROM users ORDER BY name ASC;
```

**UPDATE** - Modify existing data:

```sql
UPDATE users
SET role = 'Jedi Master'
WHERE name = 'Yoda';
```

**DELETE** - Remove data:

```sql
DELETE FROM users WHERE id = 3;
```

### SQL Data Types

Common data types:

- **INTEGER** - whole numbers (1, 42, -5)
- **TEXT** - strings ('hello', 'Luke Skywalker')
- **REAL** - decimal numbers (3.14, 99.99)
- **BOOLEAN** - true/false (stored as 0 or 1)
- **DATE/DATETIME** - dates and times

### SQL Constraints

Constraints ensure data quality:

- **PRIMARY KEY** - unique identifier for each row
- **NOT NULL** - field must have a value
- **UNIQUE** - all values must be different
- **DEFAULT** - default value if none provided
- **CHECK** - validates data meets a condition

## Setting Up SQLite with Node.js

### Installing SQLite

Install the `better-sqlite3` package:

```bash
npm install better-sqlite3
```

### Creating a Database

Create a file called `database.js`:

```js
const Database = require('better-sqlite3');
const db = new Database('myapp.db');

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Database initialized!');

module.exports = db;
```

This creates a file called `myapp.db` that stores your data.

### Inserting Data

Add some initial data:

```js
const db = require('./database');

// Insert a single user
const insert = db.prepare(`
  INSERT INTO users (name, email, role)
  VALUES (?, ?, ?)
`);

insert.run('Luke Skywalker', 'luke@jedi.org', 'Jedi');
insert.run('Darth Vader', 'vader@sith.org', 'Sith');
insert.run('Yoda', 'yoda@jedi.org', 'Jedi Master');

console.log('Users inserted!');
```

**Note:** The `?` are placeholders that prevent SQL injection attacks.

## CRUD Operations with Database

Now let's rebuild our API to use the database instead of an array.

### Complete Server Example

Create `server.js`:

```js
const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());

// READ - Get all users
app.get('/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - Get single user by ID
app.get('/users/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?')
                   .get(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE - Add new user
app.post('/users', (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    const insert = db.prepare(`
      INSERT INTO users (name, email, role)
      VALUES (?, ?, ?)
    `);

    const result = insert.run(name, email, role || 'user');

    // Get the newly created user
    const newUser = db.prepare('SELECT * FROM users WHERE id = ?')
                      .get(result.lastInsertRowid);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes('UNIQUE')) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// UPDATE - Modify user
app.put('/users/:id', (req, res) => {
  try {
    const { name, email, role } = req.body;

    const update = db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          email = COALESCE(?, email),
          role = COALESCE(?, role)
      WHERE id = ?
    `);

    const result = update.run(name, email, role, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?')
                          .get(req.params.id);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - Remove user
app.delete('/users/:id', (req, res) => {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?')
                   .get(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);

    res.json({ message: 'User deleted', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Key Methods

- `.all()` - returns all matching rows as an array
- `.get()` - returns the first matching row
- `.run()` - executes the query and returns info (lastInsertRowid, changes)
- `.prepare()` - prepares a SQL statement for execution

## Advanced SQL Queries

### Filtering Data

```sql
-- WHERE clause
SELECT * FROM users WHERE role = 'Jedi';

-- Multiple conditions (AND)
SELECT * FROM users WHERE role = 'Jedi' AND name LIKE '%Skywalker%';

-- Multiple conditions (OR)
SELECT * FROM users WHERE role = 'Jedi' OR role = 'Sith';

-- IN clause
SELECT * FROM users WHERE role IN ('Jedi', 'Jedi Master');
```

### Sorting and Limiting

```sql
-- Sort ascending
SELECT * FROM users ORDER BY name ASC;

-- Sort descending
SELECT * FROM users ORDER BY created_at DESC;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Skip and limit (pagination)
SELECT * FROM users LIMIT 10 OFFSET 20;
```

### Aggregation

```sql
-- Count rows
SELECT COUNT(*) as total FROM users;

-- Count by group
SELECT role, COUNT(*) as count
FROM users
GROUP BY role;

-- Average, sum, min, max
SELECT AVG(age) as average_age FROM users;
SELECT SUM(points) as total_points FROM users;
SELECT MIN(created_at) as first_user FROM users;
SELECT MAX(created_at) as latest_user FROM users;
```

## Relationships Between Tables

### One-to-Many Relationship

Example: Users can have many tasks

```js
// Create tasks table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);
```

### JOIN Queries

Get tasks with user information:

```sql
SELECT tasks.*, users.name as user_name
FROM tasks
INNER JOIN users ON tasks.user_id = users.id;
```

In Express:

```js
app.get('/tasks', (req, res) => {
  const tasks = db.prepare(`
    SELECT
      tasks.*,
      users.name as user_name,
      users.email as user_email
    FROM tasks
    INNER JOIN users ON tasks.user_id = users.id
  `).all();

  res.json(tasks);
});
```

## Database Best Practices

### 1. Use Transactions

For multiple related operations:

```js
const insertUser = db.transaction((name, email, tasks) => {
  const result = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)')
                   .run(name, email);

  const userId = result.lastInsertRowid;

  const insertTask = db.prepare('INSERT INTO tasks (title, user_id) VALUES (?, ?)');

  for (const task of tasks) {
    insertTask.run(task, userId);
  }

  return userId;
});

// Use it
const userId = insertUser('Rey', 'rey@resistance.org', ['Train', 'Fight']);
```

### 2. Prevent SQL Injection

**Bad (vulnerable):**

```js
// NEVER DO THIS!
db.prepare(`SELECT * FROM users WHERE name = '${req.body.name}'`).all();
```

**Good (safe):**

```js
db.prepare('SELECT * FROM users WHERE name = ?').all(req.body.name);
```

### 3. Index Important Columns

Speed up queries:

```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
```

### 4. Handle Errors

Always use try-catch blocks and send appropriate error messages.

## Moving to Production Databases

SQLite is great for learning and small projects. For production apps, explore:

- **PostgreSQL** - Powerful SQL database. Use with the `pg` npm package. [Docs](https://node-postgres.com/)
- **MySQL** - Popular SQL database. Use with `mysql2` npm package. [Docs](https://github.com/sidorares/node-mysql2)

The SQL you've learned here transfers directly — the syntax is nearly identical.

## Trial: Build a Blog API with Database

Create a complete blog API with the following:

### Database Schema

Two tables:

1. **posts** table:
   - id (INTEGER, PRIMARY KEY)
   - title (TEXT, NOT NULL)
   - content (TEXT, NOT NULL)
   - author_id (INTEGER, FOREIGN KEY)
   - published (BOOLEAN, DEFAULT 0)
   - created_at (DATETIME)

2. **authors** table:
   - id (INTEGER, PRIMARY KEY)
   - name (TEXT, NOT NULL)
   - email (TEXT, UNIQUE, NOT NULL)
   - bio (TEXT)

### Required Endpoints

**Authors:**

- `GET /authors` - Get all authors
- `GET /authors/:id` - Get author with their posts
- `POST /authors` - Create new author
- `PUT /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

**Posts:**

- `GET /posts` - Get all published posts
- `GET /posts/:id` - Get single post with author info
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `GET /posts?published=true` - Filter published posts

### Requirements

- Use SQLite with better-sqlite3
- Use JOIN queries to get related data
- Add proper error handling
- Validate input data
- Prevent deleting an author who has posts
- Add pagination to the posts endpoint

Complete this trial and earn the badge **"Database Master"**

### Bonus

- Add a comments table (one post has many comments)
- Implement full-text search on post titles and content
- Add database migrations for schema changes
- Deploy your API with a PostgreSQL database
- Create a React front-end that displays posts

You will earn the badge **"Data Jedi"**

When finished, head to the [final project][final-project] to combine everything you've learned!

[final-project]: https://github.com/mihaildono/padawan-project/blob/master/js/jedi/final-project.md
