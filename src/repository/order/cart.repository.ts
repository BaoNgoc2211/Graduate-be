import { ICart } from "../../interface/order/cart.interface";
import Cart from "../../model/order/cart.model";

class CartRepository {
  async create(cart: ICart) {
    return await Cart.create(cart);
  }
  async update(id: string, cart: ICart) {
    return await Cart.findByIdAndUpdate(id, cart, { new: true });
  }
  async delete(id: string) {
    return await Cart.findByIdAndDelete(id);
  }
  async getAll(userId: string) {
    return await Cart.find({ user_id: userId }).populate(
      "medicine_item.medicine_id"
    );
  }
}
export default new CartRepository();
