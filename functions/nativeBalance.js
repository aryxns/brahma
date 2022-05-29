const fetch = require("node-fetch");

async function nativeBalance(address) {
  const balance = await fetch(
    `https://deep-index.moralis.io/api/v2/${address}/balance?chain=eth`,
    {
      headers: {
        "X-API-Key":
          "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
      },
    }
  );
  return balance
}

module.exports = nativeBalance;
