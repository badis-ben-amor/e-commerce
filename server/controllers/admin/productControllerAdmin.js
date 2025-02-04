const Product = require("../../models/Products");
const Cart = require("../../models/Cart");
const cloudinary = require("../../config/cloudinaryConfig");

const getProductsAdmin = async (req, res) => {
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

const getProductByIdAdmin = async (req, res) => {
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

const createProductAdmin = async (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !req.file?.filename || !description || !price || !stock)
    return res
      .status(400)
      .json({ message: "name, image, description, price and stock require" });
  try {
    const result = cloudinary.uploader.upload(
      req.file.path,
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }
        const product = new Product({
          name,
          image: result.secure_url,
          description,
          price,
          stock,
        });
        await product.save();
        res.status(200).json(product);
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const updateProductAdmin = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, stock } = req.body;

  if (!productId || !name || !description || !price || !stock)
    return res.status(400).json({
      message:
        "product id, name, description, price and stock require to update product",
    });
  try {
    if (req.file) {
      cloudinary.uploader.upload(req.file.path, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: error.message });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            name,
            image: result.secure_url,
            description,
            price,
            stock,
          },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: "Product updated successfully", updatedProduct });
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          name,
          description,
          price,
          stock,
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "Product updated successfully", updatedProduct });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

const deleteProductAdmin = async (req, res) => {
  const { productId } = req.params;
  if (!productId)
    return res.status(400).json({ message: "Product ID missing" });
  try {
    const carts = await Cart.find({ "items.product": productId }).populate(
      "items.product",
      "price"
    );
    const dletedProduct = await Product.findByIdAndDelete(productId);
    if (!dletedProduct)
      return res.status(404).json({ message: "Product not found" });

    if (carts.length > 0) {
      for (const cart of carts) {
        cart.items = cart.items.filter((item) => {
          return item.product._id.toString() !== productId;
        });

        cart.totalPrice = cart.items.reduce((total, item) => {
          return total + item.quantity * item.product.price;
        }, 0);

        await cart.save();
      }
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

module.exports = {
  getProductsAdmin,
  getProductByIdAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
};
