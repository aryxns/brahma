const express = require("express");
const getUniqueContractInteractions = require("./oldFunctions/getUniqueContractInteractions");
const app = express();
const port = 3000;
const getJanamKundali = require("./moralis");
const allowedQueries = ["numberOfTransactions", "numberOfErc20Transactions"];
const queryClients = require("./functions");
app.use(express.json());

app.post("/score", async (req, res) => {
  const { address } = req.query;
  console.log(req.body);
  const { query } = req.body;
  const queries = Object.keys(query);
  const errors = queries.filter((query) => !allowedQueries.includes(query));
  if (errors.length > 0) {
    res.status(400).send(`${errors} are not allowed`);
    return;
  }
  const data = {};
  const janamKundali = await getJanamKundali(address);
  await Promise.all([
    queries.forEach(async (query) => {
      const client = queryClients[query];
      const result = await client(janamKundali);
      console.log(result);
      data[query] = result;
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
