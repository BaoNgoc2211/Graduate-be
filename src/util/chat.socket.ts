// sockets/chat.socket.ts
import { Server, Socket } from "socket.io";
import chatServices from "../service/chat.services";

const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    // Join room
    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId);
    });

    // Gửi message (có xử lý gán staff nếu cần)
    socket.on("sendMessage", async ({ roomId, content, senderId }) => {
      try {
        // Dùng lại service để xử lý logic
        const message = await chatServices.sendMessage(roomId, senderId, content);

        io.to(roomId).emit("newMessage", {
          _id: message._id,
          content: message.content,
          senderId: message.sender,
          senderType: message.senderType,
          createdAt: message.createdAt,
        });
      } catch (err) {
        console.error("Socket sendMessage error:", err);
        socket.emit("errorMessage", { message: "Failed to send message" });
      }
    });
  });
};

export default chatSocket;