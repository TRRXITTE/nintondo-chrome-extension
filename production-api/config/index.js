require('dotenv').config({ path: process.env.ENV_PATH || '.env' });

const num = (v, fallback) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

module.exports = {
  port: num(process.env.PORT, 4000),
  apiKey: process.env.API_KEY || '',
  rpcUrl: process.env.NINTONDO_RPC_URL || '',
  priceFeedUrl: process.env.PRICE_FEED_URL || '',
  rateLimit: {
    windowMs: num(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    max: num(process.env.RATE_LIMIT_MAX, 600),
  },
  redisUrl: process.env.REDIS_URL || '',
  pgUrl: process.env.DATABASE_URL || '',
  allowRpcProxy: (process.env.ALLOW_RPC_PROXY ?? 'true') !== 'false',
};
