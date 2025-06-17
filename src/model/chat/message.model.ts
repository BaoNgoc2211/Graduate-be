import mongoose,{Schema} from "mongoose";
import { IMessage } from "../../interface/chat/message.interface";


const messageSchema = new Schema<IMessage>({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
},{collection: 'Message'});

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
export default MessageModel;