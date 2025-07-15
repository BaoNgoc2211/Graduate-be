import asyncError from "../middleware/error.middleware";
import { returnRes } from "../util/response";
import chatServices from "../service/chat.services";
import { Request, Response } from "express";
import { IAdminRequest } from "../types/express";

class ChatController {
  startChat = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const {message} = req.body;
    // const { userId, message } = req.body;
    const data = await chatServices.startChatRoom(String(userId), message);
    returnRes(res, 200, "Chat room started", data);
  });

  sendMessage = asyncError(async (req: Request, res: Response) => {
    const senderId = req.user;
    const { roomId, content } = req.body;
    const data = await chatServices.sendMessage(roomId, String(senderId), content);
    returnRes(res, 200, "Message sent", data);
  });

  getMessages = asyncError(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const data = await chatServices.getMessage(roomId);
    returnRes(res, 200, "Messages fetched", data);
  });

  getStaffMessage = asyncError(async (req: IAdminRequest, res: Response) => {
    const userId =req.admin
    console.log(userId)
    // const { roomId } = req.params;
    const data = await chatServices.getStaffMessage(String(userId));
    returnRes(res, 200, "Messages fetched", data);
  });

  getUnassignedRooms = asyncError(async (req: IAdminRequest, res: Response) => {
    const data = await chatServices.getUnassignedRooms();
    returnRes(res, 200, "Unassigned rooms fetched", data);
  });
}
export default new ChatController();