async function numberOfTransactions(txns, address, toOrFrom = "to") {
  if (address) {
    let num_txns = 0;
    if (typeof address == "string") {
      return txns.txns.filter((txn) => txn[`${toOrFrom}_address`] === address)
        .length;
    } else if (typeof address == Array) {
      address.forEach((_address, item) => {
        num_txns =
          num_txns +
          txns.txns.filter((txn) => txn[`${toOrFrom}_address`] === _address)
            .length;
      });

      return num_txns;
    }
  }
  return txns.txns.length;
}

module.exports = numberOfTransactions;
