const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connection = require("./config/db");
// middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
// public routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const fileRoutes = require("./routes/fileRoutes");
// user routes
const orderRoutes = require("./routes/orderRoutes");
const cartRouters = require("./routes/carteRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
// admin routes
const productRoutesAdmin = require("./routes/admin/productRoutesAdmin.js");
const userRoutesAdmin = require("./routes/admin/userRoutesAdmin.js");
const orderRoutesAdmin = require("./routes/admin/orderRoutesAdmin.js");

connection();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ULR,
    credentials: true,
  })
);

app.use(cookieParser());

// public routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/uploads", fileRoutes);

// user routes
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use("/cart", cartRouters);
// admin routes
app.use("/admin/product", productRoutesAdmin);
app.use("/admin/user", userRoutesAdmin);
app.use("/admin/order", orderRoutesAdmin);
// test
app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
