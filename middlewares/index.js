const ctrlWrapper = require("./ctrlWrapper");
const validation = require("./validation");
const auth = require("./auth");
const {
  upload,
  uploadDir,
  storeImage,
} = require("../middlewares/uploadStorage");

module.exports = {
  ctrlWrapper,
  validation,
  auth,
  upload,
  uploadDir,
  storeImage,
};
