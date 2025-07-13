import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { IAdminRequest } from "../types/express";

dotenv.config();

export const adminProtect = (req: IAdminRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({ message: "No token, unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // if (decoded.role === "user") {
    //   return res.status(403).json({ message: "Access denied" });
    // }
    // if (!decoded.userId || !decoded.role) {
    //   return res.status(401).json({ message: "Invalid admin token" });
    // }

    req.admin = decoded.userId,
    // req.user = decoded.userId,

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export const requireAdminRole = (req: Request, res: Response, next: NextFunction) => {
  // if (!req.admin || req.admin.role !== "ADMIN") {
  //    res.status(403).json({ message: "Access denied: Admins only" });
  //    return;
  // }

  next();
};