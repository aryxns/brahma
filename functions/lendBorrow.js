const methodNames = {
    "borrow": "0xc5ebeaec",
    "repay": "0x0e752702",
    "cast_vote": "0x56781388"
}

async function lendBorrow(txns, type) {
    if(type) {
        return txns.txns.filter((txn) => txn[`input`].substring(0, 10) === methodNames[type]).length;
    }

    return null
}
  
module.exports = lendBorrow;  