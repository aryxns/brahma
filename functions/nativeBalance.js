const { ethers } = require("ethers");
const fetch = require("node-fetch");

async function nativeBalance(address) {
  const balance = await ethers.getDefaultProvider().getBalance(address);
  console.log(parseInt(balance.toString()));
  return parseInt(balance.toString());
}

module.exports = nativeBalance;
