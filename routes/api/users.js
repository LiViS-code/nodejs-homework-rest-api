const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { joiUserSchema, joiLoginSchema } = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
