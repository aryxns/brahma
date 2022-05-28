const { fetchTx } = require("../moralis");
const fetch = require("node-fetch");
const ETHERSCAN_API_KEY = "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM";
const castVoteId = "0x56781388";

async function getVoted(txns) {
  let voted = false;
  const transactions = txns.txns;
  transactions.map(async (tx) => {
    if (voted == true) {
      return voted;
    } else {
      const abi = await fetch(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${tx.to}&apikey=${ETHERSCAN_API_KEY}`
      ).then((res) => res.json().result);
      await fetch("http://0.0.0.0/getMethod", {
        address: tx.to,
        input: tx.input,
        abi: abi,
      }).then((method) => {
        if (method == castVoteId) {
          voted = true;
        }
      });
    }
  });
  return voted;
}

module.exports = getVoted;
