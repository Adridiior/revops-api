# RevOps API (Deals & Accounts)

Backend REST API built with Node.js, TypeScript and Express, using PostgreSQL (Railway) and Prisma ORM.

This project simulates a real-world Revenue Operations / CRM backend, designed to manage business deals linked to customer accounts and to be consumed by a frontend dashboard.


FEATURES

- Full CRUD for Deals
- Full CRUD for Accounts
- Relational model:
  - One Account → many Deals
- Advanced query filters:
  - GET /deals?stage=LEAD
  - GET /deals?owner=Adriano
  - GET /deals?stage=LEAD&owner=Adriano
- Input validation with Zod
- Centralized error handling
- Prisma migrations & seed data
- Clean REST architecture, ready for frontend integration


TECH STACK

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL (Railway)
- Zod
- dotenv
- CORS


GETTING STARTED

1) Install dependencies

npm install


2) Environment variables

Create a .env file in the project root:

PORT=3001
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/railway"

(see .env.example)


3) Run database migrations

npm run migrate


4) (Optional) Seed demo data

npm run seed


5) Start development server

npm run dev

API will be available at:
http://localhost:3001


API ENDPOINTS

Health Check
GET /health

curl http://localhost:3001/health


ACCOUNTS

Create account
POST /accounts

curl -X POST http://localhost:3001/accounts \
  -H "Content-Type: application/json" \
  -d '{"name":"Acme Inc","industry":"SaaS","website":"https://acme.com"}'


Get all accounts
GET /accounts

curl http://localhost:3001/accounts


DEALS

Create deal
POST /deals

curl -X POST http://localhost:3001/deals \
  -H "Content-Type: application/json" \
  -d '{"name":"Deal Test","value":1200,"stage":"QUALIFIED","owner":"Adriano"}'


Get deals (with filters)
GET /deals

curl "http://localhost:3001/deals?stage=LEAD"
curl "http://localhost:3001/deals?owner=Adriano"
curl "http://localhost:3001/deals?stage=LEAD&owner=Adriano"


Get deal by ID
GET /deals/:id

curl http://localhost:3001/deals/DEAL_ID


Update deal
PUT /deals/:id

curl -X PUT http://localhost:3001/deals/DEAL_ID \
  -H "Content-Type: application/json" \
  -d '{"value":2500,"stage":"PROPOSAL"}'


Delete deal
DELETE /deals/:id

curl -X DELETE http://localhost:3001/deals/DEAL_ID


NOTES

- Database hosted on Railway (PostgreSQL)
- Prisma migrations keep schema in sync
- Seed script generates demo data for fast testing
- Designed to be integrated with a React dashboard or any frontend client


WHY THIS PROJECT MATTERS

This project demonstrates:
- real backend architecture (not a tutorial app)
- relational data modeling
- validation and error handling
- API design ready for frontend consumption

It is intentionally built as a standalone API, but also meant to be integrated into a full-stack application.