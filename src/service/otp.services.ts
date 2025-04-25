import otpGenerator from 'otp-generator';
import otpRepository from '../repository/otp.repository';
import throwError from '../utils/create-error';
import authRepository from '../repository/auth.repository';

class OtpServices {
    generateOTP = () => {
        return otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })
    }

    findOTP = async (email: string, otp: string) => {
        if (!(await otpRepository.findOTP(email,otp))) {
            throwError(404, 'OTP wrong or expired')
        }
    }

    saveOTP = async (email: string, otp: string) => {
        return await otpRepository.saveOTP(email,otp);
    }

    verifyOTP = async (email: string, otp: string) => {
        await this.findOTP(email,otp);
        await otpRepository.deleteOTP(email);
        return await authRepository.verifyUser(email);
    }
}

export default new OtpServices();