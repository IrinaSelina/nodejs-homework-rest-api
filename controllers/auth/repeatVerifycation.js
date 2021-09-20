const { User } = require("../../model");
const { sendMail } = require("../../helpers");

const repeatVerifycation = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "missing required field email",
    });
  }
  const user = await User.findOne({ email });
  const { verifyToken, verify } = user;

  if (user) {
    if (verify) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Verification has already been passed",
      });
    }
    const data = {
      to: email,
      subject: "Confirm registration on the site",
      html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}">Confirm registration</a>`,
    };
    await sendMail(data);
    return res.status(201).json({
      status: "success",
      code: 200,
      message: "missing required field email",
    });
  }
};
module.exports = repeatVerifycation;
