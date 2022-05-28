const curated_theme_contracts = require("../curated_theme_contracts.json");

function cleanQueries(query) {
  let clean_query = new Object(query);

  for(const key in query) {
    if(typeof(query[key].address) == "string") {
      if(query[key].address.length < 64) {
        if(curated_theme_contracts[query[key].address] != undefined) {
          clean_query[key] = curated_theme_contracts[query[key.address]];
        }
      }
    } else if(typeof(query[key].address) == Array) {
      query[key].address.forEach((addy) => {
        if(query[key].address.length < 64) {
          // if(curated_theme_contracts[query[key].address] != undefined) {
          //   clean_query[key] = [curated_theme_contracts[query[key.address]]];
          // }
        }
      })
    }
  }

  return query;
}


module.exports = cleanQueries;