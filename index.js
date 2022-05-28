const express = require("express");
const app = express();
const port = 3000;
const getJanamKundali = require("./moralis");
const queryClients = require("./functions");
const allowedQueries = Object.keys(queryClients);
app.use(express.json());
const cleanQueries = require("./utils/cleanQueries");

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
  console.log(data);
  res.json(data);
});


app.get("/kundali", async (req, res) => {
  const { address } = req.query;
  const janamKundali = await getJanamKundali(address);
  res.json(janamKundali);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
