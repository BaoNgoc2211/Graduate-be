import { OrderStatus } from "../../enum/order-status.enum";
import { IOrder } from "../../interface/order/order.interface";
import orderRepository from "../../repository/order/order.repository";

class OrderService {
  // async createOrder(userId: string, data: IOrder) {
  //   // Có thể thêm validate hoặc business logic ở đây
  //   return await orderRepository.createOrder(userId,data);
  // }

  async getOrderById(id: string) {
    return await orderRepository.findById(id);
  }
  async checkOut(userId: string) {
    const order = await orderRepository.checkOut(userId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    return order;
  }


  async updateStatusOrder(id: string, newStatus: OrderStatus) {
    const order = await orderRepository.findById(id);
    if (!order) throw new Error("Order not found");

    const currentStatus = order.status;

    if (newStatus === OrderStatus.CANCELLED) {
      if (
        currentStatus === OrderStatus.DELIVERING ||
        currentStatus === OrderStatus.COMPLETED
      ) {
        throw new Error(
          "Không thể huỷ đơn hàng khi đang giao hoặc đã hoàn thành"
        );
      }
    }
    return await orderRepository.updateOrder(id, { status: newStatus });
  }
  async updateOrder(id: string, data: any) {
    return await orderRepository.updateOrder(id, data);
  }

  async deleteOrder(id: string) {
    return await orderRepository.deleteOrder(id);
  }

  async getAllOrders() {
    return await orderRepository.findAll();
  }
}

export default new OrderService();
