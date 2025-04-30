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
import { IJwt } from "../../interface/jwt.interface";
import jwt from "jsonwebtoken";

class JwtServices implements IJwt {
  generateJwt(res: Response, userId: string): string {
    const payload = {
      userId,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN!, {
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
