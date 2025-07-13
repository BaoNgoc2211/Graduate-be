import { OrderStatus } from "../../enum/order-status.enum";
import User from "../../model/auth/user.model";
import Order from "../../model/order/order.model";
import orderRepository from "../../repository/order/order.repository";
import throwError from "../../util/create-error";

class OrderService {
  // async createOrder(userId: string, data: IOrder) {
  //   // Có thể thêm validate hoặc business logic ở đây
  //   return await orderRepository.createOrder(userId,data);
  // }
  private async getUserById(id: string) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throwError(404, "User không tồn tại");
    }
    return user;
  }
  async getOrderById(id: string) {
    return await orderRepository.findById(id);
  }
  //#region checkout: Quy

  async checkOutVNPAY(userId: string, selectItemIds: string[],shippingId: string, paymentMethod: string,voucherCode:string) {
    const order = await orderRepository.checkOutVNPAY(userId,selectItemIds,shippingId, paymentMethod,voucherCode);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    return order;
  }
  async checkOutCOD(userId: string, selectItemIds: string[],shippingId: string, paymentMethod: string,voucherCode :string) {
    const order = await orderRepository.checkOutCOD(userId,selectItemIds,shippingId, paymentMethod,voucherCode);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    return order;
  }
  async checkOutSuccess(orderId: string) {
    const order = await orderRepository.checkOutSuccess(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    return order;
  }
  //#endregion

  async reviewOrder(userId: string,selectItemIds: string[],shippingId: string, paymentMethod: string) {
    const review = await orderRepository.reviewOrder(userId,selectItemIds,shippingId, paymentMethod);
    if (!review) throw new Error("Không tìm thấy đơn hàng");
    return review;
  }

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
    return await orderRepository.updateOrder(orderId, newStatus );
  }

  async checkStatusOrderUser(userId: string, statusParam: string) {
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

    return await orderRepository.checkStatusOrderUser(userId, status);
  }

  async checkStatusAllOrder(userId: string) {
    const orders = await orderRepository.checkStatus(userId);
    if (!orders || orders.length === 0) {
      throw new Error("Không tìm thấy đơn hàng với trạng thái này");
    }
    return orders;
  }

  async deleteOrder(id: string) {
    return await orderRepository.deleteOrder(id);
  }

  async getAllOrders() {
    return await orderRepository.findAll();
  }

  // admin 

  //lấy tất cả đơn hàng


  async checkStatusOrder(statusParam: string) {
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

    return await orderRepository.checkStatusOrder(status);
  }

}

export default new OrderService();
