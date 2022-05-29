const axios = require("axios");
// const txns = require("../sample.json");
// const token_addresses = ["0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", "0x40abc0be46decb904464c97ce0d804a839c70d60", "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"];

async function stakedTokens(txns, query) {
  const token_addresses = query.address;
  console.log(token_addresses);
  let stakedTokens = {};
  txns.ERC20s.forEach((item) => {
    console.log(item.address);
    if (token_addresses.indexOf(item.address) > -1) {
      if (stakedTokens[item.address] != undefined) {
        stakedTokens[item.address] = stakedTokens[item.address] + 1;
      } else {
        stakedTokens[item.address] = 1;
      }
    } else {
      console.log("not found");
    }
  });
  const x = Object.keys(stakedTokens).length;
  console.log(x);
  return x;
}

module.exports = stakedTokens;
