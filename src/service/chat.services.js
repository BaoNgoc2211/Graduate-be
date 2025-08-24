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
const mongoose_1 = __importDefault(require("mongoose"));
const chat_room_model_1 = __importDefault(require("../model/chat/chat-room.model"));
const message_model_1 = __importDefault(require("../model/chat/message.model"));
const admin_model_1 = __importDefault(require("../model/auth/admin.model"));
class ChatSevices {
    startChatRoom(userId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let room = yield chat_room_model_1.default.findOne({ user: userId, status: "open" });
            if (!room) {
                room = yield chat_room_model_1.default.create({ user: userId });
            }
            const newMessage = yield message_model_1.default.create({
                room: room._id,
                sender: userId,
                senderType: "user",
                content: message,
            });
            room.lastMessage = message;
            yield room.save();
            return { room, newMessage };
        });
    }
    sendMessage(roomId, senderId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield chat_room_model_1.default.findById(roomId);
            if (!room)
                throw new Error("Room not found");
            let senderType;
            const staff = yield admin_model_1.default.findById(senderId);
            if ((staff === null || staff === void 0 ? void 0 : staff.role) === "staff" || (staff === null || staff === void 0 ? void 0 : staff.role) === "admin") {
                senderType = "staff";
                room.staff = new mongoose_1.default.Types.ObjectId(senderId);
                room.isHandled = true;
            }
            else {
                senderType = "user";
            }
            // if (!room.staff && senderType === "staff") {
            //     room.staff = new mongoose.Types.ObjectId(senderId);
            //     room.isHandled = true;
            // }
            const message = yield message_model_1.default.create({
                room: roomId,
                sender: senderId,
                senderType,
                content,
            });
            room.lastMessage = content;
            yield room.save();
            return message;
        });
    }
    getMessage(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_model_1.default.find({ room: roomId }).sort("createdAt");
        });
    }
    getStaffMessage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const staff = yield chat_room_model_1.default.find({
                staff: userId,
                status: "open",
            }).populate({
                path: "user",
                select: "info.name",
            });
            if (!staff)
                throw new Error("Room not found");
            return staff;
        });
    }
    getUnassignedRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_room_model_1.default.find({ isHandled: false, status: "open" }).populate({
                path: "user",
                select: "info.name",
            });
        });
    }
    getAllRooms() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chat_room_model_1.default.find().select("staff isHandled status lastMessage createdAt");
        });
    }
    assignStaffToRoom(roomId, staffId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield chat_room_model_1.default.findById(roomId);
            if (!room)
                throw new Error("Room not found");
            room.staff = new mongoose_1.default.Types.ObjectId(staffId);
            room.isHandled = true;
            yield room.save();
            return room;
        });
    }
    unassignStaffFromRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield chat_room_model_1.default.findById(roomId);
            if (!room)
                throw new Error("Room not found");
            // room.staff = null;
            room.staff = undefined; // or use null if you prefer
            room.isHandled = false;
            yield room.save();
            return room;
        });
    }
    closeChatRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield chat_room_model_1.default.findById(roomId);
            if (!room)
                throw new Error("Room not found");
            room.status = "closed";
            yield room.save();
            return room;
        });
    }
    getCurrentUserRoom(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield chat_room_model_1.default.findOne({
                user: userId,
                status: "open"
            }).populate({
                path: "user",
                select: "info.name email"
            });
            return room;
        });
    }
    updatePrescriptionMessage(messageId, newText) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield message_model_1.default.findById(messageId);
            if (!message)
                throw new Error("Message not found");
            message.content = newText;
            yield message.save();
            return message.content;
        });
    }
}
exports.default = new ChatSevices();
