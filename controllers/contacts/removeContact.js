const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!contact) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({ status: 200, message: "contact deleted", data: contact });
};

module.exports = removeContact;
