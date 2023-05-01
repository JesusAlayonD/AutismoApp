require("dotenv").config();
require("./src/config/connect");
const express = require("express");
const routes = require("./src/routes/v1");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.get("/", () => {
  console.log("Autismo App Backend...");
});

routes(app);

const PORT = process.env.APP_PORT || 5001;
app.listen(PORT, () => {
  console.log("http://127.0.0.1:" + PORT);
});
