const { User } = require("../../models");
const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email: desiredEmail, password } = req.body;
  console.log("req.body", req.body);
  const user = await User.findOne({ email: desiredEmail });

  if (!user || user.password !== password) {
    throw createError(401, `Email or password is wrong`);
  }

  // TODO выдать токен

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user,
    },
  });
};

module.exports = login;
