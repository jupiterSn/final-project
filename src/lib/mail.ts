import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export async function sendOtpEmail(email: string, code: string) {
  if (!EMAIL_USER || !EMAIL_PASS) {
    throw new Error("Email environment variables are missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"SecureCloud" <${EMAIL_USER}>`,
    to: email,
    subject: "Your SecureCloud OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>SecureCloud Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 4px;">${code}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  });
}