const { Router } = require('express');
const {
  prepareStandard,
  prepareInscription,
  prepareDune,
} = require('../services/txService');

const router = Router();

router.post('/prepare', async (req, res, next) => {
  try {
    const { sender, recipient, amount } = req.body;
    res.json(await prepareStandard({ sender, recipient, amount }));
  } catch (err) {
    next(err);
  }
});

router.post('/prepare/inscription', async (req, res, next) => {
  try {
    const { sender, recipient, inscriptionId } = req.body;
    res.json(await prepareInscription({ sender, recipient, inscriptionId }));
  } catch (err) {
    next(err);
  }
});

router.post('/prepare/dune', async (req, res, next) => {
  try {
    const { sender, recipient, amount } = req.body;
    res.json(await prepareDune({ sender, recipient, amount }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
