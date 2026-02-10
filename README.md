# RevOps API (Deals & Accounts)

**Live API:** https://revops-api-production.up.railway.app

Backend REST API built with Node.js, TypeScript and Express, using PostgreSQL (Railway) and Prisma ORM.

This project simulates a real-world Revenue Operations / CRM backend, designed to manage business deals linked to customer accounts and to be consumed by a frontend dashboard.

---

## Features

- Full CRUD for Deals
- Full CRUD for Accounts
- Relational data model
  - One Account → many Deals
- Advanced query filters
  - `GET /deals?stage=LEAD`
  - `GET /deals?owner=Adriano`
  - `GET /deals?stage=LEAD&owner=Adriano`
- Input validation with Zod
- Centralized error handling
- Production-safe database bootstrap and controlled seeding
- Clean REST architecture, designed for frontend consumption

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (Railway)
- Zod
- dotenv
- CORS

---

## Getting Started (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
PORT=3001
PRISMA_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/railway
```

(see `.env.example`)

### 3. Sync database schema

```bash
npx prisma db push
```

### 4. (Optional) Seed demo data

```bash
npm run seed
```

### 5. Start development server

```bash
npm run dev
```

API available at:
```
http://localhost:3001
```

---

## Production Setup

- Database is hosted on **Railway PostgreSQL** (internal service connection)
- On startup, the API automatically synchronizes the database schema using:

```bash
prisma db push
```

- A controlled seed process is available for production via the `RUN_SEED` environment variable.
  - When `RUN_SEED=true`, demo data is inserted once at startup
  - The variable is removed immediately after seeding to avoid re-running it

This ensures a safe, repeatable production bootstrap without manual database access.

---

## API Endpoints

### Health Check

```
GET /health
```

### Accounts

- `POST /accounts`
- `GET /accounts`

### Deals

- `POST /deals`
- `GET /deals` (supports filters)
- `GET /deals/:id`
- `PUT /deals/:id`
- `DELETE /deals/:id`

---

## Why This Project Matters

This API demonstrates:

- Real production deployment (Railway)
- Relational data modeling with Prisma
- Environment-safe database initialization
- Controlled data seeding for demos
- API design ready for real frontend consumption

It is built as a standalone service, but also designed to be part of a full-stack application.
