const config = require("../config");
const axios = require("axios");

module.exports = async (user_address) => {
    try {
        const {data} = await axios({
            method: "GET",
            url: `https://api.etherscan.io/api?module=account&action=txlist&address=${user_address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_KEY}`
        });
        
        if(data) {
            let contract_addresses = [];
            let address_to_nonce = new Object();

            data.result.forEach((item, index) => {
                if(!contract_addresses.includes(item.to)) {
                    contract_addresses.push(item.to);
                    address_to_nonce[item.to] = 1;
                } else {
                    address_to_nonce[item.to] = address_to_nonce[item.to] + 1;
                }
            });

            return address_to_nonce;
        }

        return null
    } catch (error) {
        return null
    }
}