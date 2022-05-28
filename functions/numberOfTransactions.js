async function numberOfTransactions(txns, address, toOrFrom = "to") {
  if (address) {
    return txns.filter((txn) => txn[toOrFrom] === address).length;
  }
  return txns.txns.length;
}

module.exports = numberOfTransactions;
