const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const avatar = require("./avatar");
const verificationToken = require("./verificationToken");
const verifyEmail = require("./verifyEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  logout,
  updateSubscription,
  avatar,
  verificationToken,
  verifyEmail,
};
