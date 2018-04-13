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
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const portHttp = process.env.PORT_HTTP || DEFAULT_PORT_HTTP;

app.set("portHttp", portHttp);

let buffer = {};

/* app.get("/api/result", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const content = parser.scrape().then(data => {
    res.send(data);
  });
}); */

app.get("/api/results", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const s = {
    nodes: [
      {
        clusterName: "QVS@Cluster",
        nodeName: "qv12node3",
        statusCode: "Up",
        reason: "",
      },
      {
        clusterName: "QVS@Cluster",
        nodeName: "qv12node5",
        statusCode: "Up",
        reason: "",
      },
      {
        clusterName: "QVS@Cluster",
        nodeName: "qv12node4",
        statusCode: "Up",
        reason: "",
      },
      {
        clusterName: "QVS@Cluster",
        nodeName: "qv12node1",
        statusCode: "Up",
        reason: "",
      },
      {
        clusterName: "QVS@Cluster",
        nodeName: "qv12node2",
        statusCode: "Up",
        reason: "",
      },
    ],
  };

  res.send(buffer);
});

app.post("/api/nodedata", function(req, res) {
  var body = req.body;
  console.log(body);
  buffer = {};
  buffer = Object.assign({}, body);
  res.send("http://anttim.northeurope.cloudapp.azure.com:3000");
});

http
  .createServer(app)
  .listen(app.get("portHttp"), () => console.log(chalk.blue(`Listening on https://localhost:${portHttp}`)));
