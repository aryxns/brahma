const scores = require("../scores.json");

function findScore(query, number) {
  const xyz = scores[query];
  let score = 0;
  let cursor = 0;
  let 
  while (cursor < number) {
    score += xyz[cursor];
    cursor++;
  }
}
