import { IMessage } from "../interface/chat/message.interface";
import MessageModel from "../model/chat/message.model";
import ThreadModel from "../model/chat/thread.model";

class chatServices{
    async sendUserMessage(userId: string, message: string):Promise<IMessage> {
        let thread = await ThreadModel.findOne({ userId });
        if(!thread) {
            thread = await ThreadModel.create({ userId });
        }
        const newMessage = await MessageModel.create({
            threadId: thread._id,
            senderId: userId,
            message
        });
        return newMessage;
    }
    
    async getPendingMessages(){
        return ThreadModel.find({ status: 'pending' }).sort({ createdAt: -1 })
    }


    async replyToThread(threadId: string, message: string, staffId: string) {
        const thread = await ThreadModel.findById(threadId);
        if (!thread) {
            throw new Error("Thread not found");
        }
        if (thread.status === 'pending') {
            thread.assignedTo = staffId;
            thread.status = 'assigned';
            await thread.save();
        }
    
        thread.status = 'assigned';
        await thread.save();

        const newMessage = await MessageModel.create({
            threadId: thread._id,
            senderId: staffId,
            message
        });
        return newMessage;
    }
    async getThreadMessages(threadId: string) {
        return MessageModel.find({ threadId }).sort({ timestamp: 1 });
    }

}
const chatService = new chatServices();
export default chatService;