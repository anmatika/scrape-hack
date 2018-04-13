const express = require("express");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const http = require("http");
const parser = require("./scraper");

const DEFAULT_PORT_HTTP = 3003;

const app = express();
app.use(express.static(path.join(__dirname, "./")));

const portHttp = process.env.PORT_HTTP || DEFAULT_PORT_HTTP;

app.set("portHttp", portHttp);
app.get("/api/result", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const content = parser.scrape().then(data => {
    res.send(data);
  });
});

http
  .createServer(app)
  .listen(app.get("portHttp"), () => console.log(chalk.blue(`Listening on https://localhost:${portHttp}`)));
