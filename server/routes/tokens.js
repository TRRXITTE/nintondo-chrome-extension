const { Router } = require('express');

const inscriptions = Router();
inscriptions.get('/:address', (req, res) => {
  res.json({
    address: req.params.address,
    inscriptions: [],
  });
});

const drc20 = Router();
drc20.get('/:address', (req, res) => {
  res.json({ address: req.params.address, tokens: [] });
});

const dunes = Router();
dunes.get('/:address', (req, res) => {
  res.json({ address: req.params.address, tokens: [] });
});

const meta = Router({ mergeParams: true });
meta.get('/:ticker', (req, res) => {
  const { protocol } = req.params;
  const { ticker } = req.params;
  res.json({
    protocol,
    ticker,
    floorPrice: 1_000_000,
    twentyFourHourVolume: 1000,
    currentSupply: 1_000_000,
    maxSupply: 21_000_000,
  });
});

module.exports = { inscriptions, drc20, dunes, meta };
