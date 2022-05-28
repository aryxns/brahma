const fetch = require("node-fetch")
async function age(address){
    return await fetch("https://deep-index.moralis.io/api/v2/0x23302DA41ae4A69875321343D7ACA464a4E72DB2?chain=eth").then(res => res.json()).then(data => {
        const txns = data.result
        return (new Date() - new Date(txns[txns.length - 1].block_timestamp))
    })
}