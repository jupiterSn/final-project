import dns from "node:dns";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

dns.setDefaultResultOrder("ipv4first");

export function isEmailConfigured() {
  return Boolean(EMAIL_USER && EMAIL_PASS);
}

export async function sendOtpEmail(email: string, code: string) {
  if (!isEmailConfigured()) {
    throw new Error(
      "Email is not configured. Add EMAIL_USER and EMAIL_PASS to .env.local, then restart the dev server."
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SecureExam" <${EMAIL_USER}>`,
      to: email,
      subject: "Your SecureExam OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>SecureExam Verification</h2>
          <p>Your OTP code is:</p>

          <h1 style="letter-spacing: 4px;">
            ${code}
          </h1>

          <p>
            This code expires in 5 minutes.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error("OTP email send failed:", error);
    throw new Error(
      "Could not send OTP email. Check that EMAIL_USER is a Gmail address and EMAIL_PASS is a valid Gmail app password."
    );
  }
}
