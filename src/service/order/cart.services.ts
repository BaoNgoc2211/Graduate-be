import { ICart, ICartItem } from "../../interface/order/cart.interface";
import Medicine from "../../model/medicine/medicine.model";
import Cart from "../../model/order/cart.model";
// import Stock from "../../model/inventory/stock.model";
import cartRepository from "../../repository/order/cart.repository";
// import throwError from "../../util/create-error";

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

  async addToCart(
    userId: string,
    items: { medicine_id: string; quantity: number }[]
  ) {
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = await Cart.create({
        user_id: userId,
        medicine_item: [],
        totalPrice: 0,
      });
    }

    for (const { medicine_id, quantity } of items) {
      const medicine = await Medicine.findById(medicine_id).populate(
        "stock_id"
      );
      if (!medicine) {
        console.warn(`Không tìm thấy thuốc với ID: ${medicine_id}`);
        continue; // Bỏ qua nếu không tìm thấy thuốc
      }

      if (!medicine.stock_id || typeof medicine.stock_id !== "object") {
        console.warn(`Thuốc ${medicine.name} chưa có thông tin kho hàng`);
        continue;
      }

      const stock = medicine.stock_id as any;
      const price = Number(stock.sellingPrice);
      if (!price || isNaN(price)) {
        console.warn(`Thuốc ${medicine.name} không có giá bán hợp lệ`);
        continue;
      }

      const existingItem = cart.medicine_item.find((i) =>
        i.medicine_id.equals(medicine._id)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.medicine_item.push({
          medicine_id: medicine._id,
          name: medicine.name,
          thumbnail: medicine.thumbnail || "",
          price,
          quantity,
        });
      }
    }

    // Cập nhật tổng tiền
    cart.totalPrice = cart.medicine_item.reduce((sum, i) => {
      const itemPrice = Number(i.price);
      const itemQuantity = Number(i.quantity);
      return sum + itemPrice * itemQuantity;
    }, 0);

    const updatedCart = await cart.save();

    return {
      cart: updatedCart,
    };
  }
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
