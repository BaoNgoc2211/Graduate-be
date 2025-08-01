import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
  
}
export interface IAdminRequest extends Request{
      admin?: {
        userId: string;
      };
}


export {};