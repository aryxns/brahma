const { fetchTx } = require("../moralis");
const fetch = require("node-fetch");
const ETHERSCAN_API_KEY = "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM";
const castVoteId = "0x56781388";
const {ethers} = require("ethers")
ETHERSCAN_API_KEYS = [
  "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM",
  "21JE5I6E1NW533ATS1UZ2RZK3A8QXN37YG",
];
function getEtherscanApi() {
  return ETHERSCAN_API_KEYS[
    Math.floor(Math.random() * ETHERSCAN_API_KEYS.length)
  ];
}

async function getVoted(txns) {
  let voted = false;
  const transactions = txns.txns;
  transactions.map(async (tx) => {
    if (voted == true) {
      return voted;
    } else {
      console.log({
        address: tx.to_address,
        input: tx.input,
      });
      await fetch("http://0.0.0.0:80/getMethod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: tx.to,
          input: tx.input,
        }),
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
