const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  try {
    if (!authorization) {
      throw createError(401, "Not authorized");
    }
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message.toLowerCase() === "invalid signature") {
      error.status = 401;
      error.message = "Unauthorized: invalid signature";
    }
    next(error);
  }
};

module.exports = auth;
