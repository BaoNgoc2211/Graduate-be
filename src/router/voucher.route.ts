import express from "express";
import controller from "../controller/voucher.controller";
const router = express.Router();
router.post("/create-voucher", controller.addVoucher);
router.get("/getallvoucher",controller.getAll);
router.get("/getVoucher",controller.getValidVoucher)
export default router;
