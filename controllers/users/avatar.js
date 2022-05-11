const { createError, resizeAvatar } = require("../../helpers");
const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const { storeImage } = require("../../middlewares");

const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const avatarName = `${_id}_${originalname}`;
  const fileName = path.join(storeImage, avatarName);
  try {
    await fs.rename(temporaryName, fileName);
    const { avatarURL } = await User.findByIdAndUpdate(
      { _id },
      { avatarURL: fileName },
      { new: true }
    );
    resizeAvatar(avatarURL);
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
