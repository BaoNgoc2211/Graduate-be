import { OrderStatus } from "../../enum/order-status.enum";
import { IOrder } from "../../interface/order/order.interface";
import Order from "../../model/order/order.model";
import orderRepository from "../../repository/order/order.repository";

class OrderService {
  // async createOrder(userId: string, data: IOrder) {
  //   // Có thể thêm validate hoặc business logic ở đây
  //   return await orderRepository.createOrder(userId,data);
  // }

  async getOrderById(id: string) {
    return await orderRepository.findById(id);
  }
  // async checkOut(userId: string) {
  //   const order = await orderRepository.checkOut(userId);
  //   if (!order) throw new Error("Không tìm thấy đơn hàng");
  //   return order;
  // }


  async updateStatusOrder(orderId: string, newStatus: OrderStatus) {
    const order = await Order.findById(orderId);
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
    return await orderRepository.updateOrder(orderId, { status: newStatus });
  }

  async checkStatusOrder(userId: string, statusParam: string) {
    const statusMap: Record<string, OrderStatus> = {
    pending: OrderStatus.PENDING,
    confirmed: OrderStatus.CONFIRMED,
    delivering: OrderStatus.DELIVERING,
    completed: OrderStatus.COMPLETED,
    cancelled: OrderStatus.CANCELLED,
  };

    const status = statusMap[statusParam.toLowerCase()];
    if (!status) {
      throw new Error("Trạng thái đơn hàng không hợp lệ.");
    }

    return await orderRepository.checkStatusOrder(userId, status);
  };
  
  async checkStatusAllOrder(userId: string,) {
    const orders = await orderRepository.checkStatus(userId);
    if (!orders || orders.length === 0) {
      throw new Error("Không tìm thấy đơn hàng với trạng thái này");
    }
    return orders;
  
  }

  // async updateOrder(id: string, data: any) {
  //   return await orderRepository.updateOrder(id, data);
  // }

  async deleteOrder(id: string) {
    return await orderRepository.deleteOrder(id);
  }

  async getAllOrders() {
    return await orderRepository.findAll();
  }
}

export default new OrderService();
