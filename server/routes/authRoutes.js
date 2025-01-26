const express = require("express");
const {
  registerUser,
  loginUser,
  refresh,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
