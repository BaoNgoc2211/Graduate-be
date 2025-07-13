import mongoose, { Schema } from "mongoose";


const message = new Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: "ChatRoom", required: true },
        senderType: { type: String, enum: ["user", "staff"], required: true },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "senderType",
            required: true,
        },
        content: { type: String, required: true },
        // seen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message",message);
export default Message;