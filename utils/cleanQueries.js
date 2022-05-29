const curated_theme_contracts = require("../curated_theme_contracts.json");
const themes = Object.keys(curated_theme_contracts);

function cleanQueries(query) {
  let cleaned = {};
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === Object) {
      cleaned[key] = cleanQueries(query[key]);
    } else if (typeof query[key] === Array) {
    } else {
      cleaned[key] = curated_theme_contracts[query[key]] || query[key];
    }
  });
  return cleaned;
}

module.exports = cleanQueries;
