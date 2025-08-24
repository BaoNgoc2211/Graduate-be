"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vnpayConfig = {
    vnp_TmnCode: process.env.VNP_TMNCODE || "",
    vnp_HashSecret: process.env.VNP_HASHSECRET || "",
    vnp_Url: process.env.VNP_URL || "",
    vnp_ReturnUrl: process.env.VNP_RETURNURL || "",
};
exports.default = vnpayConfig;
