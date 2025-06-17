import express from "express";
import chatController from "../controller/chat.controller";

const router = express.Router();
router.post('/send', chatController.userSendMassage); // user gửi
router.get('/pending', chatController.staffGetPendingMessages); // staff lấy danh sách chờ xử lý
router.post('/reply/:threadId', chatController.staffReplyToThread); // staff trả lời
router.get('/:threadId', chatController.getThreadMessages); // lấy tin nhắn theo thread

export default router;