require("dotenv").config();
const nodemailer = require("nodemailer");

// ✅ Create and configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST_NAME,
  port: Number(process.env.SMTP_PORT), // convert string to number
  secure: process.env.SMTP_SECURE === "true", // convert string to boolean
  auth: {
    user: process.env.firmMail,
    pass: process.env.firmPass.replace(/"/g, ""), // remove accidental quotes
  },
  tls: {
    rejectUnauthorized: false, // useful for local SSL issues
  },
  logger: true, // enable Nodemailer logs
  debug: true,  // show SMTP communication details
});

// ✅ Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

// ✅ Main reusable mail function
const sendMail = async (from, to, subject, template, attachments) => {
  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: template,
      attachments,
    });

    if (info?.messageId) {
      console.log("✅ Mail Sent Successfully:", info.messageId);
    } else {
      console.log("⚠️ Mail sent but no messageId received");
    }
  } catch (error) {
    console.error("❌ Error while sending mail:", error.message);
  }
};

// ✅ Optional test mail when running locally
(async () => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const info = await transporter.sendMail({
        from: process.env.firmMail,
        to: process.env.firmMail, // send to self for test
        subject: "Test Email from Abtik Backend (Hostinger SMTP)",
        html: "<h3>Hello 👋</h3><p>This is a test email from your local server.</p>",
      });
      console.log("✅ Test Mail Sent:", info.messageId);
    } catch (error) {
      console.error("❌ Test Mail Error:", error.message);
    }
  }
})();

module.exports = { sendMail };
