const scores = require("../scores.json");

function findScore(query, number) {
  const xyz = scores[query];
  const minimum = xyz[0];
  const multiplier = xyz[1];
  let score = 0;
  let cursor = 0;
  let currentBase = minimum;
  if (number < minimum) {
    return 0;
  }
  score = 1;
  while (cursor < number) {
    const requiredBase = multiplier * currentBase;
    if (cursor + requiredBase > number) {
      score += (number - cursor) / requiredBase;
    } else {
      score += 1;
    }
    cursor += requiredBase;
    console.log(cursor, number);
  }
  return score;
}

module.exports = findScore;
