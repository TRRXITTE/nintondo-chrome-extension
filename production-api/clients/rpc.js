const axios = require('axios');
const { rpcUrl } = require('../config');

async function callRpc(method, params = []) {
  if (!rpcUrl) {
    throw Object.assign(new Error('RPC URL not configured'), { status: 500 });
  }
  const payload = {
    jsonrpc: '2.0',
    id: `${method}-${Date.now()}`,
    method,
    params,
  };
  const res = await axios.post(rpcUrl, payload, { timeout: 10_000 });
  if (res.data.error) {
    throw Object.assign(new Error(res.data.error.message || 'RPC error'), {
      status: 502,
      details: res.data.error,
    });
  }
  return res.data.result;
}

module.exports = { callRpc };
