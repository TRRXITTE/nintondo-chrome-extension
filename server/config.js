require('dotenv').config();

const required = (value, fallback) =>
  value === undefined || value === null || value === ''
    ? fallback
    : value;

module.exports = {
  port: Number(process.env.PORT) || 4000,
  apiKey: process.env.API_KEY || '',
  nodeRpcUrl: process.env.NINTONDO_RPC_URL || '',
  priceFeedUrl: process.env.PRICE_FEED_URL || '',
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000,
    max: Number(process.env.RATE_LIMIT_MAX) || 600,
  },
  featureFlags: {
    allowRpcProxy: required(process.env.ALLOW_RPC_PROXY, 'true') !== 'false',
  },
};
