const { pg } = require('../clients/pg');

async function getInscriptions(address) {
  // TODO: replace with real storage
  return { address, inscriptions: [] };
}

async function getDrc20(address) {
  return { address, tokens: [] };
}

async function getDunes(address) {
  return { address, tokens: [] };
}

async function getTokenMeta(protocol, ticker) {
  if (pg) {
    const { rows } = await pg.query(
      'select protocol, ticker, floor_price, volume_24h, current_supply, max_supply, updated_at from token_meta where protocol=$1 and ticker=$2 limit 1',
      [protocol, ticker]
    );
    if (rows[0]) {
      const r = rows[0];
      return {
        protocol: r.protocol,
        ticker: r.ticker,
        floorPrice: Number(r.floor_price),
        twentyFourHourVolume: Number(r.volume_24h),
        currentSupply: Number(r.current_supply),
        maxSupply: Number(r.max_supply),
        updatedAt: r.updated_at,
      };
    }
  }
  return {
    protocol,
    ticker,
    floorPrice: 0,
    twentyFourHourVolume: 0,
    currentSupply: 0,
    maxSupply: 0,
  };
}

module.exports = { getInscriptions, getDrc20, getDunes, getTokenMeta };
