async function numberOfTransactions(txns, address, toOrFrom = "to") {
  if (address) {
    return txns.txns.filter((txn) => txn[`${toOrFrom}_address`] === address).length;
  }
  return txns.txns.length;
}

module.exports = numberOfTransactions;
