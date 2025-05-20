import { IOrderDetail } from "../../interface/order/order-detail.interface";
import orderDetailRepository from "../../repository/order/order-detail.repository";

class OrderDetailService {
  async getAllOrderDetails() {
    return await orderDetailRepository.findAll();
  }

  async getOrderDetailById(id: string) {
    return await orderDetailRepository.findById(id);
  }

  async createOrderDetail(data: any) {
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
