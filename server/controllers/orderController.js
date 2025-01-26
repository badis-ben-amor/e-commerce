const Order = require("../models/Order");
const Cart = require("../models/Cart");

const getUserOrders = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const orders = await Order.find({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });

    return res.status(200).json({
      message: `${
        orders.length === 0 ? "Not order found" : "Orders fetched successfully"
      }`,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const addOrderItem = async (req, res) => {
  const { shippingAdress } = req.body;
  const { userId } = req.user;
  if (!userId)
    return res.status(400).json({
      message: "User ID require to make order",
    });
  if (
    !(
      Object.keys(shippingAdress).length === 4 &&
      shippingAdress.hasOwnProperty("address") &&
      shippingAdress.hasOwnProperty("city") &&
      shippingAdress.hasOwnProperty("postalCode") &&
      shippingAdress.hasOwnProperty("country")
    )
  )
    return res.status(400).json({
      message: "Shipping Adress require to make order",
    });

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items")
      .select("-items._id");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const order = new Order({
      user: userId,
      products: cart.items,
      totalPrice: cart.totalPrice,
      shippingAdress,
    });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({
      message: "Error add order",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getUserOrders,
  addOrderItem,
};
