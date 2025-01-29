const express = require("express");
const cloudinary = require("../../config/cloudinaryConfig");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const result = cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    res.status(200).json({ url: result.secure_url });
  });
});

module.exports = router;
