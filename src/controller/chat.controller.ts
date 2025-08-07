import asyncError from "../middleware/error.middleware";
import { returnRes } from "../util/response";
import chatServices from "../service/chat.services";
import { Request, Response } from "express";
import { IAdminRequest } from "../types/express";

class ChatController {
  startChat = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const { message } = req.body;
    // const { userId, message } = req.body;
    const data = await chatServices.startChatRoom(String(userId), message);
    returnRes(res, 200, "Chat room started", data);
  });

  sendMessage = asyncError(async (req: Request, res: Response) => {
    const senderId = req.user;
    const { roomId, content } = req.body;
    const data = await chatServices.sendMessage(
      roomId,
      String(senderId),
      content
    );
    returnRes(res, 200, "Message sent", data);
  });

  getMessages = asyncError(async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const data = await chatServices.getMessage(roomId);
    returnRes(res, 200, "Messages fetched", data);
  });

  getStaffMessage = asyncError(async (req: IAdminRequest, res: Response) => {
    const userId = req.admin;
    console.log(userId);
    // const { roomId } = req.params;
    const data = await chatServices.getStaffMessage(String(userId));
    returnRes(res, 200, "Messages fetched", data);
  });

  getUnassignedRooms = asyncError(async (req: IAdminRequest, res: Response) => {
    const data = await chatServices.getUnassignedRooms();
    returnRes(res, 200, "Unassigned rooms fetched", data);
  });
  getAllRooms = asyncError(async (req: IAdminRequest, res: Response) => {
    const data = await chatServices.getAllRooms();
    returnRes(res, 200, "All rooms fetched", data);
  });
  assignStaffToRoom = asyncError(async (req: IAdminRequest, res: Response) => {
    const { roomId } = req.params;
    const staffId = req.admin;
    const data = await chatServices.assignStaffToRoom(roomId, String(staffId));
    returnRes(res, 200, "Staff assigned successfully", data);
  });

  unassignStaffFromRoom = asyncError(
    async (req: IAdminRequest, res: Response) => {
      const { roomId } = req.params;
      const data = await chatServices.unassignStaffFromRoom(roomId);
      returnRes(res, 200, "Staff unassigned successfully", data);
    }
  );

  closeChatRoom = asyncError(async (req: IAdminRequest, res: Response) => {
    const { roomId } = req.params;
    const data = await chatServices.closeChatRoom(roomId);
    returnRes(res, 200, "Chat room closed successfully", data);
  });
  getCurrentUserRoom = asyncError(async (req: Request, res: Response) => {
    const userId = req.user;
    const room = await chatServices.getCurrentUserRoom(String(userId));
    returnRes(res, 200, "Current room fetched", room);
  });
}
export default new ChatController();
