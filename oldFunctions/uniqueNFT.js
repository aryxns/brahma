const fetch = require("node-fetch");

async function uniqueNFTs(address) {
  const addresses = [];
  const transfers = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/nft/transfers`,
    {
      headers: {
        "X-API-Key":
          "MGOkF9jd5yDR1jLRVPq1EmDWA5SmqzTUKCwiDq0fOuRWs5i0sMZtQtx2jhJyJRNG",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const txns = data.result;
      txns.map((txn) => {
        if (addresses.includes(txn.token_address) == false) {
          addresses.push(txn.token_address);
        }
      });
    });
  return addresses.length;
}

uniqueNFTs("0xb7f584bD2FB01E09b0A01AdE276d1397c2F5b678");

module.exports = uniqueNFTs;
