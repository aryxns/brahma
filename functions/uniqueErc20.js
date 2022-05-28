const fetch = require("node-fetch");

async function uniqueErc20(address) {
  const transfers = await fetch(
    `https://deep-index.moralis.io/api/v2/erc20/${address}/transfers`,
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
      console.log(txns);
    });
}

uniqueErc20("0xb7f584bD2FB01E09b0A01AdE276d1397c2F5b678");
