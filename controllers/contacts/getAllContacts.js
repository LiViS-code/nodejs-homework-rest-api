const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  let contacts = null;
  switch (favorite) {
    case "true":
    case "false":
      contacts = await Contact.find({ owner: _id, favorite }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id email subscription");
      break;
    case null: // will return all contacts
      contacts = await Contact.find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id email subscription");
      break;
    default:
      throw createError(
        400,
        "favorite parameter is invalid (can be boolean true or false)"
      );
  }
  if (!contacts) {
    throw createError(404, "contacts not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = getAllContacts;
