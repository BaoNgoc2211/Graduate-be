import mongoose, { Schema } from "mongoose";
import { IChatRoom } from "../../interface/chat/chat-room";


const chatRoom = new Schema<IChatRoom>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    isHandled: { type: Boolean, default: false },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    lastMessage: { type: String },
  },
  {collection:"Room", timestamps: true }
);

const ChatRoom = mongoose.model<IChatRoom>("Room",chatRoom);
export default ChatRoom;