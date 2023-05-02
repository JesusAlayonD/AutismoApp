const express = require("express");

const patient = require("./patient.route");
const doctor = require("./doctor.route");
const test = require("./test.route");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/patient", patient);
  router.use("/doctor", doctor);
  router.use("/test", test);
}

module.exports = routerApi;
