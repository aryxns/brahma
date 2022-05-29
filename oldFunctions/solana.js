const fetch = require("node-fetch");
async function solana(address) {
  return await fetch(
    `https://solana-gateway.moralis.io/account/mainnet/${address}/portfolio`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.MORALIS,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
