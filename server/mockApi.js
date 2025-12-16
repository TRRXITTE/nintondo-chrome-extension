// Simple mock Nintondo API used by the extension for local development.
// This is intentionally minimal and returns deterministic, fake data.

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory stub data
const now = () => Math.floor(Date.now() / 1000);
const FAKE_PRICE_USD = 0.1234;
const FAKE_FEE_RATE = 0.0005; // coins per KB

// Price endpoint
app.get('/price', (_req, res) => {
  res.json({ usd: FAKE_PRICE_USD, updatedAt: now() });
});

// Wallet info proxy (simplified)
app.get('/wallet/info', (req, res) => {
  const { route } = req.query;
  if (route?.startsWith('/tx/')) {
    const txid = route.replace('/tx/', '');
    return res.json({
      txid,
      status: 'confirmed',
      confirmations: 1,
      amount: 1,
      fee: 0.01,
      blockTime: now(),
      address: 'NfakeAddressxxxxxxxxxxxxxxx',
    });
  }

  // Generic wallet info
  return res.json({
    balance: 1_000_000_000, // satoshis
    addresses: ['NfakeAddressxxxxxxxxxxxxxxx'],
  });
});

// Estimate smart fee and other RPC passthroughs
app.post('/wallet/rpc', (req, res) => {
  const { method, id } = req.body;
  if (method === 'estimatesmartfee') {
    return res.json({
      id,
      result: { feerate: FAKE_FEE_RATE },
    });
  }
  return res.json({ id, result: {} });
});

// Build a raw transaction (stub hex + fee)
app.post('/v3/tx/prepare', (req, res) => {
  const { sender, recipient, amount } = req.body;
  res.json({
    rawTx: `rawtx-${sender}-${recipient}-${amount}`,
    fee: 0.01,
    amount,
  });
});

// Inscription transaction
app.post('/tx/prepare/inscription', (req, res) => {
  const { sender, recipient, inscriptionId } = req.body;
  res.json({
    rawTx: `raw-inscription-${sender}-${recipient}-${inscriptionId}`,
    fee: 0.02,
    amount: 0.1,
  });
});

// Dunes transaction
app.post('/tx/prepare/dune', (req, res) => {
  const { sender, recipient, amount } = req.body;
  res.json({
    rawTx: `raw-dune-${sender}-${recipient}-${amount}`,
    fee: 0.015,
    amount,
  });
});

// Inscriptions, DRC20, Dunes inventory
app.get('/inscriptions/:address', (req, res) => {
  res.json({
    address: req.params.address,
    inscriptions: [],
  });
});

app.get('/drc20/:address', (req, res) => {
  res.json({ address: req.params.address, tokens: [] });
});

app.get('/dunes/:address', (req, res) => {
  res.json({ address: req.params.address, tokens: [] });
});

// Token meta
app.get('/:protocol/data/:ticker', (req, res) => {
  const { protocol, ticker } = req.params;
  res.json({
    protocol,
    ticker,
    floorPrice: 1_000_000, // satoshis
    twentyFourHourVolume: 1000,
    currentSupply: 1_000_000,
    maxSupply: 21_000_000,
  });
});

app.listen(port, () => {
  console.log(`Mock Nintondo API listening on port ${port}`);
});
