const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactsById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
