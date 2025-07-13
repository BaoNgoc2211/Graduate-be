// sockets/chat.socket.ts
import { Server, Socket } from "socket.io";
import ChatRoom from "../model/chat/chat-room.model";
import Message from "../model/chat/message.model";

const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected: ", socket.id);

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on("sendMessage", async ({ roomId, content, senderId, senderType }) => {
      // Ghi message vào DB
      const message = await Message.create({
        room: roomId,
        content,
        sender: senderId,
        senderType,
      });

      // Nếu là staff và chưa gán người xử lý
      const chatRoom = await ChatRoom.findById(roomId);
      if (chatRoom && !chatRoom.staff && senderType === "staff") {
        chatRoom.staff = senderId;
        chatRoom.isHandled = true;
        await chatRoom.save();
      }

      // Gửi message đến room
      io.to(roomId).emit("newMessage", {
        _id: message._id,
        content: message.content,
        senderId,
        senderType,
        createdAt: message.createdAt,
      });
    });
  });
};

export default chatSocket;
