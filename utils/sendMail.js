require("dotenv").config();
const { Resend } = require("resend");

// ✅ Environment Variables Required for Resend:
// - RESEND_API_KEY: Your Resend API key (get from https://resend.com/api-keys)
// - firmMail: Your verified sender email address (must be verified in Resend dashboard)

// ✅ Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Verify Resend API key
const verifyResendConnection = async () => {
  try {
    // Test the API key by attempting to get account info
    await resend.domains.list();
    console.log("✅ Resend API is ready to send emails");
  } catch (error) {
    console.error("❌ Resend API Error:", error.message);
  }
};

// ✅ Main reusable mail function
const sendMail = async (from, to, subject, template, attachments) => {
  try {
    const emailData = {
      from,
      to,
      subject,
      html: template,
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments;
    }

    const data = await resend.emails.send(emailData);

    if (data?.id) {
      console.log("✅ Mail Sent Successfully:", data.id);
    } else {
      console.log("⚠️ Mail sent but no ID received");
    }
  } catch (error) {
    console.error("❌ Error while sending mail:", error.message);
  }
};

// ✅ Optional test mail when running locally
(async () => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const data = await resend.emails.send({
        from: process.env.firmMail,
        to: process.env.firmMail, // send to self for test
        subject: "Test Email from Abtik Backend (Resend)",
        html: "<h3>Hello 👋</h3><p>This is a test email from your local server using Resend.</p>",
      });
      console.log("✅ Test Mail Sent:", data.id);
    } catch (error) {
      console.error("❌ Test Mail Error:", error.message);
    }
  }
})();

// Verify connection on startup
verifyResendConnection();

module.exports = { sendMail };
