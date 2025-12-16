const { Router } = require('express');
const { featureFlags } = require('../config');
const { estimateSmartFee } = require('../services/txService');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    if (!featureFlags.allowRpcProxy) {
      return res.status(403).json({ code: 'forbidden', message: 'RPC proxy disabled' });
    }
    const { method, id } = req.body;
    if (method === 'estimatesmartfee') {
      return res.json({ id, result: await estimateSmartFee() });
    }
    return res.json({ id, result: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
