# Node.js & Express

> "Your path you must decide."
> ―Yoda

Now that you can build beautiful front-end applications with React, it's time to learn how to build a back-end server. This will allow you to create, store, and manage data for your applications.

## What is Node.js?

**Node.js** is a JavaScript runtime that allows you to run JavaScript on the server (not just in the browser). This means you can use JavaScript to build both your front-end and back-end!

**Express** is a web framework for Node.js that makes it easy to build web servers and APIs.

## Prerequisites

- Complete the React section
- Have Node.js installed on your computer
- Basic understanding of HTTP requests (GET, POST, PUT, DELETE)

## Getting Started

### Installing Node.js

Check if Node.js is already installed:

```bash
node --version
npm --version
```

If not installed, download it from [nodejs.org](https://nodejs.org/) or via [fnm](https://github.com/Schniz/fnm)

### Creating Your First Server

Create a new folder for your project:

```bash
mkdir my-server
cd my-server
npm init -y
```

Install Express:

```bash
npm install express
```

Create a file called `server.js`:

```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run your server:

```bash
node server.js
```

Visit `http://localhost:3000` in your browser - you should see "Hello World!"

## Understanding HTTP Methods

HTTP methods (also called verbs) define what action you want to perform:

- **GET** - Retrieve data (like getting a list of users)
- **POST** - Create new data (like creating a new user)
- **PUT** - Update existing data (like updating a user's name)
- **DELETE** - Remove data (like deleting a user)

## CRUD Operations

CRUD stands for **Create, Read, Update, Delete** - the four basic operations you can perform on data.

### Setting Up

First, let's set up our server to handle JSON data:

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory database (just an array for now)
let users = [
  { id: 1, name: 'Luke Skywalker', role: 'Jedi' },
  { id: 2, name: 'Darth Vader', role: 'Sith' },
  { id: 3, name: 'Yoda', role: 'Jedi Master' }
];

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### READ - Getting Data (GET)

Get all users:

```js
app.get('/users', (req, res) => {
  res.json(users);
});
```

Get a single user by ID:

```js
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});
```

### CREATE - Adding Data (POST)

Create a new user:

```js
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
```

**Test with curl or Postman:**

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Obi-Wan Kenobi","role":"Jedi"}'
```

### UPDATE - Modifying Data (PUT)

Update an existing user:

```js
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.role = req.body.role || user.role;

  res.json(user);
});
```

**Test:**

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Luke Skywalker","role":"Jedi Knight"}'
```

### DELETE - Removing Data (DELETE)

Delete a user:

```js
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});
```

**Test:**

```bash
curl -X DELETE http://localhost:3000/users/2
```

## Middleware

Middleware functions have access to the request and response objects. They can
execute code, modify requests/responses, or end the request-response cycle.

Read about middleware in the [Express docs](https://expressjs.com/en/guide/using-middleware.html),
then try writing your own:

```js
// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Validate token here
  next();
};

// Use on specific routes
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected data' });
});
```

## Error Handling

Always handle errors properly:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
```

## Trial: Build a Task API

Create a RESTful API for managing tasks with the following endpoints:

1. `GET /tasks` - Get all tasks
2. `GET /tasks/:id` - Get a single task
3. `POST /tasks` - Create a new task (should have: title, description, completed)
4. `PUT /tasks/:id` - Update a task
5. `DELETE /tasks/:id` - Delete a task

Additional requirements:

- Add validation (task title is required)
- Add a filter to get only completed tasks: `GET /tasks?completed=true`
- Add error handling for invalid requests
- Add middleware to log all requests

Complete this trial and earn the badge **"Backend Builder"**

### Bonus

- Add user authentication with JWT tokens
- Create a simple front-end in React that consumes your API
- Deploy your API to a service like Heroku or Railway

You will earn the badge **"Full Stack Padawan"**

When finished with this trial, head over to [Node.js Part 2][node-part2] to learn about databases and SQL!

[node-part2]: https://github.com/mihaildono/padawan-project/blob/master/js/padawan/node-part2.md
