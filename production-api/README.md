# Nintondo Production API

An Express-based API backing the Chrome extension with RPC/UTXO/price integrations, Redis caching, and Postgres token meta storage.

## Run

```bash
cp .env.example .env
yarn install
yarn api:dev   # development
# or
yarn api       # production mode
```

Environment (see `.env.example`):
- `PORT` (default 4000)
- `API_KEY` (optional Bearer token)
- `NINTONDO_RPC_URL` (JSON-RPC to your Nintondo node)
- `PRICE_FEED_URL` (HTTP endpoint returning `{ usd }`)
- `REDIS_URL` (for price cache/rate limit)
- `DATABASE_URL` (Postgres for token meta)
- `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `ALLOW_RPC_PROXY`

## Endpoints
- `GET /price`
- `GET /wallet/info?route=/tx/{id}` or wallet summary
- `POST /v3/tx/prepare`
- `POST /tx/prepare/inscription`
- `POST /tx/prepare/dune`
- `POST /wallet/rpc` (whitelisted methods)
- `GET /inscriptions/:address`
- `GET /drc20/:address`
- `GET /dunes/:address`
- `GET /:protocol/data/:ticker`
- `GET /healthz`, `/readyz`, `/metrics`

## Notes
- Tx builder now uses real RPC `listunspent` and `estimatesmartfee` (fallback). It assembles unsigned P2PKH txs matching the extension’s network params.
- Price service fetches from `PRICE_FEED_URL` with Redis caching fallback.
- Token meta will query Postgres `token_meta` table if present.
- RPC proxy is whitelisted and can be disabled via `ALLOW_RPC_PROXY=false`.

## Docker
Use `docker-compose` at repo root to bring up API + Redis + Postgres (added separately).
