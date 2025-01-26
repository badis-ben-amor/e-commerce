const express = require("express");
const {
  getCart,
  addItemToCart,
  updateCartItem,
  removCartItem,
} = require("../controllers/cartController");
const { userProtect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", userProtect, getCart);
router.post("/", userProtect, addItemToCart);
router.put("/", userProtect, updateCartItem);
router.delete("/:productId", userProtect, removCartItem);

module.exports = router;
