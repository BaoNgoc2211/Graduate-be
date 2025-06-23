import mongoose from "mongoose";
import { ICart, ICartItem } from "../../interface/order/cart.interface";
import User from "../../model/auth/user.model";
import Medicine from "../../model/medicine/medicine.model";
import Cart from "../../model/order/cart.model";
// import Stock from "../../model/inventory/stock.model";
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

  //#region  Quy
  // async addToCart(
  //   userId: string,
  //   items: { medicine_id: string; quantity: number }[]
  // ) {
  //   let cart = await Cart.findOne({ user_id: userId });
  //   if (!cart) {
  //     cart = await Cart.create({
  //       user_id: userId,
  //       medicine_item: [],
  //       totalPrice: 0,
  //     });
  //   }

  //   for (const { medicine_id, quantity } of items) {
  //     const medicine = await Medicine.findById(medicine_id).populate(
  //       "stock_id"
  //     );
  //     if (!medicine) {
  //       console.warn(`Không tìm thấy thuốc với ID: ${medicine_id}`);
  //       continue; // Bỏ qua nếu không tìm thấy thuốc
  //     }

  //     if (!medicine.stock_id || typeof medicine.stock_id !== "object") {
  //       console.warn(`Thuốc ${medicine.name} chưa có thông tin kho hàng`);
  //       continue;
  //     }

  //     const stock = medicine.stock_id as any;
  //     const price = Number(stock.sellingPrice);
  //     if (!price || isNaN(price)) {
  //       console.warn(`Thuốc ${medicine.name} không có giá bán hợp lệ`);
  //       continue;
  //     }

  //     const existingItem = cart.medicine_item.find((i) =>
  //       i.medicine_id.equals(medicine._id)
  //     );

  //     if (existingItem) {
  //       existingItem.quantity += quantity;
  //     } else {
  //       cart.medicine_item.push({
  //         medicine_id: medicine._id,
  //         name: medicine.name,
  //         thumbnail: medicine.thumbnail || "",
  //         price,
  //         quantity,
  //       });
  //     }
  //   }
  //#endregion
  addToCart = async (user_id: string, medicine_id: string, quantity:number) => {
    const checkUser = await this.getUserById(user_id);

    // Kiểm tra xem thuốc có tồn tại không
    const checkMedicine = await Medicine.findById(medicine_id).populate(
      "stock_id"
    );
    if (!checkMedicine) {
      throwError(404, "Thuốc không tồn tại");
    }
    // if( !checkMedicine.stock_id || typeof checkMedicine.stock_id !== "object") {
    //   throwError(404, `Thuốc ${checkMedicine.name} chưa có thông tin kho hàng`);
    // }
    // // Kiểm tra số lượng trong kho có đủ không
    // if (stock.quantity < quantity) {
    //   throwError(
    //     400,
    //     `Chỉ còn ${stock.quantity} sản phẩm ${checkMedicine.name} trong kho`
    //   );
    // }
    // 3. Tìm giỏ hàng hiện tại của user
    
   let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = await Cart.create({
        user_id,
        medicine_item: [{
          medicine_id: new mongoose.Types.ObjectId(medicine_id),
          quantity
        }],
        quantity
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
}
const cartService = new CartServices();
export default cartService;
