const sb = require('satoshi-bitcoin');

function buildStubTx(prefix, payload) {
  return `${prefix}-${Buffer.from(JSON.stringify(payload)).toString('hex')}`;
}

async function prepareStandard({ sender, recipient, amount }) {
  const fee = 0.01;
  return {
    rawTx: buildStubTx('tx', { sender, recipient, amount }),
    fee,
    amount,
  };
}

async function prepareInscription({ sender, recipient, inscriptionId }) {
  const fee = 0.02;
  return {
    rawTx: buildStubTx('inscription', { sender, recipient, inscriptionId }),
    fee,
    amount: 0.1,
  };
}

async function prepareDune({ sender, recipient, amount }) {
  const fee = 0.015;
  return {
    rawTx: buildStubTx('dune', { sender, recipient, amount }),
    fee,
    amount,
  };
}

async function estimateSmartFee() {
  return { feerate: 0.0005 };
}

function satoshisToCoin(value) {
  return sb.toBitcoin(value);
}

module.exports = {
  prepareStandard,
  prepareInscription,
  prepareDune,
  estimateSmartFee,
  satoshisToCoin,
};
