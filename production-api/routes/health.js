const { Router } = require('express');

const router = Router();
router.get('/healthz', (_req, res) => res.json({ ok: true }));
router.get('/readyz', (_req, res) => res.json({ ok: true }));

module.exports = router;
