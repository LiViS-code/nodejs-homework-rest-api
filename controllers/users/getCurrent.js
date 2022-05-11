const getCurrent = async (req, res) => {
  const { email, subscription, _id: userId, avatarURL } = req.user;
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
        subscription,
        userId,
        avatarURL,
      },
    },
  });
};

module.exports = getCurrent;
