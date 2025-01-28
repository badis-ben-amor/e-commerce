const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProductsAdmin,
  getProductByIdAdmin,
  createProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
} = require("../../controllers/admin/productControllerAdmin");
const {
  userProtect,
  adminProtect,
} = require("../../middlewares/authMiddleware");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) =>
//     cb(null, path.join(__dirname, "../../uploads")),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", userProtect, adminProtect, getProductsAdmin);
router.get("/:productId", userProtect, adminProtect, getProductByIdAdmin);
router.post(
  "/",
  userProtect,
  adminProtect,
  upload.single("image"),
  createProductAdmin
);
router.put(
  "/:productId",
  userProtect,
  adminProtect,
  upload.single("image"),
  updateProductAdmin
);
router.delete("/:productId", userProtect, adminProtect, deleteProductAdmin);

module.exports = router;
