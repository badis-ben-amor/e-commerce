const express = require("express");
const fileAccessMiddleware = require("../middlewares/fileAccessMiddleware");
const sendFile = require("../controllers/fileController");

const router = express.Router();

router.get("/:filename", fileAccessMiddleware, sendFile);

module.exports = router;
