const bitcoin = require('bitcoinjs-lib');
const sb = require('satoshi-bitcoin');
const { callRpc } = require('../clients/rpc');

// Nintondo network params (align with extension)
const network = {
  messagePrefix: '\x19Nintondo Signed Message:\n',
  bech32: 'nt',
  bip32: { public: 0x02facafd, private: 0x02fac398 },
  pubKeyHash: 0x35,
  scriptHash: 0x41,
  wif: 0xb5,
};

function selectUtxos(utxos, target) {
  let total = 0;
  const chosen = [];
  for (const utxo of utxos) {
    chosen.push(utxo);
    total += sb.toSatoshi(utxo.amount || utxo.value || 0);
    if (total >= target) break;
  }
  if (total < target) {
    throw Object.assign(new Error('Insufficient funds'), { status: 400 });
  }
  return { chosen, total };
}

async function listSpendableUtxos(address) {
  const utxos = await callRpc('listunspent', [1, 9999999, [address]]);
  return utxos.map((u) => ({
    txid: u.txid,
    vout: u.vout,
    amount: u.amount,
    scriptPubKey: u.scriptPubKey,
  }));
}

async function buildUnsignedTx({ sender, recipient, amount }) {
  const utxos = await listSpendableUtxos(sender);
  const target = sb.toSatoshi(amount);
  const { chosen, total } = selectUtxos(utxos, target);

  const txb = new bitcoin.TransactionBuilder(network);
  chosen.forEach((u) => txb.addInput(u.txid, u.vout));
  txb.addOutput(recipient, target);

  const feeSats = sb.toSatoshi(0.01); // placeholder fee; could use size * feerate
  const change = total - target - feeSats;
  if (change > 0) txb.addOutput(sender, change);

  const rawTx = txb.buildIncomplete().toHex();
  return { rawTx, fee: sb.toBitcoin(feeSats), amount };
}

async function prepareStandard({ sender, recipient, amount }) {
  return buildUnsignedTx({ sender, recipient, amount });
}

async function prepareInscription({ sender, recipient, inscriptionId }) {
  // Placeholder: treat like a small tx with metadata
  return buildUnsignedTx({ sender, recipient, amount: 0.1 });
}

async function prepareDune({ sender, recipient, amount }) {
  return buildUnsignedTx({ sender, recipient, amount });
}

async function estimateSmartFee() {
  try {
    const res = await callRpc('estimatesmartfee', [1]);
    return res || { feerate: 0.0005 };
  } catch (e) {
    return { feerate: 0.0005 };
  }
}

module.exports = {
  prepareStandard,
  prepareInscription,
  prepareDune,
  estimateSmartFee,
};
