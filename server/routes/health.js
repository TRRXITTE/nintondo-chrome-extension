const { Router } = require('express');

const health = Router();

health.get('/healthz', (_req, res) => res.json({ ok: true }));
health.get('/readyz', (_req, res) => res.json({ ok: true }));

module.exports = health;
