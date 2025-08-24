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
exports.handlePaymentResponse = exports.generatePaymentUrl = void 0;
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("../model/order/order.model"));
const order_services_1 = __importDefault(require("./order/order.services"));
// dotenv.config();
// process.env.TZ = "Asia/Ho_Chi_Minh";
const generatePaymentUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(orderId)) {
        res.status(404).json({ success: false, message: "Invalid order id" });
        return;
    }
    const order = yield order_model_1.default.findById(orderId);
    if (!order) {
        res.status(401).json({ success: false, message: "OrderId not found" });
        return;
    }
    const date = new Date();
    const createDate = (0, moment_1.default)(date).format("YYYYMMDDHHmmss");
    const expireDate = (0, moment_1.default)(date).add(15, "minutes").format("YYYYMMDDHHmmss");
    const ipAddr = "127.0.0.1"; // Có thể dùng req.ip hoặc req.headers['x-forwarded-for'] nếu dùng thực tế
    const tmnCode = process.env.VNP_TMNCODE || "";
    const secretKey = process.env.VNP_HASHSECRET || "";
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const returnUrl = process.env.VNP_RETURNURL || "";
    const locale = "vn";
    const currCode = "VND";
    const vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId.toString(),
        vnp_OrderInfo: `Payment for ${orderId}`,
        vnp_OrderType: "other",
        vnp_Amount: order.finalAmount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
        vnp_ExpireDate: expireDate,
    };
    const sortedParams = sortParams(vnp_Params);
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(sortedParams)) {
        urlParams.append(key, value.toString());
    }
    const querystring = urlParams.toString();
    const hmac = crypto_1.default.createHmac("sha512", secretKey);
    const signed = hmac.update(querystring).digest("hex");
    urlParams.append("vnp_SecureHash", signed);
    const paymentUrl = `${vnpUrl}?${urlParams.toString()}`;
    res.json({ success: true, paymentUrl });
});
exports.generatePaymentUrl = generatePaymentUrl;
function sortParams(obj) {
    return Object.entries(obj)
        .filter(([, value]) => value !== "" && value !== undefined && value !== null)
        .sort(([key1], [key2]) => key1.localeCompare(key2))
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
}
const handlePaymentResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vnp_ResponseCode = req.query.vnp_ResponseCode;
        const vnp_TxnRef = req.query.vnp_TxnRef; // chính là orderId
        console.log("vnp_ResponseCode:", vnp_ResponseCode);
        console.log("vnp_TxnRef:", vnp_TxnRef);
        if (vnp_ResponseCode !== "00") {
            console.log("❌ Thanh toán thất bại:", vnp_ResponseCode);
            return res.redirect("http://localhost:3000/profile");
        }
        try {
            console.log("✅ Thanh toán thành công:", vnp_TxnRef);
            yield order_services_1.default.checkOutSuccess(vnp_TxnRef);
            return res.redirect("http://localhost:3000/"); // về home
        }
        catch (err) {
            console.error("❌ Lỗi xử lý đơn hàng:", err);
            return res.redirect("http://localhost:3000/medicine");
        }
    }
    catch (error) {
        console.error("Lỗi xử lý thanh toán:", error);
        res.redirect("http://localhost:8888/checkout-error");
    }
});
exports.handlePaymentResponse = handlePaymentResponse;
