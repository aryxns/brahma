const numberOfTransactions = require("./numberOfTransactions");
const numberOfErc20Transactions = require("./numberOfErc20Transactions");
const numberOfNftTransactions = require("./numberOfNftTransactions");

const queries = {
  numberOfTransactions: async (txns) => await numberOfTransactions(txns),
  numberOfErc20Transactions: async (txns) =>
    await numberOfErc20Transactions(txns),
  numberOfNftTransactions: async (txns) => await numberOfNftTransactions(txns),
  numberOfTransactionsTo: async (txns, address) =>
    numberOfTransactions(txns, address, "to"),
  numberOfTransactionsFrom: async (txns, address) =>
    numberOfTransactions(txns, address, "from"),
  numberOfSpecificErc20Transactions: async (txns, address) =>
    numberOfErc20Transactions(txns, address),
  numberOfSpecificNftTransactions: async (txns, address) =>
    numberOfNftTransactions(txns, address),
  everHeldERC20: async (txns, address) =>
    numberOfErc20Transactions(txns, address),
  everHeldNft: async (txns, address) => numberOfNftTransactions(txns, address),
};

module.exports = queries;
