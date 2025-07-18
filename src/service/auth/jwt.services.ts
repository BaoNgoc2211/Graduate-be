import { Response } from "express";
// import jwt, { SignOptions } from "jsonwebtoken";
// import config from "../config";

// interface JWTPayload {
//   userId: string;
//   [key: string]: any;
// }

// class JWTServices {
//   generateToken(payload: JWTPayload): string {
//     if (!config.jwt?.secret) {
//       throw new Error("JWT secret is not configured");
//     }

//     const options: SignOptions = {
//       expiresIn: config.jwt.expiresIn || "2h"
//     };

//     return jwt.sign(payload, config.jwt.secret, options);
//   }

//   clearJwt(res: Response): void {
//     res.clearCookie("token");
//   }
// }

// export default new JWTServices();import { Response } from "express";
import { IJwt } from "../../interface/auth/jwt.interface";
import jwt from "jsonwebtoken";

class JwtServices implements IJwt {
  /**
   * Sinh accessToken và gắn vào cookie
   * @param res Express Response object
   * @param userId ID của user được mã hóa
   * @returns accessToken (chỉ để debug, không trả về FE)
   */
  generateJwt(res: Response, userId: string): string {
    const payload = {
      userId,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    });
    return accessToken;
  }

  
  generateAdminJwt(res: Response, adminId: string): string {
    const payload = { userId: adminId };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 2,
    });

    return token;
  }

   /**
   * Xóa accessToken khỏi cookie
   * @param res Express Response object
   */
  clearJwt(res: Response): void {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
}

const jwtServices = new JwtServices();
export default jwtServices;
