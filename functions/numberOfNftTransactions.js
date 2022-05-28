async function numberOfNftTransactions(txns, address) {
  if (address) {
    return txns.filter((txn) => txn.token_address === address).length;
  }

  return txns.NFTs.length;
}

module.exports = numberOfNftTransactions;
