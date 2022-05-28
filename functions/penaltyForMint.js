const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("6cNPtRjviUYaviwhTwXvFAAAwHpE4jWo")
);

async function penaltyForMint(txns, address, toOrFrom = "to") {
  const transactions = txns.txns;
  transactions.map((txn) => {
    // for mints
    const null_address = "0x0000000000000000000000000000000000000000";
    if (txn.from_address == null_address) {
      // we need to check if the next few txns in the array have a timestamp lesser than 24 hours from timestamp of this txn.
      function checkTimestamp(txns, txn) {
        const transactions = txns.txns;
        const timestamp = txn.timestamp;
        const time_difference = 24 * 60 * 60 * 1000;
        let mint_txn = transactions.filter(
          (txn) => txn.timestamp - timestamp < time_difference
        );
        const penaltyTransactions = [];
        const token1 = await web3.eth.getTransaction(txn.hash)
        const token2 = await web3.eth.getTransaction(txn.hash)
        if (mint_txn.length > 0) {
          mint.txn.map((t) => {
            // these methods are for transfer, uniswap multicall and approve
            if (
              (t.input == "0xa9059cbb" ||
              t.input == "0x5ae401dc" ||
              t.input == "0x095ea7b3"
            ) && ("0x"+token1.substring(38, 78) == "0x"+token2.substring(38, 78))) {
              penaltyTransactions.push(t);
            }
          });
        }
        return penaltyTransactions;
      }
      const penaltyList = checkTimestamp(txns, txn);
      return penaltyList.length;
    }
  });
  return 0;
}

module.exports = penaltyForMint;
