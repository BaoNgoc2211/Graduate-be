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
const order_status_enum_1 = require("../../enum/order-status.enum");
const user_model_1 = __importDefault(require("../../model/auth/user.model"));
const order_model_1 = __importDefault(require("../../model/order/order.model"));
const order_repository_1 = __importDefault(require("../../repository/order/order.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class OrderService {
    // async createOrder(userId: string, data: IOrder) {
    //   // Có thể thêm validate hoặc business logic ở đây
    //   return await orderRepository.createOrder(userId,data);
    // }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ _id: id });
            if (!user) {
                (0, create_error_1.default)(404, "User không tồn tại");
            }
            return user;
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.findById(id);
        });
    }
    //#region checkout: Quy
    checkOutVNPAY(userId, selectItemIds, shippingId, paymentMethod, voucherCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_repository_1.default.checkOutVNPAY(userId, selectItemIds, shippingId, paymentMethod, voucherCode);
            if (!order)
                throw new Error("Không tìm thấy đơn hàng");
            return order;
        });
    }
    checkOutCOD(userId, selectItemIds, shippingId, paymentMethod, voucherCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_repository_1.default.checkOutCOD(userId, selectItemIds, shippingId, paymentMethod, voucherCode);
            if (!order)
                throw new Error("Không tìm thấy đơn hàng");
            return order;
        });
    }
    checkOutSuccess(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_repository_1.default.checkOutSuccess(orderId);
            if (!order)
                throw new Error("Không tìm thấy đơn hàng");
            return order;
        });
    }
    //#endregion
    reviewOrder(userId, selectItemIds, shippingId, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield order_repository_1.default.reviewOrder(userId, selectItemIds, shippingId, paymentMethod);
            if (!review)
                throw new Error("Không tìm thấy đơn hàng");
            return review;
        });
    }
    updateStatusOrder(orderId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_model_1.default.findById(orderId);
            if (!order)
                throw new Error("Order not found");
            const currentStatus = order.status;
            if (newStatus === order_status_enum_1.OrderStatus.CANCELLED) {
                if (currentStatus === order_status_enum_1.OrderStatus.DELIVERING ||
                    currentStatus === order_status_enum_1.OrderStatus.COMPLETED) {
                    throw new Error("Không thể huỷ đơn hàng khi đang giao hoặc đã hoàn thành");
                }
            }
            return yield order_repository_1.default.updateOrder(orderId, newStatus);
        });
    }
    checkStatusOrderUser(userId, statusParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusMap = {
                pending: order_status_enum_1.OrderStatus.PENDING,
                confirmed: order_status_enum_1.OrderStatus.CONFIRMED,
                delivering: order_status_enum_1.OrderStatus.DELIVERING,
                completed: order_status_enum_1.OrderStatus.COMPLETED,
                cancelled: order_status_enum_1.OrderStatus.CANCELLED,
            };
            const status = statusMap[statusParam.toLowerCase()];
            if (!status) {
                throw new Error("Trạng thái đơn hàng không hợp lệ.");
            }
            return yield order_repository_1.default.checkStatusOrderUser(userId, status);
        });
    }
    checkStatusAllOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_repository_1.default.checkStatus(userId);
            if (!orders || orders.length === 0) {
                throw new Error("Không tìm thấy đơn hàng với trạng thái này");
            }
            return orders;
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.deleteOrder(id);
        });
    }
    getAllOrders(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_repository_1.default.findAll(page, limit);
        });
    }
    // admin 
    //lấy tất cả đơn hàng
    checkStatusOrder(statusParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusMap = {
                pending: order_status_enum_1.OrderStatus.PENDING,
                confirmed: order_status_enum_1.OrderStatus.CONFIRMED,
                delivering: order_status_enum_1.OrderStatus.DELIVERING,
                completed: order_status_enum_1.OrderStatus.COMPLETED,
                cancelled: order_status_enum_1.OrderStatus.CANCELLED,
            };
            const status = statusMap[statusParam.toLowerCase()];
            if (!status) {
                throw new Error("Trạng thái đơn hàng không hợp lệ.");
            }
            return yield order_repository_1.default.checkStatusOrder(status);
        });
    }
}
exports.default = new OrderService();
