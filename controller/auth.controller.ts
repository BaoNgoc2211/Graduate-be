// import { Request, Response } from "express";
// class AuthController {
//   signUp = async(req: Request, res: Response) =>  {
//     const data = await 
//   }
// }

// export default new AuthController();import { NextFunction, Request, Response } from 'express';
import authServices from '../services/auth.services';
import jwtServices from '../services/jwt.services';
import asyncError from '../middlewares/error.middleware';
import {returnRes} from '../utils/response';
import emailStrategy from '../strategies/email-strategy';
import googleStrategy from '../strategies/google-strategy';
import githubStrategy from '../strategies/github-strategy';
import { AppContext } from '../strategies/app-context';

class AuthController {
    signUp = asyncError(async (req:Request,res:Response) => {
        const data = await authServices.signUp(req.body);
        const accessToken = jwtServices.generateJwt(res,data.id);
        returnRes(res,201,'Sign up successful',accessToken);
    })

    verifyEmail = asyncError(async(req:Request,res:Response) => {
        const {email,otp} = req.body;
        await authServices.verifyEmail(email,otp);
        returnRes(res,200,'Verify email successful');
    })

    signIn = asyncError(async(req:Request,res:Response) => {
        const contextEmail = new AppContext(new emailStrategy());
        await contextEmail.signIn(req,res);
    })

    logout = asyncError(async(req:Request,res:Response) => {
        jwtServices.clearJwt(res);
        returnRes(res,200,'Log out successful')
    })

    resendOTP = asyncError(async (req: Request, res: Response) => {
        const {email} = req.body;
        await authServices.resendOTP(email);
        returnRes(res, 200, 'Resend OTP successful');
    })


    forgotPassword = asyncError(async(req:Request,res:Response) => { 
        const {email} = req.body;
        await authServices.forgotPassword(email);
        returnRes(res,200,`OTP sent to ${email}`)
    })
    
    resetPassword = asyncError(async(req:Request,res:Response) => {
        const {email, otp, newPassword} = req.body;
        await authServices.resetPassword(email, otp,newPassword);
        returnRes(res,200,'Reset password successful')
    })
   
    checkAuth = asyncError(async(req: Request, res: Response) => {
        const user = req.user;
        returnRes(res,200,'Check authentication successful',user);
    })

    googleAuth = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        const googleContext = new AppContext(new googleStrategy());
        await googleContext.signIn(req,res,next);
    })

    googleCallback = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        const token = await new googleStrategy().callback(req,res,next);
        console.log("Google Auth Token:", token);

    }) 

    githubAuth = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        const githubContext = new AppContext(new githubStrategy());
        await githubContext.signIn(req,res,next);
    })

    githubCallback = asyncError(async(req: Request, res: Response, next: NextFunction) => {
        await new githubStrategy().callback(req,res,next);
    }) 
}

const authController = new AuthController();
export default authController;