const express = require("express");
const router = express.Router();
const User = require("../controllers/user");

router.route("/signup").post(User.signup);
router.route("/login").post(User.login);

module.exports = router;
