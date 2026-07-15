# BiCXO Sprint Board

**Frontend:** https://github.com/Keertan-Lashkare/Agile-Sprint-Board-Web

**Backend:** https://github.com/Keertan-Lashkare/Agile-Sprint-Board-Api

---

## 1. Database Setup

Open terminal and connect to PostgreSQL:

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE sprintboard;
\c sprintboard
```

Create the tables:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(10) NOT NULL DEFAULT 'low' CHECK (priority IN ('low', 'medium', 'high')),
  "column" VARCHAR(20) NOT NULL DEFAULT 'todo' CHECK ("column" IN ('todo', 'in_progress', 'done')),
  "dueDate" DATE, -- 👈 Added deadline/dueDate field (YYYY-MM-DD format)
  "assignedTo" INTEGER REFERENCES users(id) ON DELETE SET NULL,
  "createdBy" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

Exit psql:

```sql
\q
```

---

## 2. Backend Setup

```bash
git clone https://github.com/Keertan-Lashkare/Agile-Sprint-Board-Api.git
cd Agile-Sprint-Board-Api
npm install
```

Create a `.env` file in the root folder:

```env
PORT=5000
DB_NAME=sprintboard
DB_USER=postgres
DB_PASS=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=any_secret_key
JWT_EXPIRES_IN=1d
```

Start the server:

```bash
npm run dev
```

Runs at → `http://localhost:5000`

---

## 3. Frontend Setup

Open a new terminal:

```bash
git clone https://github.com/Keertan-Lashkare/Agile-Sprint-Board-Web.git
cd Agile-Sprint-Board-Web
npm install
npm serve
```

Runs at → `http://localhost:4200`
