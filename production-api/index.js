const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { createTerminus } = require('@godaddy/terminus');
const { port } = require('./config');
const { limiter } = require('./middleware/rateLimit');
const { requestId } = require('./middleware/requestId');
const { auth } = require('./middleware/auth');
const { errorHandler } = require('./middleware/error');
const price = require('./routes/price');
const wallet = require('./routes/wallet');
const tx = require('./routes/tx');
const rpc = require('./routes/rpc');
const tokens = require('./routes/tokens');
const health = require('./routes/health');
const metrics = require('./routes/metrics');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestId);
app.use(limiter);
app.use(auth);

app.use('/price', price);
app.use('/wallet', wallet);
app.use('/v3/tx', tx);
app.use('/tx', tx);
app.use('/wallet/rpc', rpc);
app.use('/inscriptions', tokens.inscriptions);
app.use('/drc20', tokens.drc20);
app.use('/dunes', tokens.dunes);
app.use('/:protocol/data', tokens.meta);
app.use(health);
app.use(metrics);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Production Nintondo API listening on ${port}`);
});

createTerminus(server, {
  signals: ['SIGINT', 'SIGTERM'],
  onSignal: async () => {
    console.log('shutting down');
  },
});
