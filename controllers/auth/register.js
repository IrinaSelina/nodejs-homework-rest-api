const { User } = require("../../model");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const usersDir = path.join(__dirname, "../../", "public/avatars");
const { sendMail } = require("../../helpers");

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
    verifyToken: v4(),
  };
  const { verifyToken } = newUser;
  const data = {
    to: email,
    subject: "Confirm registration on the site",
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}">Confirm registration</a>`,
  };

  await sendMail(data);
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
