const express = require("express");

const router = express.Router();

const auth = require("./auth.route");

const mapNavigationUrls = [
  {
    path: "/auth",
    route: auth,
  },
];

mapNavigationUrls.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
