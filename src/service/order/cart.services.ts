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
  addToCart = async (user_id: string, medicine_id: string, quantity = 1) => {
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
      // 2. Nếu chưa có giỏ hàng thì tạo mới
      cart = await Cart.create({ user_id, medicine_item: [], quantity: 0 });
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
  //   // Cập nhật tổng tiền
  //   cart.totalPrice = cart.medicine_item.reduce((sum, i) => {
  //     const itemPrice = Number(i.price);
  //     const itemQuantity = Number(i.quantity);
  //     return sum + itemPrice * itemQuantity;
  //   }, 0);

  //   const updatedCart = await cart.save();

  //   return {
  //     cart: updatedCart,
  //   };
  // }
  // Thanh toán / Đặt hàng
  //   async checkout(userId: string) {
  //     const cart = await Cart.findOne({ user_id: userId });
  //     if (!cart) {
  //       throw new Error("Giỏ hàng trống hoặc không tồn tại");
  //     }
  //     if (cart.medicine_item.length === 0) {
  //       throw new Error("Giỏ hàng không có sản phẩm");
  //     }
  //     // Kiểm tra tồn kho
  //     for (const item of cart.medicine_item) {
  //       const medicine = await Medicine.findById(item.medicine_id).populate("stock_id");
  //       if (!medicine) {
  //         throw new Error(`Không tìm thấy thuốc với id ${item.medicine_id}`);
  //       }
  //             const stock = medicine.stock_id as any;
  //       if (!stock) {
  //         throw new Error(`Thuốc ${medicine.name} chưa có thông tin kho hàng`);
  //       }
  //       if (stock.quantity < item.quantity) {
  //         throw new Error(`Thuốc ${medicine.name} không đủ số lượng trong kho`);
  //       }
  //     }
  //     // Tạo đơn hàng mới
  //     const order = await Order.create({
  //       user_id: userId,
  //       items: cart.medicine_item.map((i) => ({
  //         medicine_id: i.medicine_id,
  //         name: i.name,
  //         thumbnail: i.thumbnail,
  //         price: i.price,
  //         quantity: i.quantity,
  //       })),
  //       totalPrice: cart.totalPrice,
  //       status: "pending", // trạng thái đơn hàng, ví dụ: pending, processing, completed
  //       createdAt: new Date(),
  //     });
  //     // Cập nhật lại tồn kho
  //     for (const item of cart.medicine_item) {
  //       const medicine = await Medicine.findById(item.medicine_id).populate("stock_id");
  //       const stock = medicine.stock_id as any;
  //       stock.quantity -= item.quantity;
  //       await stock.save();
  //     }
  //     // Xóa giỏ hàng sau khi đặt thành công
  //     await Cart.deleteOne({ user_id: userId });
  //     return order;
  //   }
}
const cartService = new CartServices();
export default cartService;
