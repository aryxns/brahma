const { fetchTx } = require("../moralis");
const fetch = require("node-fetch");
const ETHERSCAN_API_KEY = "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM";
const castVoteId = "0x56781388";
const { ethers } = require("ethers");
const axios = require("axios");
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
  await Promise.all([
    transactions.map(async (tx) => {
        const abi = await fetch(
          `https://api.etherscan.io/api?module=contract&action=getabi&address=${tx.to_address}&apikey=${ETHERSCAN_API_KEY}`
        );
        if (voted == true) {
          return voted;
        } else {
          await axios
            .post("http://0.0.0.0:80/getMethod", {
              address: tx.to_address,
              input: tx.input,
              abi: abi,
            })
            .then((method) => {
              if (method == castVoteId) {
                voted = true;
              }
            });
        }
      })
  ])
  return voted;
}

module.exports = getVoted;
