# Agile Sprint Board — Backend API

Node.js + Express REST API for the BiCXO Sprint Board. Handles authentication, task management, and serves data to the Angular frontend.

**Frontend Repo:** https://github.com/Keertan-Lashkare/Agile-Sprint-Board-Web

---

## Prerequisites

Make sure these are installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) v14 or higher

---

## Step 1 — Setup PostgreSQL Database

Open your terminal and log into PostgreSQL:

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE sprintboard;
\q
```

> **Note:** You do not need to create any tables manually. Sequelize will create the `users` and `tasks` tables automatically when the server starts for the first time.

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Create Environment File

Create a file named `.env` in the root of this folder:

```env
PORT=5000

DB_NAME=sprintboard
DB_USER=postgres
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=any_random_secret_key
JWT_EXPIRES_IN=1d
```

> Change `DB_PASS` to your actual PostgreSQL password.

---

## Step 4 — Start the Server

```bash
# Development mode (auto-restarts on file change)
npm run dev

# Production mode
npm start
```

Server runs at → **http://localhost:5000**

You should see in the terminal:
```
database is connected
Server running in port : 5000
```

---

## API Endpoints

All task routes require a `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and get JWT token |
| `GET` | `/api/auth/users` | Get list of all users |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get tasks (with filters & pagination) |
| `POST` | `/api/tasks` | Create a new task |
| `PATCH` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

#### GET /api/tasks — Query Parameters

| Parameter | Type | Example | Description |
|-----------|------|---------|-------------|
| `column` | string | `todo` | Filter by column (`todo`, `in_progress`, `done`) |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Tasks per page |
| `search` | string | `fix bug` | Search in title and description |
| `priority` | string | `high` | Filter by priority (`low`, `medium`, `high`) |
| `assignedTo` | number | `2` | Filter by assigned user ID |

---

## Database Commands

```sql
-- Connect to the database
psql -U postgres -d sprintboard

-- View all users
SELECT id, name, email, "createdAt" FROM users;

-- View all tasks
SELECT id, title, priority, column, "createdBy", "assignedTo" FROM tasks;

-- View tasks with creator names
SELECT t.id, t.title, t.priority, t.column, u.name AS creator
FROM tasks t
JOIN users u ON t."createdBy" = u.id
ORDER BY t."createdAt" DESC;

-- Delete all tasks
DELETE FROM tasks;

-- Delete all users
DELETE FROM users;
```

---

## Project Structure

```
├── config/         # Sequelize database connection
├── controllers/    # Request handlers
├── middleware/     # JWT authentication middleware
├── models/         # Sequelize models (User, Task)
├── routes/         # Express route definitions
├── services/       # Business logic
├── .env            # Environment variables (create this)
├── index.js        # App entry point
└── package.json
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize v6
- **Auth:** JWT + bcryptjs
