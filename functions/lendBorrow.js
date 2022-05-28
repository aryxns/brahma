const methodNames = {
    "borrow": "0xc5ebeaec",
    "repay": "0x0e752702",
    "cast_vote": "0x56781388"
}

async function lendBorrow(txns, type) {
    let num_txns = 0;
    let to = "0xe65cdB6479BaC1e22340E4E755fAE7E509EcD06c";
    let filtered_txns = txns.txns.filter((txn) => txn[`to_address`] === to);
    filtered_txns.forEach((_txn) => {
        if(_txn.input.substring(0, 10) == methodNames[type]) {
            num_txns++;
        }
    });
    return num_txns;
  }
  
  module.exports = lendBorrow;  