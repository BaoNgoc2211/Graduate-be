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
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const response_1 = require("../../util/response");
const order_services_1 = __importDefault(require("../../service/order/order.services"));
const vnpay_services_1 = require("../../service/vnpay.services");
const momo_services_1 = require("../../service/momo.services");
class OrderDetailController {
    constructor() {
        this.getAllOrder = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = yield order_services_1.default.getAllOrders(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All", result);
        }));
        this.getById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_services_1.default.getOrderById(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Cart By ID", result);
        }));
        this.checkOut = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const selectItemIds = req.body.selectItemIds;
            const shippingId = req.body.shippingId;
            const paymentMethod = req.body.paymentMethod;
            const voucherCode = req.body.voucherCode;
            if (!Array.isArray(selectItemIds)) {
                res.status(400).json({ message: "selectedItemIds" });
            }
            if (paymentMethod === "VNPAY") {
                // Redirect đến trang thanh toán VNPay
                const order = yield order_services_1.default.checkOutVNPAY(String(userId), selectItemIds, shippingId, paymentMethod, voucherCode);
                const paymentReq = {
                    body: {
                        orderId: order.orderId.toString()
                    }
                };
                // type FakeResponse = {
                //   json: (body: { paymentUrl: string }) => Response;
                //   status: (code: number) => {
                //     json: (data: string) => Response;
                //   };
                // };
                const fakeRes = {
                    json: ({ paymentUrl }) => res.json({ success: true, paymentUrl }),
                    status: (code) => ({
                        json: (data) => res.status(code).json(data),
                    }),
                };
                yield (0, vnpay_services_1.generatePaymentUrl)(paymentReq, fakeRes);
            }
            else if (paymentMethod === "MOMO") {
                const order = yield order_services_1.default.checkOutVNPAY(String(userId), selectItemIds, shippingId, paymentMethod, voucherCode);
                const momoResponse = yield (0, momo_services_1.createMomoPayment)({
                    amount: order.finalAmount.toString(),
                    orderInfo: `Thanh toán đơn hàng #${order.orderId}`,
                    // redirectUrl: `https://yourfrontend.com/checkoutSuccess?orderId=${order.orderId}`,  // <-- Quan trọng
                    // notifyUrl: `https://yourbackend.com/api/payment/momo/notify`
                });
                if (momoResponse === null || momoResponse === void 0 ? void 0 : momoResponse.payUrl) {
                    res.json({ success: true, paymentUrl: momoResponse.payUrl });
                }
                else {
                    res.status(500).json({ message: "Không thể tạo liên kết thanh toán MoMo." });
                }
            }
            else {
                const order = yield order_services_1.default.checkOutCOD(String(userId), selectItemIds, shippingId, paymentMethod, voucherCode);
                (0, response_1.returnRes)(res, 200, "Đặt hàng thành công", order);
            }
        }));
        this.reviewOrder = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const selectItemIds = req.body.selectItemIds;
            const shippingId = req.body.shippingId;
            const paymentMethod = req.body.paymentMethod;
            if (!Array.isArray(selectItemIds)) {
                res.status(400).json({ message: "selectedItemIds" });
            }
            const result = yield order_services_1.default.reviewOrder(String(userId), selectItemIds, shippingId, paymentMethod);
            (0, response_1.returnRes)(res, 200, "Review Order Success", result);
        }));
        this.updateStatus = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { status } = req.body;
            const result = yield order_services_1.default.updateStatusOrder(req.params.id, status);
            (0, response_1.returnRes)(res, 200, "Updated", result);
        }));
        this.checkStatusAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const result = yield order_services_1.default.checkStatusAllOrder(String(userId));
            (0, response_1.returnRes)(res, 200, "Get Status Order", result);
        }));
        this.checkStatusUser = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const status = req.params.status;
            const result = yield order_services_1.default.checkStatusOrderUser(String(userId), String(status));
            (0, response_1.returnRes)(res, 200, "Get Status Order", result);
        }));
        // update = asyncError(async (req: Request, res: Response) => {
        //   const result = await orderServices.updateStatusOrder(
        //     req.params.id,
        //     req.body.status
        //   );
        //   returnRes(res, 200, "Updated", result!);
        // });
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield order_services_1.default.deleteOrder(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted", result);
        }));
        this.checkOrderStatus = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const status = req.params.status;
            const result = yield order_services_1.default.checkStatusOrder(String(status));
            (0, response_1.returnRes)(res, 200, "Get Status Order", result);
        }));
        // getByUserId = asyncError(async (req: Request, res: Response) => {
        //   const result = await cartDetailServices.getCartDetailsByUserId(
        //     req.params.userId
        //   );
        //   returnRes(res, 200, "Get Cart By UserId", result);
        // });
    }
}
exports.default = new OrderDetailController();
