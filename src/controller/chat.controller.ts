import { Request, Response } from "express";
import chatService from "../service/chat.services";

class ChatController {
    userSendMassage = async (req: Request, res: Response) => {
        const { userId, message } = req.body;
        const result = await chatService.sendUserMessage(userId, message);
        res.status(201).json({ status: "success", message: "Message sent successfully", data: result });
    }
    staffGetPendingMessages = async (req: Request, res: Response) => {
        const result = await chatService.getPendingMessages();
        res.status(200).json({ status: "success", message: "Pending messages retrieved successfully", data: result });
    }
    staffReplyToThread = async (req: Request, res: Response) => {
        const { message, staffId } = req.body;
        const { threadId } = req.params;
        const result = await chatService.replyToThread(threadId, message, staffId);
        res.status(200).json({ status: "success", message: "Reply sent successfully", data: result });
    }
    getThreadMessages = async (req: Request, res: Response) => {
        const { threadId } = req.params;
        const result = await chatService.getThreadMessages(threadId);
        res.status(200).json({ status: "success", message: "Thread messages retrieved successfully", data: result });
    }
}
const chatController = new ChatController();
export default chatController;