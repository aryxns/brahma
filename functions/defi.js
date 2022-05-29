const methodNames = {
  borrow: "0xc5ebeaec",
  repay: "0x0e752702",
  stake: "0xadc9772e",
  proposal_created: "0x6a761202",
  deposit: "0xd0e30db0",
  approve: "0x095ea7b3",
  claim: "0xabf2ebd8",
  swap: "0x5f575529"
};

async function defi(txns, type) {
  if (type) {
    return txns.txns.filter(
      (txn) => txn[`input`].substring(0, 10) === methodNames[type]
    ).length;
  }
  
  return null;
}

module.exports = defi;
