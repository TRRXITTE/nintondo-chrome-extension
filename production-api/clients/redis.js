const Redis = require('ioredis');
const { redisUrl } = require('../config');

let client;
if (redisUrl) {
  client = new Redis(redisUrl);
}

module.exports = { redis: client };
