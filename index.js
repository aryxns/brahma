const express = require("express");
const app = express();
const port = 3000;
const getJanamKundali = require("./moralis");
const queryClients = require("./functions");
const allowedQueries = Object.keys(queryClients);
app.use(express.json());
const cleanQueries = require("./utils/cleanQueries");
const findScore = require("./utils/findScores");

app.post("/score", async (req, res) => {
  const { address } = req.query;
  console.log(req.body);
  const { query } = req.body;
  const queries = Object.keys(cleanQueries(query));
  const errors = queries.filter((query) => !allowedQueries.includes(query));
  if (errors.length > 0) {
    res.status(400).send(`${errors} are not allowed`);
    return;
  }
  const data = {};
  const janamKundali = await getJanamKundali(address);
  await Promise.all([
    queries.forEach(async (queryy) => {
      const client = queryClients[queryy];
      const result = await client(janamKundali, query[queryy].query || {});
      console.log(result);
      data[queryy] = result;
      return;
    }),
  ]);
  const levels = {};
  console.log(levels);

  Object.keys(data).forEach((query) => {
    levels[query] = findScore(query, data[query]);
  });
  let finalScore = 0;
  await Promise.all([
    queries.forEach(async (queryy) => {
      if (query[queryy].query) {
        finalScore += levels[queryy] * (query[queryy].query.weight || 1);
        return;
      }
      finalScore += levels[queryy] * 1;
    }),
  ]);
  res.json(finalScore);
});

app.get("/kundali", async (req, res) => {
  const { address } = req.query;
  const janamKundali = await getJanamKundali(address);
  res.json(janamKundali);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
