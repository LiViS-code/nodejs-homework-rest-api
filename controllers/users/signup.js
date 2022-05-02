const { User } = require("../../models");
const { createError } = require("../../helpers");

const signup = async (req, res) => {
  const { email: desiredEmail } = req.body;

  const user = await User.findOne({ email: desiredEmail }).exec();

  if (user) {
    throw createError(
      409,
      `A user with e-mail address <${desiredEmail}> is already registered.`
    );
  }

  const { email, subscription } = await User.create(req.body);

  res.json({
    status: "success",
    code: 201,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = signup;
