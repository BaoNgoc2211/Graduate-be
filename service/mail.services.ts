import transporter from "../utils/mail";

class MailServices {    
    async sendVerifyEmail(email:string,OTP:string) {
        await transporter.sendMail({
            from: `"E-commerce" <${process.env.EMAIL_USER!}>`,
            to: email,
            subject: 'Verify Email',
            html: `Your OTP - ${OTP}`
        })
    }
    async sendForgotPasswordEmail(email:string,OTP:string) {
        await transporter.sendMail({
            from: `"E-commerce" <${process.env.EMAIL_USER!}>`,
            to: email,
            subject: 'Forgot Password Email',
            html: `Your OTP - ${OTP}`
        })
    }
    
}

const mailServices = new MailServices();
export default mailServices;