import { populate } from "dotenv";
import { ICart } from "../../interface/order/cart.interface";
import Cart from "../../model/order/cart.model";

class CartRepository {
  // async getCartFromCache(userId: string) {
  //   // const redisCart = await redis.get(`cart:${userId}`);
  //   return redisCart ? JSON.parse(redisCart) : null;
  // }
  // async setCartToCache(userId: string, cart: any) {
  //   if (cart && cart.items.length > 0) {
  //     await redis.set(`cart:${userId}`, JSON.stringify(cart), "EX", 3600);
  //   } else {
  //     await redis.del(`cart:${userId}`);
  //   }
  // }
  async getCartFromDB(userId: string) {
    return await Cart.findOne({ user_id: userId }).populate(
      "medicine_item.medicine_id"
    );
  }
  async saveCartToDB(userId: string, cart: any) {
    return await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: cart.items } },
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
  // async remove(userId: string, medicineId: string) {
  //   let cart = await this.getCartFromCache(userId);
  //   if (!cart) {
  //     cart = await this.getCartFromDB(userId);
  //   }
  //   if (!cart) return null;

  //   cart.items = cart.items.filter(
  //     (item: any) => String(item.productId) !== String(medicineId)
  //   );

  //   await this.saveCartToDB(userId, cart);
  //   // await this.setCartToCache(userId, cart);

  //   return cart;
  // }
}
export default new CartRepository();
