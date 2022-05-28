const fetch = require("node-fetch")
async function age(address){
    return await fetch(`https://deep-index.moralis.io/api/v2/${address}?chain=eth`).then(res => res.json()).then(data => {
        const txns = data.result
        return (new Date() - new Date(txns[txns.length - 1].block_timestamp))
    })
}