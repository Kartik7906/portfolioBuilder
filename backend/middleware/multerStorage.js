const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the upload directory
const uploadDir = path.join(__dirname, "../uploads/");

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Upload path:", uploadDir); // Log the upload path
    cb(null, uploadDir); // Use the upload path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
