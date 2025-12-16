const { Router } = require('express');
const client = require('prom-client');

client.collectDefaultMetrics();

const router = Router();

router.get('/metrics', async (_req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = router;
