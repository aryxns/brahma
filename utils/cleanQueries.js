const curated_theme_contracts = require("../curated_theme_contracts.json");
const themes = Object.keys(curated_theme_contracts);
function cleanQueries(query) {
  let cleaned = {};
  Object.keys(query).forEach((key) => {
    if (themes.includes(key)) {
      if (typeof query[key] === "object") {
        cleaned[key] = cleanQueries(query[key]);
      } else {
        cleaned[key] = curated_theme_contracts[key];
      }
    }
  });
  return query;
}

module.exports = cleanQueries;
