// import { IUser } from "./../../interface/auth/user.interface";
// // types/express/index.d.ts
// import { UserDocument } from "../../models/User";

// export {};
// declare global {
//   namespace Express {
//     interface IUser {
//       userId: string;
//     }

//     interface Request {
//       user?: IUser;
//     }
//   }
// }
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