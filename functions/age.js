const fetch = require("node-fetch");
async function age(txns) {
  console.log(txns);
  return new Date() - new Date(txns.txns[txns.txns.length - 1].block_timestamp);
}

module.exports = age;
