export function getTxSummary(tx, address) {
  // console.log('tx', tx);
  const ret = { type: '', amount: 0, fromAddr: '', toAddr: '' };
  // Assumes one to one sender / receiver per tx, TODO multiple
  tx.inputs.forEach((input) => {
    // console.log('input', input);
    input.addresses.forEach((addr) => {
      if (addr === address) {
        ret.type = 'outgoing';
        ret.fromAddr = address;
      } else if (ret.type === '') {
        ret.type = 'incoming';
        ret.fromAddr = addr;
      }
    });
  });
  ret.amount = 0;
  tx.outputs.forEach((output) => {
    // console.log('output', output);
    output.addresses?.forEach((addr) => {
      if (
        (ret.type === 'incoming' && addr === address) ||
        (ret.type === 'outgoing' && addr !== address)
      ) {
        ret.amount += output.value;
        ret.toAddr = ret.type === 'incoming' ? address : addr;
      }
    });
  });

  return ret;
}

export const formatTransaction = ({ transaction: tx, walletAddress }) => {
  let type = 'incoming';
  let amountIn = 0;
  let amountOut = 0;
  let totalIn = 0;
  let totalOut = 0;
  let incomingAddress = tx.address || '';
  let outgoingAddress = tx.address || '';
  const fallbackAmountSats = Number(tx.dogeAmount || 0) * 1e8;

  (tx.vin || []).forEach((input = {}) => {
    const addresses = input.addresses || [];
    const [address] = addresses;
    const value = Number(input.value || 0);

    if (!incomingAddress && address && address !== walletAddress) {
      incomingAddress = address;
    }

    if (addresses.includes(walletAddress)) {
      amountOut += value;
    }

    totalIn += value;
  });

  (tx.vout || []).forEach((output = {}) => {
    const addresses = output.addresses || [];
    if (addresses.length) {
      const [address] = addresses;
      const value = Number(output.value || 0);

      if (!outgoingAddress && address && address !== walletAddress) {
        outgoingAddress = address;
      }

      if (addresses.includes(walletAddress)) {
        amountIn += value;
      }

      totalOut += value;
    } else if (tx.vout?.[2]?.addresses?.[0]) {
      outgoingAddress = tx.vout[2].addresses[0];
    }
  });

  if (amountOut > amountIn) {
    type = 'outgoing';
  }

  const feeRaw = totalIn - totalOut;
  const fee = Number.isFinite(feeRaw) ? feeRaw : 0;
  let amountRaw =
    type === 'incoming' ? amountIn - amountOut : amountOut - amountIn - fee;
  let amount = Number.isFinite(amountRaw) ? amountRaw : 0;

  if (amount === 0 && fallbackAmountSats) {
    amount = fallbackAmountSats;
    type =
      tx.address && tx.address !== walletAddress ? 'outgoing' : 'incoming';
    incomingAddress = incomingAddress || tx.address || '';
    outgoingAddress = outgoingAddress || tx.address || '';
  }
  let address = type === 'incoming' ? incomingAddress : outgoingAddress;
  const { txid: id, blockTime, confirmations } = tx;

  if (type === 'outgoing' && amount < 0) {
    address = incomingAddress || outgoingAddress;
    type = 'incoming';
    amount = -amount;
  }

  return {
    address: address || tx.address || 'Unknown',
    amount: Number.isFinite(amount) ? amount : 0,
    type,
    blockTime,
    id,
    confirmations,
    fee: Number.isFinite(fee) ? fee : 0,
  };
};
