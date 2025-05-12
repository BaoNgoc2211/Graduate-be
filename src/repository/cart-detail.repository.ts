import CartDetail from "../model/order/cart-detail.model";
import { ICartDetail } from "../interface/order/cart-item.interface";
import { Types } from "mongoose";

class CartDetailRepository {
  async create(cartDetailData: Partial<ICartDetail>) {
    return await CartDetail.create(cartDetailData);
  }

  async findById(id: string) {
    return await CartDetail.findById(id)
      .populate("user_id")
      .populate("cart_id")
      .populate("medicine_items.medicine_id");
  }

  async findByUserId(userId: string) {
    return await CartDetail.find({ user_id: userId }).populate("medicine_items.medicine_id");
  }

  async update(id: string, updateData: Partial<ICartDetail>) {
    return await CartDetail.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return await CartDetail.findByIdAndDelete(id);
  }

  async getAll() {
    return await CartDetail.find().populate("user_id").populate("medicine_items.medicine_id");
  }
}

export default new CartDetailRepository();
