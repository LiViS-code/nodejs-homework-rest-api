const { User } = require("../../models");
const { createError } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { userId } = req.params;
  const { _id: owner } = req.user;
  const user = await User.findOneAndUpdate(
    { _id: userId, owner },
    { subscription },
    { new: true }
  );
  if (!user) {
    throw createError(404, `user with id=${userId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = updateSubscription;
