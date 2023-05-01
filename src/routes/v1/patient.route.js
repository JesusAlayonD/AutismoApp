const express = require("express");
const router = express.Router();
const Patient = require("../../controllers/patient.controller");
const http = require("../../utils/httpresponse");

router.get("/", async (req, res, next) => {
  try {
    const payload = await Patient.searchByQuery(req.query);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    let fields = req.body;
    const payload = await Patient.signin(fields);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = await Patient.create(req.body);
    // const payload = await User.create_user_inactive(req.body);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Patient.update(id, req.body);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Patient.delete(id, req.body);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
