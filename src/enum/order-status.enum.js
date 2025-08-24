"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "\u0111ang ch\u1EDD x\u00E1c nh\u1EADn";
    OrderStatus["CONFIRMED"] = "x\u00E1c nh\u1EADn";
    OrderStatus["DELIVERING"] = "\u0111ang giao";
    OrderStatus["COMPLETED"] = "ho\u00E0n th\u00E0nh";
    OrderStatus["CANCELLED"] = "hu\u1EF7";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
