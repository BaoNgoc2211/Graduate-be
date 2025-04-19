import mailServices from "./mail.services";
import authRepository from "../repository/auth.repository";
import throwError from '../utils/create-error';
import bcrypt from "../utils/bcrypt";
import otpServices from "./otp.services";
import otpRepository from "../repository/otp.repository";
import User from "../models/user.model";
import { IProfile, IUser } from "../interfaces/user.interface";
import { OTPInvoker } from "../command/otp-invoker";
import { GenerateOTP } from "../command/generateOTP";
import { sendOTP } from "../command/sendOTP";
import { VerifyOTP } from "../command/verifyOTP";
import { ResendOTP } from "../command/resendOTP";

class AuthServices {
    private otpInvoker = new OTPInvoker();

    private async checkEmail(email: string) {
        if (await authRepository.findEmail(email)) {
            throwError(404, 'Email is already exists')
        }
    }

    private async checkVerifyUser(email: string) {
        const user = await User.findOne({email})
        if (!user) {
            throwError(404, 'User not found')
        }
        return user?.isVerify;
    }

    private async getUserByEmail(email: string) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    

    private async comparePassword(password: string, hashPassword: string) {
        if (!(await bcrypt.Compare(password,hashPassword))) {
            throwError(400, 'Email or password wrong')
        }
    }

    signUp = async(user: IUser) => {
        await this.checkEmail(user.email);
        user.password = await bcrypt.Hash(user.password!);
        this.otpInvoker.setCommand(new GenerateOTP(user.email));
        this.otpInvoker.setCommand(new sendOTP(user.email));
        await this.otpInvoker.executeCommand(); 
        return await authRepository.createUser(user);
    }

    verifyEmail = async(email: string, otp: string) => {
        this.otpInvoker.setCommand(new VerifyOTP(email, otp));
        return this.otpInvoker.executeCommand();
    }

    signIn = async (email: string, password: string) => {
        const user = await this.getUserByEmail(email);
        await this.comparePassword(password, user.password!);
        return user.id;
    }

    resendOTP = async(email: string) => {
        if (await this.checkVerifyUser(email)) {
            throwError(400, 'Email has already been verify');
        }
        this.otpInvoker.setCommand(new ResendOTP(email))
        return this.otpInvoker.executeCommand();
    }

    forgotPassword = async (email: string) => {
        await this.getUserByEmail(email);
        const otp = otpServices.generateOTP();
        await otpServices.saveOTP(email,otp);
        mailServices.sendForgotPasswordEmail(email,otp);
    }

    resetPassword = async (email: string, otp: string, newPassword: string) => {
        await otpServices.findOTP(email,otp);
        await authRepository.updatePassword(email, await bcrypt.Hash(newPassword));
        await otpRepository.deleteOTP(email);
    }

    async createUserGoogle(profile: IProfile) {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = await User.create({
                googleId: profile.id,
                email: profile.emails?.[0]?.value || '',
                fullName: profile.displayName,
                profilePicture: profile.photos?.[0]?.value || '',
                isVerify: true
            });
        }
        return user;
    }
    
    async createUserGithub(profile: IProfile) {
        try {
            let user = await User.findOne({ githubId: profile.id });
            
            if (!user) {
                user = await User.create({
                    githubId: profile.id,
                    email: profile.emails?.[0]?.value || '',
                    fullName: profile.displayName,
                    profilePicture: profile.photos?.[0]?.value || '',
                    isVerify: true
                });
            }
            
            return user;
        } catch (error) {
            console.error('Lỗi khi tạo user từ GitHub:', error);
            throw new Error('Không thể tạo user từ GitHub');
        }
    }
    
}

const authServices = new AuthServices();
export default authServices;