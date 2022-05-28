const wrapped = require("../purity-score-backend-main/wrapped.json");
const gaming = require("../purity-score-backend-main/gaming.json");
const tokenized_stock = require("../purity-score-backend-main/tokenized_stock.json");
const insurance = require("../purity-score-backend-main/insurance.json");
const metaverse = require("../purity-score-backend-main/metaverse.json");
const fs = require("fs");

let wrapped_addresses = [];
let tokenized_stock_addresses = [];
let gaming_addresses = [];
let insurance_addresses = [];
let metaverse_addresses = [];

wrapped.data.coins.forEach((item, index) => {
    try {
        wrapped_addresses.push(item.platform.token_address)
    } catch (error) {
        console.log(error);
    }
});

tokenized_stock.data.coins.forEach((item, index) => {
    try {
        tokenized_stock_addresses.push(item.platform.token_address)
    } catch (error) {
        console.log(error);
    }
});

gaming.data.coins.forEach((item, index) => {
    try {
        gaming_addresses.push(item.platform.token_address)
    } catch (error) {
        console.log(error);
    }
});

insurance.data.coins.forEach((item, index) => {
    try {
        insurance_addresses.push(item.platform.token_address)
    } catch (error) {
        console.log(error);
    }
});

metaverse.data.coins.forEach((item, index) => {
    try {
        metaverse_addresses.push(item.platform.token_address)
    } catch (error) {
        console.log(error);
    }
});

const alias_json = {
    "wrapped": wrapped_addresses,
    "tokenized_stock": tokenized_stock_addresses,
    "gaming": gaming_addresses,
    "insurance": insurance_addresses
}

fs.writeFile('curated_theme_contracts.json', JSON.stringify(alias_json), 'utf8', () => console.log("done"));