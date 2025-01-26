const express = require("express");
const router = express.Router();
const {
  userProtect,
  adminProtect,
} = require("../../middlewares/authMiddleware");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/userControllerAdmin");

router.get("/", userProtect, adminProtect, getAllUsers);
router.get("/:userId", userProtect, adminProtect, getUserById);
router.post("/", userProtect, adminProtect, createUser);
router.put("/", userProtect, adminProtect, updateUser);
router.put("/userId", userProtect, adminProtect, deleteUser);

module.exports = router;
