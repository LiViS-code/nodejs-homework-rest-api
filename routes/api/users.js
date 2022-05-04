const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { joiUserShema } = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiUserShema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiUserShema), ctrlWrapper(ctrl.login));

module.exports = router;
