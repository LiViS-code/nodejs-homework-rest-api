const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const getContactsById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const user = await Contact.findOne({ _id: contactId, owner });
  if (!user) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.status(200).json({ status: 200, message: "success", data: user });
};

module.exports = getContactsById;
