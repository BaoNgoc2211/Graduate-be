import mongoose from "mongoose";
import { genderType } from "../enum/user.enum";

export interface IUser {
  email: string;
  name?: string;
  password: string;
  avatar: string;
  phone?: string;
  gender?: genderType;
  birth?: Date;
  point?: number;
  googleId?: string;
  isProfileCompleted: boolean;
  role: 'user' | 'admin';
}
export interface IUserMethods {
  generateAuthToken(): string;
}
export type UserModel = mongoose.Model<IUser, {}, IUserMethods>;
