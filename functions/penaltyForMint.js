const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/6iVDfSS8EzA8NMja2YyUFmZiZ9pqcYeo"
  )
);

async function penaltyForMint(txns) {
  const transactions = txns.txns;
  let penaltyTransactionsCount = 0;
  const null_address = "0x0000000000000000000000000000000000000000";
  transactions.forEach(async (txn) => {
    // for mints
    if (
      txn.from_address == null_address ||
      txn.input.substring(0, 10) == "0x449a52f8"
    ) {
      // we need to check if the next few txns in the array have a timestamp lesser than 24 hours from timestamp of this txn.
      async function checkTimestamp(txns, txn) {
        const transactions = txns;
        const timestamp = txn.block_timestamp;
        const time_difference = 24 * 60 * 60 * 1000;
        let mint_txn = transactions.filter(
          (t) =>
            new Date(t.block_timestamp) > new Date(timestamp) &&
            new Date(t.block_timestamp) - new Date(timestamp) < time_difference
        );
        const penaltyTransactions = [];
        const token1 = await web3.eth.getTransaction(txn.hash);
        const token2 = await web3.eth.getTransaction(txn.hash);
        if (mint_txn.length > 0) {
          mint_txn.map((t) => {
            // these methods are for transfer, uniswap multicall and approve
            if (
              (t.input.substring(0, 10) == "0xa9059cbb" ||
                t.input.substring(0, 10) == "0x5ae401dc" ||
                t.input.substring(0, 10) == "0x095ea7b3") &&
              token1.to == token2.to
            ) {
              penaltyTransactions.push(t);
            }
          });
        }
        return penaltyTransactions;
      }
      const penaltyList = await checkTimestamp(transactions, txn);
      penaltyTransactionsCount += penaltyList.length;
      console.log(penaltyTransactionsCount);
    }
    return penaltyTransactionsCount;
  });
}

module.exports = penaltyForMint;
