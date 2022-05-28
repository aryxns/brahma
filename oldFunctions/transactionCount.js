const { ethers } = require("ethers");
async function getTxCount(address) {
  const provider = new ethers.providers.getDefaultProvider();
  const txCount = await provider.getTransactionCount(address);
  return txCount;
}

module.exports = getTxCount;
