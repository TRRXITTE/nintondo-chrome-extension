const { Router } = require('express');
const { getUsdPrice } = require('../services/priceService');

const router = Router();
router.get('/', async (_req, res, next) => {
  try {
    res.json(await getUsdPrice());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
