import { Router } from "express";
import { generatePaymentUrl, handlePaymentResponse } from "../controller/vnpay.controller";

const router = Router();

router.post("/payment", generatePaymentUrl);
router.get("/callback", handlePaymentResponse);

export default router;