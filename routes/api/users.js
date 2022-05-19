const express = require("express");
const { ctrlWrapper, validation, auth, upload } = require("../../middlewares");
const {
  joiUserSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  verifyEmailschema,
} = require("../../models");
const { users: ctrl } = require("../../controllers");
const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:userId/subscription",
  auth,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.avatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verificationToken));

router.post(
  "/verify",
  validation(verifyEmailschema),
  ctrlWrapper(ctrl.verifyEmail)
);

module.exports = router;
