const { User } = require("../../model");
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const usersDir = path.join(__dirname, "../../", "public/avatars");

const register = async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Already register",
    });
  }
  const defaultAvatar = gravatar.url(email, {}, true);

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = {
    email,
    password: hashPassword,
    avatarURL: defaultAvatar,
  };
  const result = await User.create(newUser);
  const dirPath = path.join(usersDir, result._id.toString());
  await fs.mkdir(dirPath);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { email, password },
  });
};
module.exports = register;
