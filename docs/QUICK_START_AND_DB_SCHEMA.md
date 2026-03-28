# CertaFix Quick Start and Database Schema Reference

This guide gives you:
- A quick local startup flow for all services
- Full documentation of every enum, model, and field in the Prisma database schema

## Quick Start

## Prerequisites

- Node.js 20+
- npm 10+
- Python 3.11+
- uv (Python package manager/environment tool)
- PostgreSQL connection (Supabase or local Postgres)
- Stripe test keys (for payment flows)

## 1) Configure Environment Files

Create and fill these files from their examples:
- root: .env (optional, for shared values)
- database: database/.env
- backend: backend/.env
- website: frontend/website/.env.local
- admin: frontend/admin/.env.local

Minimum required values:
- DATABASE_URL
- DIRECT_URL
- SECRET_KEY
- ADMIN_EMAIL
- ADMIN_PASSWORD_HASH
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_API_URL (for both frontend apps)

## 2) Database (Prisma)

Run migrations and seed data:

```bash
cd database
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

Optional checks:

```bash
npx prisma studio
npx prisma validate
```

## 3) Backend (FastAPI)

```bash
cd backend
uv venv .venv
source .venv/bin/activate
uv pip install --python .venv/bin/python -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend URLs:
- API base: http://localhost:8000/api/v1
- Swagger: http://localhost:8000/docs

## 4) Frontend Website (User App)

```bash
cd frontend/website
npm install
npm run dev
```

Open: http://localhost:3000

## 5) Frontend Admin (Admin App)

```bash
cd frontend/admin
npm install
npm run dev
```

Open: http://localhost:3011

## 6) Optional: Run with Docker Compose

```bash
docker compose up --build
```

Services:
- backend: http://localhost:8000
- website: http://localhost:3000
- admin: http://localhost:3011
- postgres: localhost:5432

## Prisma Schema Documentation

Source: database/prisma/schema.prisma

## Enums

## PriceType
- FIXED: Single flat price.
- HOURLY: Price is per hour.
- STARTING_AT: Minimum starting price.
- RANGE: Price uses both price and price_max.

## BookingStatus
- PENDING: Newly created, not yet confirmed.
- CONFIRMED: Accepted and scheduled.
- IN_PROGRESS: Work is currently happening.
- COMPLETED: Work has finished.
- CANCELLED: Booking was cancelled.

## QuoteStatus
- PENDING: Awaiting admin response.
- QUOTED: Amount and/or notes provided by admin.
- ACCEPTED: Customer accepted quote.
- DECLINED: Customer declined quote.
- EXPIRED: Quote validity ended.

## PaymentStatus
- PENDING: Payment intent created but not settled.
- SUCCEEDED: Payment successfully captured/confirmed.
- FAILED: Payment failed.
- REFUNDED: Payment refunded.

## Models

## ServiceCategory
DB table: service_categories

| Field       | Type          | Required | Default   | Notes                                     |
| ----------- | ------------- | -------- | --------- | ----------------------------------------- |
| id          | String (UUID) | Yes      | uuid()    | Primary key.                              |
| name        | String        | Yes      | -         | Unique category name.                     |
| slug        | String        | Yes      | -         | Unique URL slug.                          |
| description | String        | No       | null      | Optional category details.                |
| imageUrl    | String        | No       | null      | Mapped to image_url.                      |
| isActive    | Boolean       | Yes      | true      | Mapped to is_active. Soft enable/disable. |
| sortOrder   | Int           | Yes      | 0         | Mapped to sort_order. Display ordering.   |
| createdAt   | DateTime      | Yes      | now()     | Mapped to created_at.                     |
| updatedAt   | DateTime      | Yes      | updatedAt | Mapped to updated_at. Auto-updated.       |
| services    | Service[]     | Yes      | -         | One-to-many relation to services.         |

## Service
DB table: services

| Field            | Type            | Required | Default   | Notes                                            |
| ---------------- | --------------- | -------- | --------- | ------------------------------------------------ |
| id               | String (UUID)   | Yes      | uuid()    | Primary key.                                     |
| categoryId       | String (UUID)   | Yes      | -         | Mapped to category_id. FK to ServiceCategory.id. |
| name             | String          | Yes      | -         | Service display name.                            |
| slug             | String          | Yes      | -         | Unique service slug.                             |
| description      | String          | Yes      | -         | Full service description.                        |
| shortDescription | String          | No       | null      | Mapped to short_description.                     |
| imageUrl         | String          | No       | null      | Mapped to image_url.                             |
| isActive         | Boolean         | Yes      | true      | Mapped to is_active.                             |
| createdAt        | DateTime        | Yes      | now()     | Mapped to created_at.                            |
| updatedAt        | DateTime        | Yes      | updatedAt | Mapped to updated_at. Auto-updated.              |
| category         | ServiceCategory | Yes      | -         | Many-to-one relation to category.                |
| prices           | ServicePrice[]  | Yes      | -         | One-to-many relation to price tiers.             |
| bookingItems     | BookingItem[]   | Yes      | -         | Reverse relation from bookings.                  |
| quoteItems       | QuoteItem[]     | Yes      | -         | Reverse relation from quote items.               |

## ServicePrice
DB table: service_prices

| Field        | Type          | Required | Default   | Notes                                                     |
| ------------ | ------------- | -------- | --------- | --------------------------------------------------------- |
| id           | String (UUID) | Yes      | uuid()    | Primary key.                                              |
| serviceId    | String (UUID) | Yes      | -         | Mapped to service_id. FK to Service.id.                   |
| name         | String        | Yes      | -         | Price tier label (for example Basic, Premium).            |
| description  | String        | No       | null      | Optional details for this tier.                           |
| priceType    | PriceType     | Yes      | -         | Mapped to price_type enum value.                          |
| price        | Decimal(10,2) | Yes      | -         | Base price.                                               |
| priceMax     | Decimal(10,2) | No       | null      | Mapped to price_max. Used mainly when priceType is RANGE. |
| unit         | String        | No       | null      | Optional unit, for example hour, visit, sqft.             |
| isActive     | Boolean       | Yes      | true      | Mapped to is_active.                                      |
| createdAt    | DateTime      | Yes      | now()     | Mapped to created_at.                                     |
| updatedAt    | DateTime      | Yes      | updatedAt | Mapped to updated_at. Auto-updated.                       |
| service      | Service       | Yes      | -         | Many-to-one relation to service.                          |
| bookingItems | BookingItem[] | Yes      | -         | Reverse relation from booking items.                      |
| quoteItems   | QuoteItem[]   | Yes      | -         | Reverse relation from quote items.                        |

## Booking
DB table: bookings

| Field             | Type          | Required | Default   | Notes                                             |
| ----------------- | ------------- | -------- | --------- | ------------------------------------------------- |
| id                | String (UUID) | Yes      | uuid()    | Primary key.                                      |
| customerName      | String        | Yes      | -         | Mapped to customer_name.                          |
| customerEmail     | String        | Yes      | -         | Mapped to customer_email.                         |
| customerPhone     | String        | Yes      | -         | Mapped to customer_phone.                         |
| address           | String        | Yes      | -         | Service address line.                             |
| city              | String        | Yes      | -         | Service city.                                     |
| zipCode           | String        | Yes      | -         | Mapped to zip_code.                               |
| preferredDate     | DateTime      | Yes      | -         | Mapped to preferred_date. Requested date/time.    |
| preferredTimeSlot | String        | Yes      | -         | Mapped to preferred_time_slot.                    |
| notes             | String        | No       | null      | Customer notes.                                   |
| status            | BookingStatus | Yes      | PENDING   | Current booking status.                           |
| totalEstimate     | Decimal(10,2) | No       | null      | Mapped to total_estimate.                         |
| createdAt         | DateTime      | Yes      | now()     | Mapped to created_at.                             |
| updatedAt         | DateTime      | Yes      | updatedAt | Mapped to updated_at. Auto-updated.               |
| items             | BookingItem[] | Yes      | -         | One-to-many relation to selected services/prices. |
| payment           | Payment       | No       | null      | One-to-one relation to payment record.            |

## BookingItem
DB table: booking_items

| Field          | Type          | Required | Default | Notes                                              |
| -------------- | ------------- | -------- | ------- | -------------------------------------------------- |
| id             | String (UUID) | Yes      | uuid()  | Primary key.                                       |
| bookingId      | String (UUID) | Yes      | -       | Mapped to booking_id. FK to Booking.id.            |
| serviceId      | String (UUID) | Yes      | -       | Mapped to service_id. FK to Service.id.            |
| servicePriceId | String (UUID) | Yes      | -       | Mapped to service_price_id. FK to ServicePrice.id. |
| quantity       | Int           | Yes      | 1       | Quantity multiplier.                               |
| unitPrice      | Decimal(10,2) | Yes      | -       | Mapped to unit_price. Snapshotted at booking time. |
| subtotal       | Decimal(10,2) | Yes      | -       | quantity x unitPrice.                              |
| booking        | Booking       | Yes      | -       | Many-to-one relation to booking.                   |
| service        | Service       | Yes      | -       | Many-to-one relation to service.                   |
| servicePrice   | ServicePrice  | Yes      | -       | Many-to-one relation to service price tier.        |

## QuoteRequest
DB table: quote_requests

| Field         | Type          | Required | Default   | Notes                                                   |
| ------------- | ------------- | -------- | --------- | ------------------------------------------------------- |
| id            | String (UUID) | Yes      | uuid()    | Primary key.                                            |
| customerName  | String        | Yes      | -         | Mapped to customer_name.                                |
| customerEmail | String        | Yes      | -         | Mapped to customer_email.                               |
| customerPhone | String        | Yes      | -         | Mapped to customer_phone.                               |
| address       | String        | Yes      | -         | Project address.                                        |
| city          | String        | Yes      | -         | Project city.                                           |
| zipCode       | String        | Yes      | -         | Mapped to zip_code.                                     |
| description   | String        | Yes      | -         | Customer problem/project details.                       |
| status        | QuoteStatus   | Yes      | PENDING   | Current quote lifecycle state.                          |
| adminNotes    | String        | No       | null      | Mapped to admin_notes. Internal/admin response notes.   |
| quotedAmount  | Decimal(10,2) | No       | null      | Mapped to quoted_amount.                                |
| quotedAt      | DateTime      | No       | null      | Mapped to quoted_at. When quote response was finalized. |
| createdAt     | DateTime      | Yes      | now()     | Mapped to created_at.                                   |
| updatedAt     | DateTime      | Yes      | updatedAt | Mapped to updated_at. Auto-updated.                     |
| items         | QuoteItem[]   | Yes      | -         | One-to-many relation to quote line items.               |

## QuoteItem
DB table: quote_items

| Field          | Type          | Required | Default | Notes                                                       |
| -------------- | ------------- | -------- | ------- | ----------------------------------------------------------- |
| id             | String (UUID) | Yes      | uuid()  | Primary key.                                                |
| quoteId        | String (UUID) | Yes      | -       | Mapped to quote_id. FK to QuoteRequest.id.                  |
| serviceId      | String (UUID) | No       | null    | Mapped to service_id. Optional FK to Service.id.            |
| servicePriceId | String (UUID) | No       | null    | Mapped to service_price_id. Optional FK to ServicePrice.id. |
| description    | String        | Yes      | -       | Line-item description, supports custom text.                |
| estimatedPrice | Decimal(10,2) | No       | null    | Mapped to estimated_price.                                  |
| quote          | QuoteRequest  | Yes      | -       | Many-to-one relation to parent quote request.               |
| service        | Service       | No       | null    | Optional relation to catalog service.                       |
| servicePrice   | ServicePrice  | No       | null    | Optional relation to catalog service price.                 |

## Payment
DB table: payments

| Field                 | Type          | Required | Default   | Notes                                           |
| --------------------- | ------------- | -------- | --------- | ----------------------------------------------- |
| id                    | String (UUID) | Yes      | uuid()    | Primary key.                                    |
| bookingId             | String (UUID) | Yes      | -         | Unique. Mapped to booking_id. FK to Booking.id. |
| stripePaymentIntentId | String        | Yes      | -         | Unique. Mapped to stripe_payment_intent_id.     |
| amount                | Decimal(10,2) | Yes      | -         | Charged amount.                                 |
| currency              | String        | Yes      | usd       | ISO currency code.                              |
| status                | PaymentStatus | Yes      | PENDING   | Payment state.                                  |
| paidAt                | DateTime      | No       | null      | Mapped to paid_at.                              |
| createdAt             | DateTime      | Yes      | now()     | Mapped to created_at.                           |
| updatedAt             | DateTime      | Yes      | updatedAt | Mapped to updated_at. Auto-updated.             |
| booking               | Booking       | Yes      | -         | One-to-one relation to booking.                 |

## Notes on Naming and Mapping

- Prisma model/field names are camelCase for application code.
- Database table/column names are mapped to snake_case via @@map and @map.
- UUID columns use @db.Uuid.
- Money values use Decimal(10,2) to avoid floating-point rounding issues.
- Soft visibility is controlled by isActive on catalog entities.
