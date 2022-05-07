const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true,
    }
  );
  if (!contact) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

module.exports = updateContact;
