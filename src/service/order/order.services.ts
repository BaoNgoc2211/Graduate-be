import orderRepository from "../../repository/order/order.repository";

class OrderService {
  async createOrder(data: any) {
    // Có thể thêm validate hoặc business logic ở đây
    return await orderRepository.createOrder(data);
  }

  async getOrderById(id: string) {
    return await orderRepository.findById(id);
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