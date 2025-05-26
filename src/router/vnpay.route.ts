import { Router } from "express";
import vnPayController from "../controller/vnpay.controller";

const router = Router();

router.post("/payment", vnPayController.createPayment);
router.get("/callback", vnPayController.paymentCallback);

export default router;