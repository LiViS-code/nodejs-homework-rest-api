const { User } = require("../../models");
const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("req.body", req.body);
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError(401, `Email or password is wrong`);
  }

  // TODO выдать токен
  user.token = "example token";

  user.save();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token: user.token,
      user: {
        email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
