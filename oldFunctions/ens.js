const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = "https://s7xdxxyqs8ho.usemoralis.com:2053/server";
const appId = "dNiFIgxMJYi7Tmj1JHtMd6YyS6vdAduPMy7sLZes";
const masterKey = "3FiUlEpSuAVWUOO87r9AlZWIj2jh80a95sjOQAPS";

async function getEns(address) {
  await Moralis.start({ serverUrl, appId, masterKey });
  const options = { address: address };
  const resolve = await Moralis.Web3API.resolve.resolveAddress(options);
  if (resolve.name !== "") {
    return true;
  }
  return false;
}

module.exports = getEns;