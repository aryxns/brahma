const fetch = require("node-fetch")
async function solana(address){
    return await fetch(`https://solana-gateway.moralis.io/account/mainnet/${address}/portfolio`, {headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'gWhXCyk4w6DeyPqJizoiM7c0I4NaQZNYpVoCw0LRjJrUekCb7Ac55fL6ztxoIjJJ'
    }}).then(res => res.json()).then(data => {
        return data
    })
}
