# CertaFix — Handyman Services Website

Full-stack handyman services platform with service catalog, online booking, quote requests, and Stripe payments.

## Tech Stack

| Layer            | Technology                                         |
| ---------------- | -------------------------------------------------- |
| **Database**     | Supabase (PostgreSQL) + Prisma (schema/migrations) |
| **Backend**      | Python FastAPI + SQLModel (async)                  |
| **User Website** | Next.js 15 (App Router) + Tailwind CSS             |
| **Admin Portal** | Next.js 15 (App Router) + Tailwind CSS             |
| **Payments**     | Stripe                                             |
| **Auth**         | JWT (single admin)                                 |

## Project Structure

```
certafix-website/
├── database/          # Prisma schema, migrations, seed data
├── backend/           # FastAPI REST API (Python)
└── frontend/
    ├── website/       # Customer-facing website (Next.js)
    └── admin/         # Admin dashboard (Next.js)
```

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- uv
- Supabase account (or local Supabase CLI)

### 1. Database Setup

```bash
cd database
npm install
# Update .env with your Supabase connection string
npx prisma migrate dev
npx prisma db seed
```

### 2. Backend

```bash
cd backend
uv venv .venv
source .venv/bin/activate
uv pip install --python .venv/bin/python -r requirements.txt
# Update .env with your credentials
uvicorn app.main:app --reload --port 8000
```

### 3. User Website

```bash
cd frontend/website
npm install
npm run dev  # runs on http://localhost:3000
```

### 4. Admin Portal

```bash
cd frontend/admin
npm install
npm run dev -- -p 3011  # runs on http://localhost:3011
```

## API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc