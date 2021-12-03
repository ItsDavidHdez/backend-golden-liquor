"use strict";

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4201;

const cliente_route = require("./routes/cliente");
const admin_route = require("./routes/admin");

mongoose.connect("mongodb://127.0.0.1:27017/golden-liquor-db", (err, res) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log("Server run on port", PORT);
    });
  }
});

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", cliente_route);
app.use("/api", admin_route);

module.exports = app;
