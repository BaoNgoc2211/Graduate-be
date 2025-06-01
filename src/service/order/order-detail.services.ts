import { IOrderDetail } from "../../interface/order/order-detail.interface";
import orderDetailRepository from "../../repository/order/order-detail.repository";
import Stock from "../../model/order/stock.model";
import orderRepository from "../../repository/order/order.repository";
import { OrderStatus } from "../../enum/order-status.enum";
import Order from "../../model/order/order.model";
class OrderDetailService {
  async getAllOrderDetails() {
    return await orderDetailRepository.findAll();
  }

  async getOrderDetailById(id: string) {
    return await orderDetailRepository.findById(id);
  }

  async createOrderDetail(data: any) {
    let totalAmount = 0;
    for (const item of data.medicine) {
      const stock = await Stock.findById(item.stock);
      console.log(item.quantity);
      console.log(item.stock);
      if (!stock || typeof stock.sellingPrice !== "number") {
        throw new Error(
          `Stock not found or importPrice invalid for id: ${item.price}`
        );
      }

      totalAmount += item.quantity * stock.sellingPrice;
    }

    data.totalAmount = totalAmount;

    if (!data.orderId) {
      if (!data.user_id) {
        throw new Error("Missing user_id"); // Bảo vệ nếu không truyền từ client
      }

      const newOrder = await Order.create({
        user_id: data.user_id,
        status: "đang chờ xác nhận",
      });

      data.orderId = newOrder._id;
    }
    // if (!data.orderId) {
    //   const newOrder = await Order.create({
    //     // user_Id: data.userId || "Khách hàng chưa đặt tên",
    //     status: "đang chờ xác nhận"
    //   });
    //   data.orderId = newOrder._id;
    // }
    return await orderDetailRepository.createOrderDetail(data);
  }

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
