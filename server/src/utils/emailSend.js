import { transporter } from "../middlewares/otp.middleware.js";
import { Verification_Email_Template, Welcome_Email_Template } from "../utils/emailTemplate.js";

// Send Verification Email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    if (!Verification_Email_Template) {
      throw new Error("Verification Email Template not found.");
    }

    const response = await transporter.sendMail({
      from: `"Instagram OTP" <${process.env.EMAIL}>`,
      to: email,
      subject: "Verify your Email",
      text: "Please verify your email using the code provided.",
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    });

    console.log("Verification Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Send Welcome Email
const sendWelcomeEmail = async (email, name) => {
  try {
    if (!Welcome_Email_Template) {
      throw new Error("Welcome Email Template not found.");
    }

    const response = await transporter.sendMail({
      from: `"Instagram" <${process.env.EMAIL}>`,
      to: email,
      subject: "Welcome to Instagram!",
      text: `Welcome, ${name}! We’re glad to have you on Instagram.`,
      html: Welcome_Email_Template.replace("{name}", name),
    });

    console.log("Welcome Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};


export {
    sendVerificationEmail,
    sendWelcomeEmail
}