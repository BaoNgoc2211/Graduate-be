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
const error_middleware_1 = __importDefault(require("../middleware/error.middleware"));
const response_1 = require("../util/response");
const chat_services_1 = __importDefault(require("../service/chat.services"));
const upload_services_1 = __importDefault(require("../service/upload.services"));
class ChatController {
    constructor() {
        this.startChat = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const { message } = req.body;
            // const { userId, message } = req.body;
            const data = yield chat_services_1.default.startChatRoom(String(userId), message);
            (0, response_1.returnRes)(res, 200, "Chat room started", data);
        }));
        this.sendMessage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const senderId = req.user;
            const { roomId, content } = req.body;
            const data = yield chat_services_1.default.sendMessage(roomId, String(senderId), content);
            (0, response_1.returnRes)(res, 200, "Message sent", data);
        }));
        this.getMessages = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const data = yield chat_services_1.default.getMessage(roomId);
            (0, response_1.returnRes)(res, 200, "Messages fetched", data);
        }));
        this.getStaffMessage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.admin;
            // const { roomId } = req.params;
            const data = yield chat_services_1.default.getStaffMessage(String(userId));
            (0, response_1.returnRes)(res, 200, "Messages fetched", data);
        }));
        this.getUnassignedRooms = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield chat_services_1.default.getUnassignedRooms();
            (0, response_1.returnRes)(res, 200, "Unassigned rooms fetched", data);
        }));
        this.getAllRooms = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield chat_services_1.default.getAllRooms();
            (0, response_1.returnRes)(res, 200, "All rooms fetched", data);
        }));
        this.assignStaffToRoom = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const staffId = req.admin;
            const data = yield chat_services_1.default.assignStaffToRoom(roomId, String(staffId));
            (0, response_1.returnRes)(res, 200, "Staff assigned successfully", data);
        }));
        this.unassignStaffFromRoom = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const data = yield chat_services_1.default.unassignStaffFromRoom(roomId);
            (0, response_1.returnRes)(res, 200, "Staff unassigned successfully", data);
        }));
        this.closeChatRoom = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { roomId } = req.params;
            const data = yield chat_services_1.default.closeChatRoom(roomId);
            (0, response_1.returnRes)(res, 200, "Chat room closed successfully", data);
        }));
        this.getCurrentUserRoom = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const room = yield chat_services_1.default.getCurrentUserRoom(String(userId));
            (0, response_1.returnRes)(res, 200, "Current room fetched", room);
        }));
        this.uploadPrescriptionMessage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const { roomId } = req.body;
            if (!req.file) {
                (0, response_1.returnRes)(res, 400, "No file uploaded");
                return;
            }
            const medicines = yield upload_services_1.default.uploadPrescription(req.file.path);
            const message = {
                type: "prescription",
                text: medicines.map(m => `${m.medicineName} ${m.quantity} ${m.unit}`).join(", "),
                medicines,
            };
            const data = yield chat_services_1.default.sendMessage(roomId, String(userId), message.text);
            (0, response_1.returnRes)(res, 200, "Prescription uploaded and message sent", data);
        }));
        this.updatePrescriptionMessage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { messageId, newText } = req.body;
            if (!newText) {
                (0, response_1.returnRes)(res, 400, "No text provided");
                return;
            }
            const updatedMedicines = chat_services_1.default.updatePrescriptionMessage(messageId, newText);
            (0, response_1.returnRes)(res, 201, "Prescription updated successfully!", updatedMedicines);
        }));
    }
}
exports.default = new ChatController();
