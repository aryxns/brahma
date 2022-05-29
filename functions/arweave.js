const { default: axios } = require("axios")
const { ethers } = require("ethers")

async function arweave(data, onlyBalance) {
    if(onlyBalance) {
        return ethers.utils.formatEther((await axios.get(`https://arweave.net/wallet/${data.arweave_address}/balance`)).data)
    } else {
        const last_txn_id = await axios.get(`https://arweave.net/wallet/${data.arweave_address}`);
        const last_txn = await axios.get(`https://arweave.net/tx/${(last_txn_id).data}`);
        return last_txn.data.data_size;
    }
}

module.exports = arweave;