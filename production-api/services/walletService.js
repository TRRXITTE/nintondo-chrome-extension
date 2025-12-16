const { callRpc } = require('../clients/rpc');

async function getWalletInfo() {
  // Placeholder for aggregated info; real implementation should query DB or RPC
  return {
    balance: 0,
    addresses: [],
  };
}

async function getTransactionInfo(txid) {
  try {
    const tx = await callRpc('getrawtransaction', [txid, true]);
    return {
      txid,
      confirmations: tx.confirmations || 0,
      status: tx.confirmations > 0 ? 'confirmed' : 'pending',
      dogeAmount: tx.vout?.[0]?.value || 0,
      blockTime: tx.blocktime || 0,
      address: tx.vout?.[0]?.scriptPubKey?.addresses?.[0],
    };
  } catch (e) {
    return {
      txid,
      confirmations: 0,
      status: 'unknown',
      dogeAmount: 0,
      blockTime: 0,
      address: '',
    };
  }
}

async function scanAddressUtxos(address) {
  try {
    const result = await callRpc('scantxoutset', [
      'start',
      [{ desc: `addr(${address})` }],
    ]);
    return result?.unspents ?? [];
  } catch (e) {
    return [];
  }
}

async function getAddressInfo(address) {
  // Try descriptor scan first; if unavailable, fall back to listunspent.
  let utxos = [];
  try {
    utxos = await scanAddressUtxos(address);
  } catch (_err) {
    utxos = [];
  }

  if (!utxos.length) {
    try {
      utxos = await callRpc('listunspent', [1, 9999999, [address]]);
    } catch (_err) {
      utxos = [];
    }
  }

  const balanceCoins = utxos.reduce(
    (sum, u) => sum + Number(u.amount || u.value || 0),
    0
  );
  const balanceSats = Math.round(balanceCoins * 1e8);
  return {
    balance: balanceSats,
    txids: utxos.map((u) => u.txid).filter(Boolean),
    totalPages: 1,
    page: 1,
  };
}

module.exports = { getWalletInfo, getTransactionInfo, getAddressInfo };
