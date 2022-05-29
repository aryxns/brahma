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
