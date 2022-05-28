const fetch = require("node-fetch");

async function uniqueNft(address) {
  return await fetch(
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
      const addresses = [];

      console.log(data);
      const txns = data.result;
      txns.map((txn) => {
        if (!addresses.includes(txn.token_address)) {
          addresses.push(txn.token_address);
        }
      });
      return addresses.length;
    });
}
async function main() {
  console.log(await uniqueNft("0x23302DA41ae4A69875321343D7ACA464a4E72DB2"));
}
main();
