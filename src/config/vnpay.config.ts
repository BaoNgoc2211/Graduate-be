const vnpayConfig = {
  vnp_TmnCode: process.env.VNP_TMNCODE || "YOUR_VNP_TMNCODE",
  vnp_HashSecret: process.env.VNP_HASHSECRET || "YOUR_VNP_HASHSECRET",
  vnp_Url: process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  vnp_ReturnUrl: process.env.VNP_RETURNURL || "http://localhost:3000/vnpay/callback",
};
export default vnpayConfig;