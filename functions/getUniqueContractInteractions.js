const config = require("../config");
const axios = require("axios");

module.exports = async (user_address) => {
    try {
        const {data} = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${user_address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${config.etherscan_api_key}`);
        
        if(data) {
            let contract_addresses = [];

            data.result.forEach((item, index) => {
                if(!contract_addresses.includes(item.to)) {
                    contract_addresses.push(item.to)
                }
            });

            return contract_addresses;
        }

        return null
    } catch (error) {
        return null
    }
}