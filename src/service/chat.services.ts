import { IMessage } from "../interface/chat/message.interface";
import { IThread } from "../interface/chat/thread.interface";
import MessageModel from "../model/chat/message.model";
import ThreadModel from "../model/chat/thread.model";
import chatRepository from "../repository/chat.repository";

class chatServices{
    // async createMessage(message: IMessage) {
    //     return await MessageModel.create(message);
    // }

    // async getThreadById(threadId: string) {
    //     return await ThreadModel.findById(threadId);5
    // }

    // async createThread(thread: Partial<IThread>) {
    //     return await ThreadModel.create(thread);
    // }

    // async assignThread(threadId: string, staffId: string) {
    //     return await ThreadModel.findByIdAndUpdate(threadId, {
    //     assignedTo: staffId,
    //     status: 'assigned'
    //     }, { new: true });
    // }

    // async getUnassignedThreads() {
    //     return await ThreadModel.find({ status: 'pending' });
    // }

    // async getMessagesByThreadId(threadId: string) {
    //     return await MessageModel.find({ threadId });
    // }

    // async sendUserMessage(userId: string, message: string):Promise<IMessage> {
    //     let thread = await ThreadModel.findOne({ userId });
    //     if(!thread) {
    //         thread = await ThreadModel.create({ userId });
    //     }
    //     const newMessage = await MessageModel.create({
    //         threadId: thread._id,
    //         senderId: userId,
    //         message
    //     });
    //     return newMessage;
    // }
    
    // async getPendingMessages(){
    //     return ThreadModel.find({ status: 'pending' }).sort({ createdAt: -1 })
    // }


    // async replyToThread(threadId: string, message: string, staffId: string) {
    //     const thread = await ThreadModel.findById(threadId);
    //     if (!thread) {
    //         throw new Error("Thread not found");
    //     }
    //     if (thread.status === 'pending') {
    //         thread.assignedTo = staffId;
    //         thread.status = 'assigned';
    //         await thread.save();
    //     }
    
    //     thread.status = 'assigned';
    //     await thread.save();

    //     const newMessage = await MessageModel.create({
    //         threadId: thread._id,
    //         senderId: staffId,
    //         message
    //     });
    //     return newMessage;
    // }
    async getThreadMessages(threadId: string) {
        return MessageModel.find({ threadId }).sort({ timestamp: 1 });
    }
    async handleIncomingMessage(messageData: IMessage, senderRole: 'user' | 'staff') {
        const thread = await chatRepository.getThreadById(messageData.threadId);

        if (!thread) throw new Error("Thread not found");

        // Nếu nhân viên gửi tin nhắn và thread đã được assigned → kiểm tra quyền
        if (senderRole === 'staff') {
        if (thread.status === 'assigned' && thread.assignedTo !== messageData.senderId) {
            throw new Error("Thread already assigned to another staff");
        }

        // Nếu chưa assigned → gán nhân viên này xử lý
        if (thread.status === 'pending') {
            await chatRepository.assignThread(thread.id, messageData.senderId);
        }
        }

    // Tạo message mới
    return await chatRepository.createMessage(messageData);
  }

  async getMessages(threadId: string) {
    return await chatRepository.getMessagesByThreadId(threadId);
  }
    

}
const chatService = new chatServices();
export default chatService;