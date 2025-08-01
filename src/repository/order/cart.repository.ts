import { ICart } from "../../interface/order/cart.interface";
import Cart from "../../model/order/cart.model";

class CartRepository {
  async getCartFromDB(userId: string) {
    return await Cart.findOne({ user_id: userId }).populate(
      "medicine_item.medicine_id"
    );
  }
  async saveCartToDB(userId: string, cart: ICart) {
    return await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: cart.medicine_item } },
      { upsert: true, new: true }
    );
  }
  async create(cart: ICart) {
    return await Cart.create(cart);
  }
  async update(id: string, cart: ICart) {
    return await Cart.findByIdAndUpdate(id, cart, { new: true });
  }
  async delete(userId: string) {
    await Cart.deleteOne({ user_id: userId });
  }
  async getAll(userId: string) {
    return await Cart.find({ user_id: userId })
    .populate({ 
      path :"medicine_item.medicine_id",
      select: "code name thumbnail",
      populate:{ 
        path: "stock_id",
        select: "sellingPrice"
        }
    });
  }
}
export default new CartRepository();
