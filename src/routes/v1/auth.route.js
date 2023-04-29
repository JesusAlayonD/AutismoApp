const express = require("express");
const router = express.Router();
const User = require("../../controllers/user.controller");
const http = require("../../utils/httpresponse");

router.post("/signin", async (req, res, next) => {
  try {
    let fields = req.body;
    console.log("login...");
    console.log(fields);
    const payload = await User.signin(fields);
    const status = await http.status(payload);
    console.log(payload);
    res.status(status).json(payload);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
