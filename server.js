const express = require("express");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs");
const http = require("http");
const parser = require("./scraper");

const DEFAULT_PORT_HTTP = 3003;

const app = express();
app.use(express.static(path.join(__dirname, "./")));
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const portHttp = process.env.PORT_HTTP || DEFAULT_PORT_HTTP;

app.set("portHttp", portHttp);
app.get("/api/result", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const content = parser.scrape().then(data => {
    res.send(data);
  });
});

app.post("/api/nodedata", function(req, res) {
  var body = req.body;
  console.log(body);
  res.send("http://anttim.northeurope.cloudapp.azure.com:3000");
});

http
  .createServer(app)
  .listen(app.get("portHttp"), () => console.log(chalk.blue(`Listening on https://localhost:${portHttp}`)));
