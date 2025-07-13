import mongoose from "mongoose";

export interface IChatRoom extends Document {
  user: mongoose.Types.ObjectId;
  staff?: mongoose.Types.ObjectId;
  isHandled: boolean;
  status: "open" | "closed";
  lastMessage?: string;
}