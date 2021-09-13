const { User } = require("../../model");

const currentUser = async (req, res, _next) => {
  const [bearer, token] = req.headers.authorization.split(" ");
  const user = await User.findOne({ token });
  return res.status(200).json({
    status: "success",
    code: 200,
    data: { user },
  });
};
module.exports = currentUser;
