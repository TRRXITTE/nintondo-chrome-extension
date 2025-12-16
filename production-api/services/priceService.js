const axios = require('axios');
const { priceFeedUrl } = require('../config');
const { redis } = require('../clients/redis');

const CACHE_KEY = 'nintondo:price:usd';
const TTL = 30;

async function getUsdPrice() {
  // try cache
  if (redis) {
    const cached = await redis.get(CACHE_KEY);
    if (cached) return JSON.parse(cached);
  }
  let usd = 0;
  try {
    if (!priceFeedUrl) throw new Error('PRICE_FEED_URL not set');
    const res = await axios.get(priceFeedUrl, { timeout: 5000 });
    usd = Number(res.data?.usd || res.data?.price || res.data);
  } catch (e) {
    usd = 0;
  }
  const payload = { usd, updatedAt: Date.now() };
  if (redis) await redis.setex(CACHE_KEY, TTL, JSON.stringify(payload));
  return payload;
}

module.exports = { getUsdPrice };
