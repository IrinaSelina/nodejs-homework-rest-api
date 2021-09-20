const { User } = require("../../model");

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: null, verify: false });
  return res.status(200).json({ message: "No Content" });
};
module.exports = logout;
