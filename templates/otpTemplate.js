const userOtpTemplate = (userInfo) => {
  try {
    let { name, otp } = userInfo;

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code - Abtik Services</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
          }
          * {
            box-sizing: border-box;
          }
          body {
            background-color: #f7f7f7;
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 680px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background: #052EAA;
            background: linear-gradient(135deg, #052EAA, #3CA2E2);
            padding: 35px 20px;
            color: white;
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 1.5px;
          }
          .header-divider {
            height: 8px;
            background: #3CA2E2;
            background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
          }
          .content {
            padding: 40px 50px;
          }
          h2 {
            color: #333;
            margin: 0 0 20px 0;
            font-size: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .emoji {
            font-size: 28px;
            margin-right: 10px;
          }
          p {
            color: #555;
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1.6;
          }
          .highlight {
            background-color: rgba(5, 46, 170, 0.08);
            border-left: 4px solid #052EAA;
            padding: 15px;
            margin-bottom: 25px;
            font-size: 18px;
            text-align: center;
            font-weight: 600;
            letter-spacing: 2px;
          }
          .message-box {
            background-color: #f9f9f9;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border: 1px solid #eee;
          }
          .message-box h3 {
            margin-top: 0;
            color: #052EAA;
            font-size: 18px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(to right, #052EAA, #3CA2E2);
            color: white;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 50px;
            font-weight: 600;
            margin: 15px 0;
            text-align: center;
          }
          .divider {
            height: 1px;
            background-color: #eee;
            margin: 30px 0;
          }
          .footer {
            margin-top: 10px;
            background-color: #fcfcfc;
            font-size: 14px;
            color: #888;
            text-align: center;
            border-top: 1px solid #eee;
            padding: 25px 40px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 10px;
            color: #052EAA;
            text-decoration: none;
          }
          .footer-note {
            display: block;
            margin-top: 8px;
            font-size: 13px;
            color: #aaa;
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 25px 15px;
              font-size: 26px;
            }
            .message-box {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">Abtik Services</div>
          <div class="header-divider"></div>
          <div class="content">
            <h2><span class="emoji">🔐</span> OTP Verification</h2>
            <p class="highlight">Your OTP Code: <strong>${otp}</strong></p>
            <p>Dear ${name},</p>
            <p>Please use the One-Time Password (OTP) provided above to complete your verification. This code is valid for <strong>150 seconds</strong>.</p>
            <div class="message-box">
              <h3>Important Security Note:</h3>
              <p>Do not share this OTP with anyone. Our team will never ask you for this code.</p>
            </div>
       <center>
  <a href="https://www.abtikservices.com" 
     class="button" 
     style="color: #ffffff; text-decoration: none;">
    Visit Our Website
  </a>
</center>

            <div class="divider"></div>
            <p>If you did not request this OTP, please ignore this email.</p>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="https://www.linkedin.com/company/abtik-services">LinkedIn</a> • 
              <a href="https://www.instagram.com/abtikservices?igsh=MTk3cWxteWswbTFidQ==">Instagram</a> • 
              <a href="https://www.facebook.com/share/1aKQvTf7NU">Facebook</a>
            </div>
            Stay secure with Abtik Services.
            <span class="footer-note">© 2025 Abtik Services. All rights reserved.</span>
          </div>
        </div>
      </body>
    </html>`;
  } catch (error) {
    console.error("Error in userOtpTemplate:", error);
    throw error;
  }
};

module.exports = { userOtpTemplate };
