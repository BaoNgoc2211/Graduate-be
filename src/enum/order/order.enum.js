"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.PaymentMethod = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["DELIVERING"] = "DELIVERING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
exports.PaymentMethod = {
    COD: "COD",
    VNPAY: "VNPAY",
    MOMO: "MOMO",
};
exports.PaymentStatus = {
    UNPAID: "UNPAID",
    PAID: "PAID",
};
