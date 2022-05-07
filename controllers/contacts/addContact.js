const { Contact } = require("../../models");

const addContact = async (req, res) => {
  const { _id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({ status: 201, message: "success", data: contact });
};

module.exports = addContact;
