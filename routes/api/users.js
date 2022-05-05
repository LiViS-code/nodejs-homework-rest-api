const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { joiUserSchema, joiLoginSchema } = require("../../models");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/subscription", auth, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;
