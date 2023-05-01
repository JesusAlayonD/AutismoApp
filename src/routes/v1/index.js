const express = require("express");

const patient = require("./patient.route");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/patient", patient);
}

module.exports = routerApi;
