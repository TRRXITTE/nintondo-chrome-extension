const { Router } = require('express');
const { satoshisToCoin } = require('../services/txService');

const router = Router();

router.get('/info', (req, res) => {
  const { route } = req.query;
  if (route && String(route).startsWith('/tx/')) {
    const txid = String(route).replace('/tx/', '');
    return res.json({
      txid,
      confirmations: 1,
      status: 'confirmed',
      dogeAmount: 1,
      blockTime: Date.now() / 1000,
      address: 'NfakeAddressxxxxxxxxxxxxxxx',
    });
  }

  return res.json({
    balance: 1_000_000_000,
    addresses: [],
  });
});

module.exports = router;
