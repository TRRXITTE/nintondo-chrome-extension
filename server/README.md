# Nintondo Mock API

Lightweight Express mock that satisfies the extension’s API calls for local development.

## Run

```bash
yarn mock-api
# or
PORT=4000 node server/mockApi.js
```

## Production API (scaffold)

- Env vars (see `.env.example`):
  - `PORT` (default 4000)
  - `API_KEY` (optional bearer token)
  - `NINTONDO_RPC_URL` (future upstream node proxy)
  - `PRICE_FEED_URL` (future price source)
  - `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`
- Start: `yarn api` (or `yarn api:dev`)
- Endpoints: `/price`, `/wallet/info`, `/wallet/rpc`, `/v3/tx/prepare`, `/tx/prepare/inscription`, `/tx/prepare/dune`, `/inscriptions/:address`, `/drc20/:address`, `/dunes/:address`, `/:protocol/data/:ticker`, `/healthz`, `/readyz`, `/metrics`

Stub logic mirrors the Chrome extension needs; replace services in `server/services/*` with real node/DB integrations for production.

## Endpoints

- `GET /price` → `{ usd, updatedAt }`
- `GET /wallet/info?route=/tx/{id}` → tx metadata (stubbed)
- `POST /v3/tx/prepare` → `{ rawTx, fee, amount }`
- `POST /tx/prepare/inscription` → `{ rawTx, fee, amount }`
- `POST /tx/prepare/dune` → `{ rawTx, fee, amount }`
- `POST /wallet/rpc` (estimatesmartfee) → `{ result: { feerate } }`
- `GET /inscriptions/:address`, `/drc20/:address`, `/dunes/:address` → empty lists
- `GET /:protocol/data/:ticker` → token meta

The app is intentionally static. Replace the handlers with real persistence, mempool access, and signing/broadcast logic for production.
