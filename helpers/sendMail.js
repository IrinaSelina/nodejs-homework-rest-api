const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY, MAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "i.selina.jr@gmail.com" };
    await sgMail.send(mail);
    console.log("Email success send");
    return true;
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};
module.exports = sendMail;
