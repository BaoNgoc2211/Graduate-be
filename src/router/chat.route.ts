import { Router } from "express";
import chatController from "../controller/chat.controller";
import { protect } from "../middleware/auth.middleware";
import { adminProtect } from "../middleware/admin.middleware";

const router = Router();

router.post("/start",protect, chatController.startChat);
router.post("/send",protect, adminProtect, chatController.sendMessage);
router.get("/messages/:roomId",protect,adminProtect, chatController.getMessages);
router.get("/staff/messages",adminProtect,chatController.getStaffMessage)
router.get("/unassigned",adminProtect, chatController.getUnassignedRooms);
router.get("/all",adminProtect, chatController.getAllRooms);

export default router;