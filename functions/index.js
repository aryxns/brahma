const numberOfTransactions = require("./numberOfTransactions");
const numberOfErc20Transactions = require("./numberOfErc20Transactions");
const numberOfNftTransactions = require("./numberOfNftTransactions");
const castVote = require("./castVote");
const defi = require("./defi");
const actions = require("./actions");
const getNFTs = require("./NFTs");
const penaltyForMint = require("./penaltyForMint");
const outstandingLoans = require("./outstandingLoans");
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
  numberOfMints: async (txns) => await actions(txns, "mint"),
  numberOfWithdraws: async (txns) => await actions(txns, "withdraw"),
  numberOfBurns: async (txns) => await actions(txns, "burn"),
  numberOfContractInteractions: async (txns, data) =>
    await numberOfTransactions(txns, data.address),
  numberOfContractInteractionsSent: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfBorrows: async (txns) => await actions(txns, "borrow"),
  numberOfRepayments: async (txns) => await actions(txns, "repay"),
  numberOfStakingTransactions: async (txns) => await actions(txns, "stake"),
  numberOfOpenseaTransactions: async (txns) => await actions(txns, "opensea"),
  numberOfProposalsCreated: async (txns) => await actions(txns, "proposal_created"),
  everCastedVote: async (txns) => await castVote(txns),
  numberOfNFTsHeld: async (txns, data, address) => await (await getNFTs(address)).number_of_NFTs,
  numberOfBluechipsHeld: async (txns, data, address) => await (await getNFTs(address)).number_of_bluechip,
  // isNFTPFP: async () => await 
  penaltyForMinting: async (txns, data) =>
    await penaltyForMint(txns, data.address),
  numberOfDeposits: async (txns) => await defi(txns, "deposit"),
  numberOfOutStandingPayments: async (txns, data) =>
    outstandingLoans(txns, data),
  numberOfOutStandingDays: async (txns, data) => outstandingLoans(txns, data),
};

module.exports = queries;
