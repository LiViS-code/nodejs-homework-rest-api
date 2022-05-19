const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { createError, sendMail } = require("../../helpers");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(
      409,
      `a user with e-mail address "${email}" is already registered`
    );
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: "250", r: "g" }, false);
  const newUser = new User({ ...req.body, avatarURL, verificationToken });
  newUser.setPassword(password); // hashing the password
  const { subscription } = await newUser.save();
  sendMail(newUser);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
