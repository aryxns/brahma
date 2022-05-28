const fetch = require("node-fetch");
async function fetchTx(ethereumAddress, solanaAddress) {
  let finalResults = [];
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth`,
    {
      headers: {
        "X-API-Key":
          "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
      },
    }
  ).then((res) => res.json());
  finalResults.push(...result.result);
  let cursor = result.cursor;
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          "X-API-Key":
            "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
        },
      }
    ).then((res) => res.json());
    try {
      finalResults.push(...result.result);
    } catch (e) {
      console.log(e);
    }
    cursor = result.cursor;
  }
  return finalResults;
}

async function fetchErc20Tx(ethereumAddress, solanaAddress) {
  let finalResults = [];
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}/nft/transfers?chain=eth`,
    {
      headers: {
        "X-API-Key":
          "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
      },
    }
  ).then((res) => res.json());
  finalResults.push(...result.result);
  let cursor = result.cursor;
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          "X-API-Key":
            "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
        },
      }
    ).then((res) => res.json());
    try {
      finalResults.push(...result.result);
    } catch (e) {
      console.log(e);
    }
    cursor = result.cursor;
  }
  return finalResults;
}

async function fetchNftTx(ethereumAddress, solanaAddress) {
  let finalResults = [];
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}/nft/transfers?chain=eth`,
    {
      headers: {
        "X-API-Key":
          "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
      },
    }
  ).then((res) => res.json());
  finalResults.push(...result.result);
  let cursor = result.cursor;
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          "X-API-Key":
            "gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ",
        },
      }
    ).then((res) => res.json());
    try {
      finalResults.push(...result.result);
    } catch (e) {
      console.log(e);
    }
    cursor = result.cursor;
  }
  return finalResults;
}

async function getJanamKundali(address) {
  const NFTs = await fetchNftTx(address);
  const ERC20s = await fetchErc20Tx(address);
  const txns = await fetchTx(address);
  const janamKundali = {
    NFTs,
    ERC20s,
    txns,
  };
  return janamKundali;
}

async function getContractTxns(address, txns) {
  let filter;
  if (typeof address === Array) {
    address = new Set(address);
    filter = txns.filter(
      (txn) =>
        address.includes(txn.from === address) ||
        address.includes(txn.to === address)
    );
  } else {
    filter = txns.filter((txn) => txn.from === address || txn.to === address);
  }
  return filter;
}

async function getNumberOfTxns(address, txns) {
  return (await getContractTxns(address, txns)).length;
}


// const uniswap = [......]
// userTxns = getJanamKundali(userAddress)
// getContractTxns(uniswap, userTxns)