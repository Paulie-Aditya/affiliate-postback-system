# Affiliate Postback System (S2S Tracking) MVP

## What is a Postback (S2S Tracking)?

In affiliate marketing, a postback is a server-to-server (S2S) notification that records a conversion (e.g., a purchase) without relying on browser cookies or pixels. The flow is:

- A user clicks an affiliate link tracked by the affiliate system.
- The affiliate system stores the click (affiliate_id, campaign_id, click_id, timestamp).
- If the user converts, the advertiser calls the affiliate system's postback URL with the `click_id` and conversion details.
- The affiliate system validates the click and records the conversion.

Example:

- Click: `GET /click?affiliate_id=1&campaign_id=10&click_id=abc123`
- Postback: `GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD`

## Tech Stack

- Backend: Node.js + Express, PostgreSQL (`pg`)
- Frontend: Next.js (App Router)

## Repository Structure

- `backend/` — Express API, Postgres schema and seed
- `frontend/` — Next.js dashboard UI and postback URL page

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Database Setup (PostgreSQL)

1. Create a database (and optionally a user):

```
psql -U postgres -c "CREATE DATABASE affiliate_db;"
# Optional dedicated user
psql -U postgres -c "CREATE USER affiliate_user WITH PASSWORD 'affiliate_pass';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE affiliate_db TO affiliate_user;"
```

2. Configure environment variables. Create `backend/.env` with:

```
SUPABASE_HOST=localhost
SUPABASE_PORT=5432
SUPABASE_DB=affiliate_db
SUPABASE_USER=postgres
SUPABASE_PASSWORD=postgres
PORT=4000
```

(Adjust values if you created a dedicated DB user.)

3. Apply schema and seed data:

```
psql -h localhost -U postgres -d affiliate_db -f backend/schema.sql
psql -h localhost -U postgres -d affiliate_db -f backend/seed.sql
```

The schema creates:

- `affiliates(id, name)`
- `campaigns(id, name)`
- `clicks(id, affiliate_id, campaign_id, click_id, timestamp, UNIQUE(affiliate_id, campaign_id, click_id))`
- `conversions(id, click_id, amount, currency, timestamp)`

## Run the Backend

```
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:4000`.

## Run the Frontend

```
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

## Example API Requests

- Health check:

```
curl "http://localhost:4000/"
```

- Record a click:

```
curl "http://localhost:4000/click?affiliate_id=1&campaign_id=10&click_id=abc123"
```

- Fire a postback (conversion):

```
curl "http://localhost:4000/postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD"
```

- List clicks for an affiliate:

```
curl "http://localhost:4000/clicks?affiliate_id=1"
```

- List conversions for an affiliate:

```
curl "http://localhost:4000/conversions?affiliate_id=1"
```

## Frontend Pages

- Dashboard: `http://localhost:3000`
  - Choose affiliate (simulated), view Clicks and Conversions.
- Postback URL: `http://localhost:3000/postback`
  - Shows the affiliate’s unique postback URL format and lets you copy it.

### Unique Postback URL Format

```
http://localhost:4000/postback?affiliate_id={AFFILIATE_ID}&click_id={CLICK_ID}&amount={AMOUNT}&currency={CURRENCY}
```

## Notes

- This MVP uses a simple select to simulate affiliate login.
- Click uniqueness is enforced by `(affiliate_id, campaign_id, click_id)` to prevent duplicates.
- Amount is stored as `DECIMAL(10,2)` and currency as a 3-letter code (e.g., USD, EUR).
