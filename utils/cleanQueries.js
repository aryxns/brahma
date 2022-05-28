const curated_theme_contracts = require("../curated_theme_contracts.json");
const themes = Object.keys(curated_theme_contracts);

function cleanQueries(query) {
  console.log(query);
  let cleaned = {};
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === "object") {
      cleaned[key] = cleanQueries(query[key]);
    } else {
      //console.log(curated_theme_contracts[query[key]]);
      cleaned[key] = curated_theme_contracts[query[key]] || query[key];
    }
  });
  return cleaned;
}

module.exports = cleanQueries;
