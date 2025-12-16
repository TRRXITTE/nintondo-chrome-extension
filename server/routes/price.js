const { Router } = require('express');
const { getUsdPrice } = require('../services/priceService');

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const price = await getUsdPrice();
    res.json(price);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
