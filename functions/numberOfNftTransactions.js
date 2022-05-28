async function numberOfNftTransactions(txns, address) {
  if (address) {
    let num_txns = 0;
    if (typeof address == "string") {
      return txns.filter((txn) => txn.token_address === address).length;
    } else if (typeof address == Array) {
      address.forEach((_address, item) => {
        num_txns =
          num_txns + txns.filter((txn) => txn.token_address === _address).length;
      });
      return num_txns;
    }
  }

  return txns.NFTs.length;
}

module.exports = numberOfNftTransactions;
