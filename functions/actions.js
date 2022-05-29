const methodNames = {
  mint: "0xa0712d68",
  withdraw: "0x2e1a7d4d",
  burn: "0x79cc6790",
  opensea: "0xab834bab",
  openseaCancellations: "cancelOrder_"
};

async function actions(txns, type) {
  return txns.txns.filter(
    (txn) => txn[`input`].substring(0, 10) === methodNames[type]
  ).length;
}

module.exports = actions;