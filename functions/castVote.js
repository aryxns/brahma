const { fetchTx } = require("../moralis");
const fetch = require("node-fetch");
const ETHERSCAN_API_KEY = "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM";
const castVoteId = "0x56781388";
const { ethers } = require("ethers");
const axios = require("axios");

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
