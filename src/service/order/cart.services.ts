import { ICart, ICartItem } from "../../interface/order/cart.interface";
import Cart from "../../model/order/cart.model";
import cartRepository from "../../repository/order/cart.repository";
import throwError from "../../util/create-error";

class CartServices {
  async create(Cart: ICart) {
    return await cartRepository.create(Cart);
  }
  async delete(id: string) {
    return await cartRepository.delete(id);
  }
  async update(id: string, Cart: ICart) {
    return await cartRepository.update(id, Cart);
  }
  async getAll(userId: string) {
    return await cartRepository.getAll(userId);
  }
  
  async addToCart(userId: string, item: ICartItem) {
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
        medicine_item: [item],
        totalItems: 1,
        totalPrice: item.price * item.quantity,
      });
      return cart;
    }

    const existingItem = cart.medicine_item.find((i) =>
      i.medicine_id.equals(item.medicine_id)
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.medicine_item.push(item);
    }

    cart.totalItems = cart.medicine_item.reduce(
      (sum, i) => sum + i.quantity,
      0
    );
    cart.totalPrice = cart.medicine_item.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    return await cart.save();
  }
}
const cartService = new CartServices();
export default cartService;
