const { createError } = require("../../helpers");
const { User } = require("../../models");

const path = require("path");
const fs = require("fs/promises");
const { storeImage } = require("../../helpers");

const avatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, `${id}_${originalname}`);
  console.log("temporaryName :>> ", temporaryName);
  console.log("fileName :>> ", fileName);
  try {
    const avatarURL = await fs.rename(temporaryName, fileName);
    console.log("avatarURL :>> ", avatarURL);
    await User.findByIdAndUpdate({ avatarURL }, { new: true });
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
