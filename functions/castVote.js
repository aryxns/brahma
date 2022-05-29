
function getVoted(txns, needNumber) {
  let voted = 0;
  const transactions = txns.txns;
  transactions.map((tx) => {
    if(!needNumber && voted == 1) {
      return voted;
    }
    
    if (tx.input.substring(0, 10) == "0x56781388") {
      voted++;
    }
  });

  return voted;
}

module.exports = getVoted;
