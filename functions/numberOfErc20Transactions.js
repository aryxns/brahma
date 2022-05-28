async function numberOfErc20Transactions(txns, address) {
  console.log(address);
  if (address) {
    let num_txns = 0;
    if (typeof address === "string") {
      return txns.ERC20s.filter(
        (txn) => txn.address.toLowerCase() === address.toLowerCase()
      ).length;
    } else {
      address.forEach((_address, item) => {
        num_txns =
          num_txns +
          txns.ERC20s.filter((txn) => 
            txn.address.toLowerCase() === _address.toLowerCase()
          ).length;
      });
      console.log("nnn", num_txns);
      return num_txns;
    }
  }
  return txns.ERC20s.length;
}

module.exports = numberOfErc20Transactions;
