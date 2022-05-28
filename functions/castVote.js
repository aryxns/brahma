import {fetchTx} from "../moralis"
const fetch = require("node-fetch")
const ETHERSCAN_API_KEY = "JWB6Z8YDYCWDS4HG2JA5JDBSGIQC2EWFIM"

async function getVoted(txns, address, contractAddress) {
    const transactions = txns.txns
    const abi = await fetch(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${ETHERSCAN_API_KEY}`).then((res) => res.json().result)
    transactions.map((tx) => {
        await fetch("http://0.0.0.0/getMethod", {})
    })
}

module.exports = getVoted;
