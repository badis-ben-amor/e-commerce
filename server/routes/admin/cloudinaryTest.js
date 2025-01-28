const express = require("express");
const cloudinary = require("../../config/cloudinaryConfig");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up multer storage (optional)
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  //   destination: (req, file, cb) =>
  //     cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Route for image upload
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const result = await cloudinary.uploader.upload_stream(
//       { resource_type: "auto" },
//       (error, result) => {
//         if (error) {
//           return res.status(500).json({ message: error.message });
//         }
//         res.status(200).json({ url: result.secure_url });
//       }
//     );
//     // req.pipe(result);
//     result.end(req.file.buffer);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.post("/", upload.single("file"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

module.exports = router;
