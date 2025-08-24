import mongoose from "mongoose";
import ChatRoom from "../model/chat/chat-room.model";
import Message from "../model/chat/message.model";
import Admin from "../model/auth/admin.model";

class ChatSevices {
  async startChatRoom(userId: string, message: string) {
    let room = await ChatRoom.findOne({ user: userId, status: "open" });
    if (!room) {
      room = await ChatRoom.create({ user: userId });
    }
    const newMessage = await Message.create({
      room: room._id,
      sender: userId,
      senderType: "user",
      content: message,
    });

    room.lastMessage = message;
    await room.save();

    return { room, newMessage };
  }
  async sendMessage(roomId: string, senderId: string, content: string) {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Room not found");

    let senderType;

    const staff = await Admin.findById(senderId);
    if (staff?.role === "staff" || staff?.role === "admin") {
      senderType = "staff";
      room.staff = new mongoose.Types.ObjectId(senderId);
      room.isHandled = true;
    } else {
      senderType = "user";
    }
    // if (!room.staff && senderType === "staff") {
    //     room.staff = new mongoose.Types.ObjectId(senderId);
    //     room.isHandled = true;
    // }
    const message = await Message.create({
      room: roomId,
      sender: senderId,
      senderType,
      content,
    });

    room.lastMessage = content;
    await room.save();

    return message;
  }
  async getMessage(roomId: string) {
    return await Message.find({ room: roomId }).sort("createdAt");
  }
  async getStaffMessage(userId: string) {
    const staff = await ChatRoom.find({
      staff: userId,
      status: "open",
    }).populate({
      path: "user",
      select: "info.name",
    });
    if (!staff) throw new Error("Room not found");
    return staff;
  }
  async getUnassignedRooms() {
    return await ChatRoom.find({ isHandled: false, status: "open" }).populate({
      path: "user",
      select: "info.name",
    });
  }
  async getAllRooms() {
    return await ChatRoom.find().select(
      "staff isHandled status lastMessage createdAt"
    );
  }
  async assignStaffToRoom(roomId: string, staffId: string) {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Room not found");

    room.staff = new mongoose.Types.ObjectId(staffId);
    room.isHandled = true;
    await room.save();

    return room;
  }

  async unassignStaffFromRoom(roomId: string) {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Room not found");

    // room.staff = null;
    room.staff = undefined; // or use null if you prefer
    room.isHandled = false;
    await room.save();

    return room;
  }

  async closeChatRoom(roomId: string) {
    const room = await ChatRoom.findById(roomId);
    if (!room) throw new Error("Room not found");

    room.status = "closed";
    await room.save();

    return room;
  }
  async getCurrentUserRoom(userId: string) {
    const room = await ChatRoom.findOne({ 
      user: userId, 
      status: "open" 
    }).populate({
      path: "user",
      select: "info.name email"
    });
    
    return room;
  }

  async updatePrescriptionMessage(messageId: string, newText: string) {
    const message = await Message.findById(messageId);
    if (!message) throw new Error("Message not found");

    message.content = newText;
    await message.save();

    return message.content;
  }
}
export default new ChatSevices();
