const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("user.verify :>> ", user.verify);
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw createError(
      401,
      `Email is not correct or not confirmed or wrong password`
    );
  }
  let { _id: id, subscription, token, avatarURL } = user;
  const payload = {
    id,
  };
  token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(id, { token }, { expiresIn: "1h" });
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = login;
