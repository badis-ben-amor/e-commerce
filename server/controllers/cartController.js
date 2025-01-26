const Cart = require("../models/Cart");
const Product = require("../models/Products");

const getCart = async (req, res) => {
  const { userId } = req.user;
  if (!userId) return res.status(400).json({ message: "User ID is required" });
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const addItemToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const { userId } = req.user;
  if (!userId || !productId)
    return res
      .status(400)
      .json({ message: "User and product id require to add item to cart" });
  try {
    const product = await Product.findById(productId).select("price");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0)
      return res.status(400).json({ message: "Invalid quantity" });

    let cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "price"
    );
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: parsedQuantity }],
        totalPrice: product.price * parsedQuantity,
      });
    } else {
      // Check if product already exixts in the cart
      const existItelIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === productId
      );
      if (existItelIndex >= 0) {
        // Update quantity if product already in cart
        cart.items[existItelIndex].quantity += parsedQuantity;
      } else {
        // Add new product in cart
        cart.items.push({ product: productId, quantity: parsedQuantity });
      }
      cart.totalPrice = cart.items.reduce((total, item) => {
        const price = item.product?.price || product.price;
        return total + item.quantity * price;
      }, 0);
    }
    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error add cart item",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.user;
  if (!userId || !productId || quantity === undefined)
    return res.status(400).json({
      message: "User, product ID and quantity require to update item in cart",
    });
  try {
    const product = Product.findById(productId).select("price");
    if (!product) return res.status(404).json({ message: "Product not found" });
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity < 0)
      return res.status(400).json({ message: "Invalide quantity" });

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "price"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );
    if (itemIndex >= 0) {
      if (parsedQuantity === 0) {
        // remove the intem if quantity becomes 0
        cart.items.splice(itemIndex, 1);
      } else {
        // update the quantity of the exixsting item
        cart.items[itemIndex].quantity = parsedQuantity;
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    await cart.save();

    return res
      .status(200)
      .json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error updating cart item",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

const removCartItem = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.user;
  if (!userId || !productId)
    return res.status(400).json({
      message: "User and product ID require to remove item from you cart",
    });
  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product._id.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );

    await cart.save();
    return res
      .status(200)
      .json({ message: "Item remove success from your cart", cart });
  } catch (error) {
    res.status(500).json({
      message: "Error removing cart item",
      ...(process.env !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removCartItem,
};
