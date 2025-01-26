const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const { userProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", userProtect, getUserProfile);
router.put("/", userProtect, updateUserProfile);
router.delete("/", userProtect, deleteUserProfile);

module.exports = router;
