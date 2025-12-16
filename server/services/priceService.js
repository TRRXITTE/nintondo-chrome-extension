let cachedPrice = { usd: 0.1234, updatedAt: Date.now() };
const TTL_MS = 30_000;

async function getUsdPrice() {
  const now = Date.now();
  if (now - cachedPrice.updatedAt < TTL_MS) return cachedPrice;
  // TODO: fetch from real feed; placeholder returns cached default
  cachedPrice = { usd: cachedPrice.usd, updatedAt: now };
  return cachedPrice;
}

module.exports = { getUsdPrice };
