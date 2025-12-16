const { Client } = require('pg');
const { pgUrl } = require('../config');

let pg;
if (pgUrl) {
  pg = new Client({ connectionString: pgUrl });
  pg.connect().catch((err) => {
    console.error('Failed to connect to Postgres', err);
  });
}

module.exports = { pg };
