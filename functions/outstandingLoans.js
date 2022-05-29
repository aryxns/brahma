const moment = require("moment");

async function outstandingLoans(txns, data) {
  const loansTaken = txns.txns.filter(
    (txn) => txn[`input`].substring(0, 10) === "0xc5ebeaec"
  );
  const loansPaid = txns.txns.filter(
    (txn) => txn[`input`].substring(0, 10) === "0x0e752702"
  );

  if (data == "outstandingDaysAverage") {
    const daysPaid = [];

    loansTaken.map((loan) => {
      const loanPaid = loansPaid.filter(
        (paid) => paid[`from_address`] === loan[`to_address`]
      );
      if (loanPaid.length > 0) {
        let loanPaidDate = moment(loanPaid[0][`block_timestamp`]);
        let loanTakenDate = moment(loan[`block_timestamp`]);
        daysPaid.push(loanPaidDate.diff(loanTakenDate, "days"));
      }
    });

    const average =
      daysPaid.reduce((partialSum, a) => partialSum + a, 0) / daysPaid.length;
    return average;
  } else if (data == "outstandingPayments") {
    if (loansTaken.length > loansPaid.length) {
      return loansTaken.length - loansPaid.length;
    } else {
      return 0;
    }
  }
}

module.exports = outstandingLoans;
