import mongoose, { Schema } from "mongoose";

export interface IChatThreadDocument extends Document {
  userId: mongoose.Types.ObjectId;
  adminId?: mongoose.Types.ObjectId;
  status: 'open' | 'closed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

const ChatThreadSchema = new Schema<IChatThreadDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", default: null },
    status: {
      type: String,
      enum: ['open', 'closed', 'pending'],
      default: 'open'
    }
  },
  { timestamps: true }
);
export default mongoose.model<IChatThreadDocument>("ChatThread", ChatThreadSchema);