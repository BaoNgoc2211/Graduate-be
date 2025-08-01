import mongoose from "mongoose";
import {  ICartItem } from "../../interface/order/cart.interface";
import User from "../../model/auth/user.model";
import Medicine from "../../model/medicine/medicine.model";
import Cart from "../../model/order/cart.model";
import cartRepository from "../../repository/order/cart.repository";
import throwError from "../../util/create-error";

class CartServices {
  private async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throwError(404, "Email không tồn tại");
    }
    return user;
  }
  private async getUserById(id: string) {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throwError(404, "User không tồn tại");
    }
    return user;
  }

  async getAll(userId: string) {
    return await cartRepository.getAll(userId);
  }

  addToCart = async (
    user_id: string,
    medicine_id: string,
    quantity: number
  ) => {
    const checkUser = await this.getUserById(user_id);

    // Kiểm tra xem thuốc có tồn tại không
    const checkMedicine = await Medicine.findById(medicine_id).populate(
      "stock_id"
    );
    if (!checkMedicine) {
      throwError(404, "Thuốc không tồn tại");
    }
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = await Cart.create({
        user_id,
        medicine_item: [
          {
            medicine_id: new mongoose.Types.ObjectId(medicine_id),
            quantity,
          },
        ],
        quantity,
      });
    } else {
      // 3. Nếu đã có giỏ hàng thì kiểm tra xem thuốc đã có trong giỏ hàng chưa
      const existingItem = cart.medicine_item.find(
        (item: ICartItem) => item.medicine_id.toString() === medicine_id
      );
      if (existingItem) {
        // 4. Nếu có rồi thì cập nhật số lượng
        existingItem.quantity += quantity;
      } else {
        // 5. Nếu chưa có thì thêm mới vào giỏ hàng
        cart.medicine_item.push({
          medicine_id: new mongoose.Types.ObjectId(medicine_id),
          quantity,
        });
      }
      // 6. Cập nhật tổng số lượng trong giỏ hàng
      cart.quantity = cart.medicine_item.reduce(
        (sum: number, item: ICartItem) => sum + item.quantity,
        0
      );
      // 7. Lưu giỏ hàng
      await cart.save();
    }
    return { user_id: checkUser?.id, medicine_id, quantity };
  };

  async update(userId: string, medicine_id: string, quantity: number) {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) throwError(404, "Giỏ hàng không tồn tại");

    const item = cart?.medicine_item.find(
      (item: ICartItem) => item.medicine_id.toString() === medicine_id
    );
    if (!item) throwError(404, "Thuốc không tồn tại trong giỏ");
    
    item!.quantity = quantity;

    cart!.quantity = cart!.medicine_item.reduce(
    (sum: number, item: ICartItem) => sum + item.quantity,
    0
  );

    await cart!.save();
    return cart;
  }

  async removeItem(userId: string, medicine_id: string) {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart || !cart.medicine_item) {
      throwError(404, "Giỏ hàng không tồn tại hoặc không có sản phẩm");
    }
    cart!.medicine_item = cart!.medicine_item.filter(
      (item: ICartItem) => item.medicine_id.toString() !== medicine_id
    );

    cart!.quantity = cart!.medicine_item.reduce(
    (sum: number, item: ICartItem) => sum + item.quantity,
    0);
    await cart!.save();
    return cart;
  }

  async clearCart(userId: string) {
    await Cart.deleteOne({ user_id: userId });
  }
  
}
const cartService = new CartServices();
export default cartService;
