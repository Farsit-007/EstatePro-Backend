import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.smtp_email,
      pass: config.smtp_password,
    },
  });
  await transporter.sendMail({
    from: 'robayatfarsit@gmail.com',
    to,
    subject: 'Your password reset links!',
    html,
  });
};

export const generateResetPasswordEmailHtml = (resetLink: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password - EstatePro</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', Arial, sans-serif;
      background: #f9f9f9;
      color: #000;
      line-height: 1.6;
    }

    .container {
      max-width: 550px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      border: 1px solid #e0e0e0;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      padding: 30px;
    }

    .header {
      text-align: center;
      padding: 24px 0;
      background: #000;
      color: #fff;
      border-radius: 12px 12px 0 0;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 20px 0;
    }

    .button-wrapper {
      margin: 30px 0;
      text-align: center;
    }

    .button {
      background-color: #000;
      color: #fff !important;
      padding: 14px 24px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      display: inline-block;
      min-width: 200px;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #777;
      margin-top: 40px;
      border-top: 1px solid #eee;
      padding-top: 20px;
    }

    @media only screen and (max-width: 600px) {
      .container {
        margin: 20px;
        padding: 20px;
      }

      .button {
        font-size: 15px;
        padding: 12px 18px;
        min-width: unset;
        width: 100%;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reset Your Password</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset the password for your <strong>EstatePro</strong> account.</p>
      <p>Please click the button below to set a new password:</p>

      <div class="button-wrapper">
        <a href="${resetLink}" class="button" target="_blank" rel="noopener noreferrer">
          Reset Password
        </a>
      </div>

      <p>If you didn’t request this, you can ignore this email.</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} EstatePro. All rights reserved.<br />
      This is an automated message – please do not reply.
    </div>
  </div>
</body>
</html>
`;
};



