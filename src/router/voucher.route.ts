import express from "express";
import controller from "../controller/voucher.controller";
const router = express.Router();
router.post("/create-voucher", controller.addVoucher);
export default router;
