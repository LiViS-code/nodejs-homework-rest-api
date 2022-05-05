const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError(401, `Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  user.token = jwt.sign(payload, SECRET_KEY);

  const { subscription } = await user.save();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      token: user.token,
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = login;
