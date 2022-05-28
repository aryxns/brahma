const axios = require("axios");
// const txns = require("../sample.json");
// const token_addresses = ["0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", "0x40abc0be46decb904464c97ce0d804a839c70d60", "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"];

module.exports = async (txns, token_addresses) => {
    try {
        let stakedTokens = new Object();

        txns.ERC20s.forEach((item, index) => {
            if (token_addresses.indexOf(item.token_address) > -1) {
                if(stakedTokens[item.token_address] != undefined) {
                    stakedTokens[item.token_address] = stakedTokens[item.token_address] + 1
                } else {
                    stakedTokens[item.token_address] = 1;
                }
            }
        });

        return stakedTokens;
    } catch (error) {
        return null
    }
}