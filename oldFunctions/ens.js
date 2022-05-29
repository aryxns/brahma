const { ethers, providers } = require("ethers");

async function getEns(address) {
  if ((await ethers.getDefaultProvider().lookupAddress(address)) != null) {
    return 1;
  } else {
    return 0;
  }
}

module.exports = getEns;
