const express = require("express");
const router = express.Router();
const Record = require("../controllers/record");

router.route("/add-record").post(Record.addRecord);

router.route("/get-record").get(Record.getRecord);

module.exports = router;
