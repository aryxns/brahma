async function numberOfErc20Transactions(txns, address) {
  if (address) {
    return txns.filter((txn) => txn.token_address === address).length;
  }
  return txns.ERC20s.length;
}

module.exports = numberOfErc20Transactions;
