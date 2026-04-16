# FORFX Content Studio Dashboard

A full-stack content management dashboard for the FORFX prop trading brand. Manage posts, scripts, filming, analytics, and platform content across Instagram, YouTube, and LinkedIn — all in one dark/gold interface.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (custom properties), Vanilla JS (ES6+) |
| Backend | Node.js, Express 4 |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | bcrypt password hashing |

No build tools or bundlers required.

---

## Features

- **Login / Sign Up** — real API auth with bcrypt, session persisted in localStorage
- **Content Posts** — full CRUD table (create, edit, delete) backed by PostgreSQL
- **Dashboard** — welcome banner, stat cards, upcoming posts, script queue, filming tracker, engagement charts, and monthly goals
- **Content Calendar** — scheduled posts with platform tags
- **Script Library** — script queue with status pills (Approved / In Review / Draft)
- **Ideas Board** — content idea cards with platform chips
- **Analytics** — weekly engagement bar charts for Instagram and YouTube
- **Filming Tracker** — toggle filmed/not-filmed per item with live counter
- **Profile Page** — creator profile with stats
- **Live Search** — filters across posts, scripts, filming tracker, and ideas
- **Notification Dropdown** — bell icon with notification panel

---

## Folder Structure

```
my-dashboard/
├── frontend/
│   ├── index.html          # SPA shell — all pages, components, and modals
│   ├── style.css           # Design system — variables, layout, all components
│   └── app.js              # Client JS — routing, auth, CRUD, search, notifications
├── backend/
│   ├── controllers/
│   │   ├── authController.js           # register, login
│   │   ├── contentPostsController.js   # GET, POST, PUT, DELETE
│   │   └── healthController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contentPosts.js
│   │   └── health.js
│   ├── prisma/
│   │   ├── schema.prisma       # User and ContentPost models
│   │   └── migrations/
│   ├── server.js               # Express app entry point
│   ├── package.json
│   ├── .env                    # Local environment (gitignored)
│   └── .env.example            # Template — copy this to .env
├── index.html                  # Root redirect → frontend/index.html
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/register` | Create a new account |
| `POST` | `/api/auth/login` | Log in |
| `GET` | `/api/content-posts` | List all posts |
| `POST` | `/api/content-posts` | Create a post |
| `PUT` | `/api/content-posts/:id` | Update a post |
| `DELETE` | `/api/content-posts/:id` | Delete a post |

---

## Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL running locally

### 1. Clone the repo

```bash
git clone https://github.com/potroosh/My-dashboard.git
cd My-dashboard
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `backend/.env` and fill in your values:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db"
PORT=3000
```

### 4. Create the PostgreSQL database

```bash
psql -U postgres
CREATE DATABASE dashboard_db;
CREATE USER dashboard_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE dashboard_db TO dashboard_user;
\q
```

### 5. Run database migrations

```bash
cd backend
npx prisma migrate dev
```

### 6. Start the backend server

```bash
npm run dev        # development (nodemon, auto-restarts)
# or
npm start          # production
```

The API will be running at `http://localhost:3000`.

### 7. Open the frontend

Open `frontend/index.html` directly in your browser, or serve it with any static file server:

```bash
npx serve frontend
```

Then go to `http://localhost:3000` (or wherever the static server runs).

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `PORT` | Port the Express server listens on | `3000` |

Never commit your `.env` file. It is listed in `.gitignore`.
