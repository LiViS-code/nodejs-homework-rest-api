const path = require("path");
const multer = require("multer");

const uploadDir = path.join(process.cwd(), "tmp");
const storeImage = path.join(process.cwd(), "public", "avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});
const upload = multer({
  storage,
});

module.exports = {
  upload,
  uploadDir,
  storeImage,
};
