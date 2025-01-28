const Product = require("../models/Products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res.status(404).json({ message: "No products found" });
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ message: "Product Id require" });
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not find" });

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server error to fetching product",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
};
