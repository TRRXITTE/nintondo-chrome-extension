const { Router } = require('express');
const { allowRpcProxy } = require('../config');
const { callRpc } = require('../clients/rpc');
const { estimateSmartFee } = require('../services/txService');

const router = Router();
const WHITELIST = new Set(['estimatesmartfee', 'getblockchaininfo', 'getblockcount']);

router.post('/', async (req, res, next) => {
  try {
    if (!allowRpcProxy) {
      return res.status(403).json({ code: 'forbidden', message: 'RPC proxy disabled' });
    }
    const { method, params = [], id } = req.body;
    if (!WHITELIST.has(method)) {
      return res.status(400).json({ code: 'invalid_method', message: 'Method not allowed' });
    }
    if (method === 'estimatesmartfee') {
      return res.json({ id, result: await estimateSmartFee() });
    }
    const result = await callRpc(method, params);
    return res.json({ id, result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
