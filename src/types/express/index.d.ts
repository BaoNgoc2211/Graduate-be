import { IUser } from "./../../interface/auth/user.interface";
// types/express/index.d.ts
import { UserDocument } from "../../models/User";
export {};
declare global {
  namespace Express {
    interface IUser {
      userId: string;
    }

    interface Request {
      user?: IUser;
    }
  }
}
