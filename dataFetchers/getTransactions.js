import { MESSAGE_TYPES } from '../scripts/helpers/constants';
import { sendMessage } from '../scripts/helpers/message';
import { formatTransaction } from '../utils/transactions';

export const getTransactionsKey = (
  pageIndex,
  previousPageData,
  walletAddress
) => {
  if (previousPageData && !previousPageData.length) return null;
  return [pageIndex + 1, walletAddress, `/transactions/${walletAddress}`];
};

export const getTransactions = ([pageIndex, walletAddress]) =>
  new Promise((resolve, reject) => {
    sendMessage(
      {
        message: MESSAGE_TYPES.GET_TRANSACTIONS,
        data: {
          address: walletAddress,
          page: pageIndex,
        },
      },
      (response) => {
        // response may be { transactions, totalPages, page }
        const transactions = response?.transactions;
        if (Array.isArray(transactions)) {
          const formattedTransactions = transactions.map((transaction) =>
            formatTransaction({ transaction, walletAddress })
          );
          resolve(formattedTransactions);
        } else {
          reject(new Error('Failed to get recent transactions'));
        }
      }
    );
  });
