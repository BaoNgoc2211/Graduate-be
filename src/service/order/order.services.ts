import { OrderStatus } from "../../enum/order-status.enum";
import { IOrder } from "../../interface/order/order.interface";
import User from "../../model/auth/user.model";
import Stock from "../../model/inventory/stock.model";
import Medicine from "../../model/medicine/medicine.model";
import Cart from "../../model/order/cart.model";
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
  async checkOut(userId: string, selectItemIds: string[],shippingId: string) {
    console.log("User ID:", userId);
    const order = await orderRepository.checkOut(userId,selectItemIds,shippingId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");
    return order;
  }
  //#endregion

  async reviewOrder(userId: string,selectItemIds: string[],shippingId: string) {
    const review = await orderRepository.reviewOrder(userId,selectItemIds,shippingId);
    if (!review) throw new Error("Không tìm thấy đơn hàng");
    return review;
  }

  // async checkout(user_id: string, order: IOrder) {
  //   await this.getUserById(user_id);

  //   // S1:Tìm giỏ hàng của userId Nếu không có hoặc rỗng
  //   const cart = await Cart.findOne({ user_id: user_id }).populate(
  //     "medicine_item.medicine_id"
  //   );
  //   if (!cart || cart.medicine_item.length === 0) {
  //     throwError(400, "Giỏ hàng trống hoặc không tìm thấy");
  //   }
  //   console.log("Cart:", cart);

  //   // chuẩn bị:
  //   let totalAmount = 0;
  //   const orderDetail = [];
  //   // S2: yệt từng medicine_item trong cart -> Kiểm tra tồn kho, nếu không đủ => throw Error
  //   for (const item of cart!.medicine_item) {
  //     const medicine = item.medicine_id as any; // đã populated
  //     const stockId = medicine.stock_id;

  //     if (!stockId) {
  //       throwError(404, `Thuốc ${medicine.name} chưa có stock_id`);
  //     }

  //     const stock = await Stock.findById(stockId);
  //     if (!stock) {
  //       throwError(404, `Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
  //     }

  //     if (stock!.quantity < item.quantity) {
  //       throwError(
  //         400,
  //         `Sản phẩm ${medicine.name} chỉ còn ${stock!.quantity} trong kho`
  //       );
  //     }

  //     stock!.quantity -= item.quantity;
  //     await stock!.save();

  //     const itemTotal = medicine.sellingPrice * item.quantity;
  //     totalAmount += itemTotal;

  //     order.orderDetail.push({
  //       medicine_id: medicine._id,
  //       stock_id: stockId,
  //       thumbnail: medicine.thumbnail,
  //       name: medicine.name,
  //       price: medicine.sellingPrice,
  //       quantity: item.quantity,
  //       totalAmount: itemTotal,
  //     });
  //   }

  //   // 4. Cập nhật tổng tiền vào đơn hàng
  //   order.totalAmount = totalAmount;
  //   order.finalAmount = totalAmount;
  //   order.status = OrderStatus.PENDING;

  //   // 5. Tạo order mới
  //   const newOrder = await orderRepository.checkout(user_id, order);
  //   if (!newOrder) {
  //     throwError(500, "Không thể tạo đơn hàng");
  //   }

  //   // 6. Xóa giỏ hàng sau khi đặt hàng
  //   await Cart.findOneAndDelete({ user_id: user_id });

  //   return newOrder;
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
  }

  async checkStatusAllOrder(userId: string) {
    console.log("User ID:", userId);
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
