"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_services_1 = __importDefault(require("../service/chat.services"));
const chatSocket = (io) => {
    io.on("connection", (socket) => {
        // Join room
        socket.on("joinRoom", ({ roomId }) => {
            socket.join(roomId);
        });
        // Gửi message (có xử lý gán staff nếu cần)
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ roomId, content, senderId }) {
            try {
                // Dùng lại service để xử lý logic
                const message = yield chat_services_1.default.sendMessage(roomId, senderId, content);
                io.to(roomId).emit("newMessage", {
                    _id: message._id,
                    content: message.content,
                    senderId: message.sender,
                    senderType: message.senderType,
                    createdAt: message.createdAt,
                });
            }
            catch (err) {
                console.error("Socket sendMessage error:", err);
                socket.emit("errorMessage", { message: "Failed to send message" });
            }
        }));
    });
};
exports.default = chatSocket;
