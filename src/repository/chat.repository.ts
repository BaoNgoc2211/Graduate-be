import { IMessage } from "../interface/chat/message.interface";
import { IThread } from "../interface/chat/thread.interface";
import MessageModel from "../model/chat/message.model";
import ThreadModel from "../model/chat/thread.model";

class ChatRepository{
    async createMessage(message: IMessage) {
    return await MessageModel.create(message);
  }

  async getThreadById(threadId: any) {
    return await ThreadModel.findById(threadId);
  }

  async createThread(thread: Partial<IThread>) {
    return await ThreadModel.create(thread);
  }

  async assignThread(threadId: string, staffId: string) {
    return await ThreadModel.findByIdAndUpdate(threadId, {
      assignedTo: staffId,
      status: 'assigned'
    }, { new: true });
  }

  async getUnassignedThreads() {
    return await ThreadModel.find({ status: 'pending' });
  }

  async getMessagesByThreadId(threadId: string) {
    return await MessageModel.find({ threadId });
  }
}
export default new ChatRepository();