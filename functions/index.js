const numberOfTransactions = require("./numberOfTransactions");
const numberOfErc20Transactions = require("./numberOfErc20Transactions");
const numberOfNftTransactions = require("./numberOfNftTransactions");
const castVote = require("./castVote");
const lendBorrow = require("./lendBorrow");

const queries = {
  numberOfTransactions: async (txns) => await numberOfTransactions(txns),
  numberOfErc20Transactions: async (txns) =>
    await numberOfErc20Transactions(txns),
  numberOfNftTransactions: async (txns) => await numberOfNftTransactions(txns),
  numberOfTransactionsTo: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfTransactionsFrom: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "from"),
  numberOfSpecificErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data.address),
  numberOfSpecificNftTransactions: async (txns, data) =>
    await numberOfNftTransactions(txns, data.address),
  everHeldERC20: async (txns, data) =>
    await numberOfErc20Transactions(txns, data.address),
  everHeldNft: async (txns, data) =>
    await numberOfNftTransactions(txns, data.address),
  numberOfContractInteractions: async (txns, data) =>
    await numberOfTransactions(txns, data.address),
  numberOfContractInteractionsSent: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  everCastedVote: async (txns) => await castVote(txns),
  numberOfBorrows: async (txns) => 
    await lendBorrow(txns, "borrow"),
  numberOfRepayments: async (txns) => 
    await lendBorrow(txns, "repay")
};

module.exports = queries;
