import OTP from "../model/shipping.model";
class OtpRepository {
  async saveOTP(email: string, otp: string) {
    await OTP.create({
      email,
      otp,
      time: new Date(Date.now() + 1000 * 60 * 10),
    });
  }

  async findOTP(email: string, otp: string) {
    return await OTP.findOne({ email, otp });
  }

  async deleteOTP(email: string) {
    return await OTP.deleteOne({ email });
  }
}

export default new OtpRepository();
