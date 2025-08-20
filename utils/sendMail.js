const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process?.env?.SMTP_HOST_NAME,
  port: process?.env?.SMTP_PORT,
  secure: process?.env?.SMTP_SECURE,
  auth: {
    user: process?.env?.firmMail,
    pass: process?.env?.firmPass,
  },
});

const sendMail = async (from, to, subject, template, attachments) => {
  try {
    let isSended = await transporter.sendMail({
      to,
      from,
      subject,
      html: template,
      attachments,
    });
    if (isSended) {
      console.log("Mail Sended Successfully");
    } else {
      console.log("Error while sending mail");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { sendMail };
