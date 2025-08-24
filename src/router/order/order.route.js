"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/cartDetail.route.ts
const express_1 = require("express");
const order_detail_controller_1 = __importDefault(require("../../controller/order/order-detail.controller"));
const order_controller_1 = __importDefault(require("../../controller/order/order.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const vnpay_services_1 = require("../../service/vnpay.services");
const router = (0, express_1.Router)();
//status order
//lấy tất cả đơn hàng theo trang thai của user
router.get("/status/", auth_middleware_1.protect, order_controller_1.default.checkStatusAll);
//lấy đơn hàng theo trạng thái của user
router.get("/status/:status/", auth_middleware_1.protect, order_controller_1.default.checkStatusUser);
//chỉnh sửa trạng thái
// router.put("/update/",orderController.updateStatus);
router.post("/review/", auth_middleware_1.protect, order_controller_1.default.reviewOrder);
//thanh toán đơn hàng
router.post("/review/checkout/", auth_middleware_1.protect, order_controller_1.default.checkOut);
//thanh toán đơn hàng htnafh cong
router.get("/checkout/success", vnpay_services_1.handlePaymentResponse);
//orderdetail
//này k cần thiết vì khi đặt hàng thành công sẽ tạo ra chi tiết đơn hàng rồi
// router.post("/orderdetail/", orderDetailController.create);
//lấy tất cả chi tiết đơn hàng
router.get("/orderdetail/", order_detail_controller_1.default.getAll);
//xem chi tiết đơn hàng
router.get("/orderdetail/:id", order_detail_controller_1.default.getById);
// router.get("/user/:userId", orderDetailController.getByUserId);
router.put("/orderdetail/:id", order_detail_controller_1.default.update);
router.delete("orderdetail/:id", order_detail_controller_1.default.delete);
//order
// router.post("/", orderController.create);
//lấy tất cả đơn hàng của admin
router.get("/admin", order_controller_1.default.getAllOrder);
//lấy tất cả đơn hàng theo trạng thái admin
router.get("/admin/status/:status/", order_controller_1.default.checkOrderStatus);
//lấy đơn hàng theo id này chỉ là đơn hàng thôi trg đơn hàng có chi tiết đơn hàng
router.get("/admin/:id", order_controller_1.default.getById);
//chỉnh sửa trạng thái admin
router.put("/admin/updatestatus/:id", order_controller_1.default.updateStatus);
//xem lại sản phẩm đã chọn thanh toán
router.delete("/:id", order_controller_1.default.delete);
// Thêm endpoint callback xử lý khi thanh toán VNPAY thành công
exports.default = router;
