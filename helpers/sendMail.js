const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const createError = require("./createError");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (user) => {
  try {
    const { email, verificationToken } = user;
    const SERVICE_URL = "http://localhost:3000";
    const mail = {
      from: "support@myservice.com",
      to: email,
      subject: "Verifycation E-Mail",
      html: `<a href="${SERVICE_URL}/api/users/verification/${verificationToken}">Click to verifycation you E-mail</a>`,
    };
    console.log("send mail :>> ", mail);
    await sgMail.send(mail);
    return true;
  } catch (error) {
    createError(400, error.message);
  }
};

module.exports = sendMail;
