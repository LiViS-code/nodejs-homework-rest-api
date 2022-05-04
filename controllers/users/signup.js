const { User } = require("../../models");
const { createError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(
      409,
      `a user with e-mail address "${email}" is already registered`
    );
  }

  const newUser = new User({ email, subscription });

  newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
