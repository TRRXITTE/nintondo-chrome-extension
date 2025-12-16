const { apiKey } = require('../config');

function auth(req, res, next) {
  if (!apiKey) return next();
  const header = req.headers.authorization || '';
  const token = header.replace(/^Bearer\s+/i, '');
  if (token === apiKey) return next();
  return res.status(401).json({ code: 'unauthorized', message: 'Invalid API key' });
}

module.exports = { auth };
