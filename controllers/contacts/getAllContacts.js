const { Contact } = require("../../models");
const { createError } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let contacts = null;
  if (!favorite) {
    contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  } else if (favorite === "true" || favorite === "false") {
    contacts = await Contact.find({ owner: _id, favorite }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  } else {
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
