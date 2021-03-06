const numberOfTransactions = require("./numberOfTransactions");
const numberOfErc20Transactions = require("./numberOfErc20Transactions");
const numberOfNftTransactions = require("./numberOfNftTransactions");
const castVote = require("./castVote");

const defi = require("./defi");
const actions = require("./actions");
const getNFTs = require("./NFTs");
const { penaltyForMint, rewardForHoldingLong } = require("./penaltyForMint");
const getStakedTokens = require("./stakedTokens");
const outstandingLoans = require("./outstandingLoans");
const arweave = require("./arweave");
const getEns = require("../oldFunctions/ens");
const nativeBalance = require("./nativeBalance");
const contractConstants = require("../curated_theme_contracts.json");
const age = require("./age");
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
  numberOfPolygonBridges: async (txns) =>
    await numberOfTransactions(
      txns,
      [
        "0xA0c68C638235ee32657e8f720a23ceC1bFc77C77",
        "0x401f6c983ea34274ec46f84d70b31c151321188b",
      ],
      "from"
    ),
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
  everHeldNft: async (txns, data) => {
    console.log(data);
    if ((await numberOfNftTransactions(txns, data.address)) > 0) {
      return 1;
    }
    return 0;
  },

  numberOfMints: async (txns) => await actions(txns, "mint"),
  numberOfWithdraws: async (txns) => await actions(txns, "withdraw"),
  numberOfBurns: async (txns) => await actions(txns, "burn"),
  numberOfContractInteractions: async (txns, data) =>
    await numberOfTransactions(txns, data.address),
  numberOfContractInteractionsSent: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfBorrows: async (txns) => await defi(txns, "borrow"),
  numberOfRepayments: async (txns) => await defi(txns, "repay"),
  numberOfStakingTransactions: async (txns) => await defi(txns, "stake"),
  numberOfApprovals: async (txns) => await defi(txns, "approve"),
  numberOfClaims: async (txns) => await defi(txns, "claim"),
  numberOfOpenseaTransactions: async (txns) => await actions(txns, "opensea"),
  numberOfProposalsCreated: async (txns) =>
    await defi(txns, "proposal_created"),
  everCastedVote: async (txns) => castVote(txns, false),
  numberOfVotesCasted: async (txns) => castVote(txns, true),
  numberOfNFTsHeld: async (txns, data, address) => {
    const x = (await getNFTs(address)).number_of_NFTs;
    console.log(x);
    return x;
  },

  nativeBalance: async (txns, data, address) => {
    const x = await nativeBalance(address);
    return x;
  },

  numberOfBluechipsHeld: async (txns, data, address) =>
    (await getNFTs(address)).number_of_bluechip,
  // isNFTPFP: async () => await
  penaltyForMinting: async (txns) => await penaltyForMint(txns),
  rewardForHolding: async (txns) => await rewardForHoldingLong(txns),
  stakedTokens: async (txns, data) => {
    const x = (await getStakedTokens(txns, data.address)).staked_tokens;
    console.log(x);
    return x;
  },
  numberOfDeposits: async (txns) => await defi(txns, "deposit"),
  numberOfOutStandingPayments: async (txns, data) =>
    outstandingLoans(txns, "outstandingDaysAverage"),
  numberOfOutStandingDays: async (txns, data) =>
    outstandingLoans(txns, "outstandingPayments"),
  getArweaveBalance: async (txns, data) => await arweave(data, true),
  getArweaveTxnSize: async (txns, data) => await arweave(data, false),
  haveEns: async (txns, data, address) => {
    const x = await getEns(address);
    console.log(x);
    return x;
  },
  compoundUsage: async (txns, data) =>
    await numberOfTransactions(txns, contractConstants.compound),
  walletAge: async (txns, data) => await age(txns),
};

module.exports = queries;
