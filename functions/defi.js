const methodNames = {
  borrow: "0xc5ebeaec",
  repay: "0x0e752702",
  cast_vote: "0x56781388",
  stake: "0xadc9772e",
  proposal_created: "0x6a761202",
  deposit: "0xe2bbb158",
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
