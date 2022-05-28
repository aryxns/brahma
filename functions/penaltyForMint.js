async function penaltyForMint(txns, address, toOrFrom = "to") {
  const transactions = txns.txns;
  let penaltyTransactionsCount = 0;

  transactions.forEach((txn) => {
    // for mints
    const null_address = "0x0000000000000000000000000000000000000000";
    if (
      txn.from_address == null_address ||
      txn.input.substring(0, 10) == "0x449a52f8"
    ) {
      // we need to check if the next few txns in the array have a timestamp lesser than 24 hours from timestamp of this txn.
      function checkTimestamp(txns, txn) {
        const transactions = txns;
        const timestamp = txn.block_timestamp;
        const time_difference = 24 * 60 * 60 * 1000;
        console.log(new Date(timestamp));
        let mint_txn = transactions.filter(
          (t) =>
            new Date(t.block_timestamp) > new Date(timestamp) && new Date(t.block_timestamp) - new Date(timestamp) < time_difference
        );
        const penaltyTransactions = []
        console.log(mint_txn);
        if (mint_txn.length > 0) {
          mint_txn.map((t) => {
            // these methods are for transfer, uniswap multicall and approve
            if (
              t.input.substring(0, 10) == "0xa9059cbb" ||
              t.input.substring(0, 10) == "0x5ae401dc" ||
              t.input.substring(0, 10) == "0x095ea7b3"
            ) {
              console.log("should work bitch");
              penaltyTransactions.push(t);
            }
          });
        }
        return penaltyTransactions;
      }
      const penaltyList = checkTimestamp(transactions, txn);
      penaltyTransactionsCount += penaltyList.length;
    }
  });
  console.log("Penalty Transactions Count: ", penaltyTransactionsCount);
  return penaltyTransactionsCount;
}

module.exports = penaltyForMint;
