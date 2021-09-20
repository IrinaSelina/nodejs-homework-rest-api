const { User } = require("../../model");
const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });
  if (!user) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "User not found",
    });
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
  res.send("<h2>Verification successful</h2>");
};
module.exports = verify;
