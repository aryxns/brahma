async function numberOfNftTransactions(txns, query) {
  let address;
  if (query) {
    address = query.address || query;
    console.log(address)
    let num_txns = 0;
    if (typeof address === "string") {
      return txns.NFTs.filter(
        (txn) => txn.token_address.toLowerCase() === address.toLowerCase()
      ).length;
    } else {
      address.map((a) => {
        num_txns += txns.NFTs.filter(
          (txn) => txn.token_address.toLowerCase() === a.toLowerCase()
        ).length;
      });
      return num_txns;
    }
  }
  return txns.NFTs.length;
}

module.exports = numberOfNftTransactions;
// 0x95cd50F9d591630db85D95c932bbc704DC0aE92A
