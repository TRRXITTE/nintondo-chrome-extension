const { Router } = require('express');
const { getInscriptions, getDrc20, getDunes, getTokenMeta } = require('../services/tokenService');

const inscriptions = Router();
inscriptions.get('/:address', async (req, res, next) => {
  try {
    res.json(await getInscriptions(req.params.address));
  } catch (err) {
    next(err);
  }
});

const drc20 = Router();
drc20.get('/:address', async (req, res, next) => {
  try {
    res.json(await getDrc20(req.params.address));
  } catch (err) {
    next(err);
  }
});

const dunes = Router();
dunes.get('/:address', async (req, res, next) => {
  try {
    res.json(await getDunes(req.params.address));
  } catch (err) {
    next(err);
  }
});

const meta = Router({ mergeParams: true });
meta.get('/:ticker', async (req, res, next) => {
  try {
    res.json(await getTokenMeta(req.params.protocol, req.params.ticker));
  } catch (err) {
    next(err);
  }
});

module.exports = { inscriptions, drc20, dunes, meta };
