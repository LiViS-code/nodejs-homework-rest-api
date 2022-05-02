const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { joiUserShema } = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/", validation(joiUserShema), ctrlWrapper(ctrl.signup));

module.exports = router;
