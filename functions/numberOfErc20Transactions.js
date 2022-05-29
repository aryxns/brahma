async function numberOfErc20Transactions(txns, query) {
  let address;
  if (query) {
    try {
      address = query.address;
    } catch (e) {
      address = query;
    }
    let num_txns = 0;
    if (typeof address === "string") {
      return txns.ERC20s.filter(
        (txn) => txn.address.toLowerCase() === address.toLowerCase()
      ).length;
    } else {
      address.map((a) => {
        num_txns += txns.ERC20s.filter(
          (txn) => txn.address.toLowerCase() === a.toLowerCase()
        ).length;
      });
      return num_txns;
    }
  }
  return txns.ERC20s.length;
}

module.exports = numberOfErc20Transactions;
// 0x95cd50F9d591630db85D95c932bbc704DC0aE92A
