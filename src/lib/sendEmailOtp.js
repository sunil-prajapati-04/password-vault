import nodeMailer from 'nodemailer';
import { config } from "dotenv";
config();

export const sendEmailOtp = async (toEmail,otp,username)=>{
   try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: `"Password Vault" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your OTP Code",
      html: `<h2>Your OTP Code</h2><p><h3>Hello, ${username}</h3></p><p>Use this OTP to verify your login: <b>${otp}</b></p><p>This OTP will expire in 5 minute.</p>`
    };

    await transporter.sendMail(mailOptions); 
    console.log(" OTP sent to:", toEmail);
  } catch (err) {
    console.error(" Error sending OTP:", err.message);
    throw err;
  }
}
