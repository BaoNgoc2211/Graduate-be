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
const order_detail_repository_1 = __importDefault(require("../../repository/order/order-detail.repository"));
class OrderDetailService {
    getAllOrderDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_detail_repository_1.default.findAll();
        });
    }
    getOrderDetailById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_detail_repository_1.default.findById(id);
        });
    }
    // async createOrderDetail(data: IOrderDetail) {
    //   let totalAmount = 0;
    //   for (const item of data.order_items) {
    //     const stock = await Stock.findById(item.stock_id);
    //     if (!stock || typeof stock.sellingPrice !== "number") {
    //       throw new Error(
    //         `Stock not found or importPrice invalid for id: ${item.price}`
    //       );
    //     }
    //     totalAmount += item.quantity * stock.sellingPrice;
    //   }
    //   data.totalOrder = totalAmount;
    //   if (!data.order_items) {
    //     if (!data.) {
    //       throw new Error("Missing user_id"); // Không có user => không tạo được đơn
    //     }
    //     const newOrder = await Order.create({
    //       user_id: user_id,
    //       status: "đang chờ xác nhận",
    //     });
    //     data.orderId = newOrder._id;
    //   }
    //   return await orderDetailRepository.createOrderDetail(data);
    // }
    updateOrderDetail(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_detail_repository_1.default.updateOrderDetail(id, data);
        });
    }
    deleteOrderDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_detail_repository_1.default.deleteOrderDetail(id);
        });
    }
}
exports.default = new OrderDetailService();
