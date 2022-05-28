async function numberOfErc20Transactions(txns, address) {
  console.log(address)
  if (address) {
    let num_txns = 0;
    if (typeof address == "string") {
      return txns.filter((txn) => txn.token_address === address).length;
    } else if (typeof address == Array) {
      address.forEach((_address, item) => {
        num_txns =
          num_txns +
          txns.filter((txn) => txn.token_address === _address).length;
      });
      console.log(num_txns);
      process.exit();
      return num_txns;
    }
  }
  return txns.ERC20s.length;
}

module.exports = numberOfErc20Transactions;
