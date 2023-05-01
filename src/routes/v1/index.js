const express = require("express");

const patient = require("./patient.route");
const doctor = require("./doctor.route");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/patient", patient);
  router.use("/doctor", doctor);
}

module.exports = routerApi;
