const express = require("express");
const cors = require ("cors");
const app = express ();
const routes = require("./routes/estabelecimentoRoutes")

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;