import mongoose from 'mongoose';
import { IThread } from '../../interface/chat/thread.interface';

const threadSchema = new mongoose.Schema<IThread>({
  userId: { type: String, required: true },
  assignedTo: { type: String },
  status: { type: String, enum: ['pending', 'assigned', 'closed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
},{ collection: 'Thread' });

const ThreadModel = mongoose.model<IThread>('Thread', threadSchema);
export default ThreadModel;