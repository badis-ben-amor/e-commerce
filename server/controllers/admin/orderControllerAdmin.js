const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate({
        path: "products.product",
        model: "Product",
        select: "name",
      })
      .populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error feching orders",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateOrderDeliveredStatus = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId)
    return res.status(400).json({ message: "Order ID is required" });
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      [
        {
          $set: {
            isDelivered: { $not: "$isDelivered" },
            deliveredAt: {
              $cond: {
                if: { $eq: ["$isDelivered", false] },
                then: new Date(Date.now()),
                else: null,
              },
            },
          },
        },
      ],
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order delivered status updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order delivered status",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateOrderPaidStatus = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId)
    return res.status(400).json({ message: "Order ID is required" });
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      [
        {
          $set: {
            isPaid: { $not: "$isPaid" },
            paidAt: {
              $cond: {
                if: { $eq: ["$isPaid", false] },
                then: new Date(Date.now()),
                else: null,
              },
            },
          },
        },
      ],

      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order paid status updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating paid status",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId)
    return res.status(400).json({ message: "Order ID is required" });
  try {
    const canceledOrder = await Order.findByIdAndDelete(orderId);
    if (!cancelOrder)
      return res.status(404).json({ message: "Order not found" });

    return res
      .status(200)
      .json({ message: "Order canceled successfully", canceledOrder });
  } catch (error) {
    res.status(500).json({
      message: "Error cancel order",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getAllOrders,
  updateOrderDeliveredStatus,
  updateOrderPaidStatus,
  deleteOrder,
};
