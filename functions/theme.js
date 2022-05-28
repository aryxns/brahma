const axios = require("axios");
// const txns = require("../sample.json");
// const token_addresses = ["0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85", "0x40abc0be46decb904464c97ce0d804a839c70d60", "0x25ed58c027921e14d86380ea2646e3a1b5c55a8b"];

module.exports = async (txns, theme_map) => {
    try {
        let res_map = new Object();

        txns.forEach((item, index) => {
            for(const theme in theme_map) {
                // theme_map[theme] --> array of contract addresses
                if(theme_map[theme].indexOf(item.to_address) > -1) {
                    if(res_map[theme_map[theme]][item.to_address] != undefined) {
                        res_map[theme_map[theme]][item.to_address] = res_map[theme_map[theme]][item.to_address] + 1 
                    } else {
                        res_map[theme_map[theme]][item.to_address] = 1
                    }
                }
            }
        });

        return res_map;
    } catch (error) {
        return null
    }
}