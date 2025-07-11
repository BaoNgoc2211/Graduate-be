import { Socket,Server } from "socket.io";
import chatService from "../service/chat.services";
import { IMessage } from "../interface/chat/message.interface";

export class ChatSocketHandler {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  public initialize() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("join-thread", (threadId: string) => {
        socket.join(threadId);
        console.log(`Client ${socket.id} joined thread ${threadId}`);
      });

      socket.on("send-message", async (data: IMessage & { role: 'user' | 'staff' }) => {
        await this.handleSendMessage(socket, data);
      });
    });
  }

  private async handleSendMessage(socket: Socket, data: IMessage & { role: 'user' | 'staff' }) {
    try {
      const message = await chatService.handleIncomingMessage(data, data.role);

      // Gửi tin nhắn tới tất cả trong phòng
      this.io.to(data.threadId.toString()).emit("receive-message", message);

      // Nếu là staff và lần đầu trả lời → gửi thông báo assigned
      if (data.role === "staff") {
        const assignedNotification = {
          threadId: data.threadId,
          assignedTo: data.senderId,
        };
        this.io.emit("thread-assigned", assignedNotification);
      }

    } catch (error: any) {
      socket.emit("error-message", { error: error.message });
    }
  }
}
