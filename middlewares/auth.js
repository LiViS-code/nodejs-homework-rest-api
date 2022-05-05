const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  try {
    if (!authorization) {
      throw createError(401, "Not authorized 1");
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw createError(401, "Not authorized 2");
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, "Not authorized 3");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
