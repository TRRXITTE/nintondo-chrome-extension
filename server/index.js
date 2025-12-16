const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { createTerminus } = require('@godaddy/terminus');
const { port } = require('./config');
const { authMiddleware } = require('./middleware/auth');
const { requestId } = require('./middleware/requestId');
const { limiter } = require('./middleware/rateLimit');
const { errorHandler } = require('./middleware/error');
const priceRoutes = require('./routes/price');
const walletRoutes = require('./routes/wallet');
const txRoutes = require('./routes/tx');
const rpcRoutes = require('./routes/rpc');
const tokenRoutes = require('./routes/tokens');
const healthRoutes = require('./routes/health');
const metricsRoutes = require('./routes/metrics');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestId);
app.use(limiter);
app.use(authMiddleware);

app.use('/price', priceRoutes);
app.use('/wallet', walletRoutes);
app.use('/v3/tx', txRoutes);
app.use('/tx', txRoutes); // inscription/dune share
app.use('/wallet/rpc', rpcRoutes);
app.use('/inscriptions', tokenRoutes.inscriptions);
app.use('/drc20', tokenRoutes.drc20);
app.use('/dunes', tokenRoutes.dunes);
app.use('/:protocol/data', tokenRoutes.meta);
app.use(healthRoutes);
app.use(metricsRoutes);

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Nintondo API listening on ${port}`);
});

createTerminus(server, {
  signals: ['SIGINT', 'SIGTERM'],
  onSignal: async () => {
    console.log('shutting down');
  },
});
