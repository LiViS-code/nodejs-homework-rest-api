const { createError, resizeAvatar } = require("../../helpers");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const { storeImage } = require("../../middlewares");

const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const [extension] = originalname.toLowerCase().split(".").reverse();
  const avatarName = `${_id}_avatar.${extension}`;
  const fileName = path.join(storeImage, avatarName); // full path to avatar
  const avatarURL = path.join("avatars", avatarName); // save url from dir /avatars/
  try {
    await fs.rename(temporaryName, fileName);
    await User.findByIdAndUpdate({ _id }, { avatarURL }, { new: true });
    resizeAvatar(fileName);
    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(temporaryName);
    return createError(error);
  }
};

module.exports = avatar;
