const express = require("express");
const router = express.Router();
const Doctor = require("../../controllers/doctor.controller");
const http = require("../../utils/httpresponse");

router.get("/", async (req, res, next) => {
  try {
    const payload = await Doctor.searchByQuery(req.query);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    let fields = req.body;
    const payload = await Doctor.signin(fields);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = await Doctor.create(req.body);
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
    const payload = await Doctor.update(id, req.body);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = await Doctor.delete(id, req.body);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
