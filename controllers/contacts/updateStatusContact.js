const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );
  if (!contact) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateStatusContact;
