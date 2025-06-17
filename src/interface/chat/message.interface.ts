import { Types } from "mongoose";

export interface IMessage {
  threadId: Types.ObjectId;
  senderId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}