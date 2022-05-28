const numberOfTransactions = require("./numberOfTransactions");
const numberOfErc20Transactions = require("./numberOfErc20Transactions");
const numberOfNftTransactions = require("./numberOfNftTransactions");
const castVote = require("./castVote");
const actions = require("./actions");

const queries = {
  numberOfTransactions: async (txns, data) =>
    await numberOfTransactions(txns, data),
  numberOfErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data),
  numberOfNftTransactions: async (txns) => await numberOfNftTransactions(txns),
  numberOfTransactionsTo: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfTransactionsFrom: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "from"),
  numberOfSpecificErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data.address),
  numberOfSpecificNftTransactions: async (txns, data) =>
    await numberOfNftTransactions(txns, data.address),
  everHeldERC20: async (txns, data) => {
    if ((await numberOfErc20Transactions(txns, data.address)) > 0) {
      return 1;
    }
    return 0;
  },
  everHeldNft: async (txns, data) =>
    await numberOfNftTransactions(txns, data.address),
  numberOfContractInteractions: async (txns, data) =>
    await numberOfTransactions(txns, data.address),
  numberOfContractInteractionsSent: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfBorrows: async (txns) => await lendBorrow(txns, "borrow"),
  numberOfRepayments: async (txns) => await actions(txns, "repay"),
  numberOfStakingTransactions: async (txns) => await actions(txns, "stake"),
  numberOfProposalsCreated: async (txns) => await actions(txns, "proposal_created"),
  everCastedVote: async (txns) => await castVote(txns),
};

module.exports = queries;
