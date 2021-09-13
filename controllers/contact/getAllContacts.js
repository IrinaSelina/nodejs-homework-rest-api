const { Contact } = require("../../model");

const getAllContacts = async (req, res, _next) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const pages = await Contact.find({ owner: req.user._id });
  const result = await Contact.find(
    { owner: req.user._id },
    "owner _id email",
    { skip, limit: +limit }
  );

  return res.json({
    status: "success",
    code: 200,
    data: {
      total: pages.length,
      pages: Math.ceil(pages.length / limit),
      result,
    },
  });
};

module.exports = getAllContacts;
