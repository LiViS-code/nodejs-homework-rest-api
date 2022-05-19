const { User } = require("../../models");
const { createError, sendMail } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404, `user with Email=${email} is not found`);
  }
  if (user.verify) {
    throw createError(400, "verification has already been passed");
  }
  sendMail(user);
  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyEmail;
