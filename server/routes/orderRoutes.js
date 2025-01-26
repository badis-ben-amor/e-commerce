const express = require("express");
const { userProtect } = require("../middlewares/authMiddleware");
const {
  getUserOrders,
  addOrderItem,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", userProtect, getUserOrders);
router.post("/", userProtect, addOrderItem);

module.exports = router;
