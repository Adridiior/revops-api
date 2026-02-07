# RevOps API (Deals + Accounts)

Backend REST API built with Node.js, TypeScript and Express, using PostgreSQL (Railway) and Prisma ORM.
Includes input validation (Zod), centralized error handling, seed data, and relational queries (Deal → Account).

---

## Features

- CRUD for Deals
- CRUD for Accounts
- Relational model: one Account has many Deals (accountId on Deal)
- Query filters: GET /deals?stage=LEAD&owner=Adriano
- Zod validation with clear error responses
- Prisma migrations and seed script

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

## Getting Started

1. Install dependencies

npm install

2. Environment variables

Create a .env file in the project root:

PORT=3001
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/railway"

3. Run database migrations

npm run migrate

4. (Optional) Seed demo data

npm run seed

5. Start the development server

npm run dev

API will be available at:
http://localhost:3001

---

## API Endpoints

Health Check
GET /health

curl http://localhost:3001/health

---

Accounts
POST /accounts

curl -X POST http://localhost:3001/accounts
-H "Content-Type: application/json"
-d '{"name":"Acme Inc","industry":"SaaS","website":"https://acme.com"}'

GET /accounts

curl http://localhost:3001/accounts

---

Deals
POST /deals

curl -X POST http://localhost:3001/deals
-H "Content-Type: application/json"
-d '{"name":"Deal Test","value":1200,"stage":"QUALIFIED","owner":"Adriano"}'

GET /deals (filters)

curl "http://localhost:3001/deals?stage=LEAD"
curl "http://localhost:3001/deals?owner=Adriano"
curl "http://localhost:3001/deals?stage=LEAD&owner=Adriano"

GET /deals/:id

curl http://localhost:3001/deals/DEAL_ID

PUT /deals/:id

curl -X PUT http://localhost:3001/deals/DEAL_ID
-H "Content-Type: application/json"
-d '{"value":2500,"stage":"PROPOSAL"}'

DELETE /deals/:id

curl -X DELETE http://localhost:3001/deals/DEAL_ID

---

Notes

- Database hosted on Railway (PostgreSQL)
- Prisma migrations keep schema in sync
- Seed script generates demo data for fast testing
- Designed to be consumed by a React dashboard or frontend client