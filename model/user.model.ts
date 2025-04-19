import { Jwt } from './../node_modules/@types/jsonwebtoken/index.d';
import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    birth: {
      type: Date,
      default: null,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { collection: "User", timestamps: true }
);
UserSchema.methods.generateAuthToken = function () {
  return Jwt.sign(
    { _id: this._id, email: this.email, role: this.role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

const User = mongoose.model("User", UserSchema);
export default User;
