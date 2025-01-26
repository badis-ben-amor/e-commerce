const express = require("express");
const {
  userProtect,
  adminProtect,
} = require("../../middlewares/authMiddleware");
const {
  getAllOrders,
  updateOrderPaidStatus,
  updateOrderDeliveredStatus,
  deleteOrder,
} = require("../../controllers/admin/orderControllerAdmin");

const router = express.Router();

router.get("/", userProtect, adminProtect, getAllOrders);
router.put(
  "/delivered/:orderId",
  userProtect,
  adminProtect,
  updateOrderDeliveredStatus
);
router.put("/paid/:orderId", userProtect, adminProtect, updateOrderPaidStatus);
router.delete("/:orderId", userProtect, adminProtect, deleteOrder);

module.exports = router;
