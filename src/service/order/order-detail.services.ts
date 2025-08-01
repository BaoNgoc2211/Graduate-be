
import { IOrderDetail } from "../../interface/order/order-detail.interface";
import orderDetailRepository from "../../repository/order/order-detail.repository";

class OrderDetailService {
  async getAllOrderDetails() {
    return await orderDetailRepository.findAll();
  }

  async getOrderDetailById(id: string) {
    return await orderDetailRepository.findById(id);
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

  async updateOrderDetail(id: string, data: Partial<IOrderDetail>) {
    return await orderDetailRepository.updateOrderDetail(id, data);
  }

  async deleteOrderDetail(id: string) {
    return await orderDetailRepository.deleteOrderDetail(id);
  }

  // async getCartDetailsByUserId(userId: string) {
  //   return await cartDetailRepository.findByUserId(userId);
  // }
}

export default new OrderDetailService();
