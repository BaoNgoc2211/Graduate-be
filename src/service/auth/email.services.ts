import nodemailer from "nodemailer";
import config from "../../config";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});
export class EmailService {
  static async sendOTP(email: string, otp: string) {
    try {
      const mailOptions = {
        from: config.email.user,
        to: email,
        subject: "Mã OTP đăng nhập",
        html: `
            <h1>Mã OTP của bạn</h1>
            <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
            <p>Mã này sẽ hết hạn sau 10 phút.</p>
            <p>Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.</p>
          `,
      };
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send OTP email");
    }
  }
}
