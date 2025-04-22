import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

interface JWTPayload {
  userId: string;
  [key: string]: any;
}

class JWTServices {
  generateToken(payload: JWTPayload): string {
    if (!config.jwt?.secret) {
      throw new Error("JWT secret is not configured");
    }

    const options: SignOptions = {
      expiresIn: config.jwt.expiresIn || "2h"
    };

    return jwt.sign(payload, config.jwt.secret, options);
  }

  clearJwt(res: Response): void {
    res.clearCookie("token");
  }
}

export default new JWTServices();