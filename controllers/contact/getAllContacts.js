// const { Contacts } = require("../../repositories");
const { Contact } = require("../../model");

const getAllContacts = async (req, res, _next) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  console.log(skip);
  // const result = await Contact.paginate({ owner: req.user._id }, options);
  const result = await Contact.find(
    { owner: req.user._id },
    "owner _id email",
    { skip, limit: +limit }
  );
  return res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getAllContacts;
