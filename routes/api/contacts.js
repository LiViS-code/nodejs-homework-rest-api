const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { joiContactSchema, joiStatusSchema } = require("../../models");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(joiStatusSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
