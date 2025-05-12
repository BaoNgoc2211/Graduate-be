import cartDetailRepository from "../../repository/cart-detail.repository";
import { ICartDetail } from "../../interface/order/cart-item.interface";

class CartDetailService {
  async createCartDetail(data: Partial<ICartDetail>) {
    return await cartDetailRepository.create(data);
  }

  async getCartDetailById(id: string) {
    return await cartDetailRepository.findById(id);
  }

  async getCartDetailsByUserId(userId: string) {
    return await cartDetailRepository.findByUserId(userId);
  }

  async updateCartDetail(id: string, data: Partial<ICartDetail>) {
    return await cartDetailRepository.update(id, data);
  }

  async deleteCartDetail(id: string) {
    return await cartDetailRepository.delete(id);
  }

  async getAllCartDetails() {
    return await cartDetailRepository.getAll();
  }
}

export default new CartDetailService();
