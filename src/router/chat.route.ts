import express from "express";
import chatController from "../controller/chat.controller";

const router = express.Router();
// router.post('/send', chatController.userSendMassage); // user gửi
// router.get('/pending', chatController.staffGetPendingMessages); // staff lấy danh sách chờ xử lý
// router.post('/reply/:threadId', chatController.staffReplyToThread); // staff trả lời
// router.get('/:threadId', chatController.getThreadMessages); // lấy tin nhắn theo thread

// Gửi tin nhắn (dùng cho cả user và nhân viên)
router.post('/send', chatController.sendMessage);

// Lấy tất cả tin nhắn trong 1 thread
router.get('/thread/:threadId/messages', chatController.getMessages);


export default router;