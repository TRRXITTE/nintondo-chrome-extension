const { Router } = require('express');
const {
  getWalletInfo,
  getTransactionInfo,
  getAddressInfo,
} = require('../services/walletService');
const url = require('url');

const router = Router();

router.get('/info', async (req, res, next) => {
  try {
    const { route } = req.query;
    if (route && String(route).startsWith('/tx/')) {
      const txid = String(route).replace('/tx/', '');
      return res.json(await getTransactionInfo(txid));
    }
    if (route && String(route).startsWith('/address/')) {
      const parsed = url.parse(route, true);
      const address = parsed.pathname.replace('/address/', '');
      const info = await getAddressInfo(address);
      // Include paging keys to satisfy extension expectations
      return res.json({
        balance: info.balance,
        txids: info.txids,
        totalPages: info.totalPages,
        page: info.page,
      });
    }
    return res.json(await getWalletInfo());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
