import { ICart, ICartItem } from "../../interface/order/cart.interface";
import Medicine from "../../model/medicine/medicine.model";
import Cart from "../../model/order/cart.model";
import Stock from "../../model/inventory/stock.model";
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
  
 async addToCart(userId: string, medicineId: string, quantity: number) {
    console.log(`Looking for medicine with ID: ${medicineId}`);
    const medicine = await Medicine.findById(medicineId).populate("stock_id");

    if (!medicine) {
        console.error(`Medicine not found for ID: ${medicineId}`);
        throw new Error("Không tìm thấy thuốc");
    }

    if (!medicine.stock_id || typeof medicine.stock_id !== "object") {
        throw new Error("Thuốc chưa có thông tin kho hàng (stock)");
    }

    const stock = medicine.stock_id as any;
    const price = Number(stock.sellingPrice);

    if (!price || isNaN(price)) {
        throw new Error("Không có giá bán cho thuốc này");
    }

    console.log(`Price: ${price}, Quantity: ${quantity}`);

    const item: ICartItem = {
        medicine_id: medicine._id,
        name: medicine.name,
        thumbnail: medicine.thumbnail || "",
        price,
        quantity,
    };

    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
        const totalPrice = price * quantity;
        console.log(`Total Price: ${totalPrice}`);
        cart = await Cart.create({
            user_id: userId,
            medicine_item: [item],
            totalPrice: totalPrice,
        });

        return {
            cart,
            addedItem: item,
        };
    }

    const existingItem = cart.medicine_item.find((i) =>
        i.medicine_id.equals(medicine._id)
    );

    if (existingItem) {
        existingItem.quantity = Number(existingItem.quantity) + quantity;
    } else {
        cart.medicine_item.push(item);
    }

    // Calculate total price
    cart.totalPrice = cart.medicine_item.reduce((sum, i) => {
        const itemPrice = Number(i.price);
        const itemQuantity = Number(i.quantity);
        if (isNaN(itemPrice) || isNaN(itemQuantity)) {
            console.warn("Invalid price or quantity on cart item:", i);
            return sum; // Skip invalid items
        }
        return sum + itemPrice * itemQuantity;
    }, 0);


    const updatedCart = await cart.save();

    return {
        cart: updatedCart,
        addedItem: item,
    };
}

    async updateCartItem(userId: string, medicineId: string, quantity: number) {
        const cart = await Cart.findOne({ user_id: userId });
        if (!cart) {
        throw new Error("Không tìm thấy giỏ hàng");
        }
        const item = cart.medicine_item.find((i) => i.medicine_id.equals(medicineId));
        if (!item) {
        throw new Error("Thuốc không có trong giỏ hàng");
        }
        if (quantity === 0) {
        cart.medicine_item = cart.medicine_item.filter((i) => !i.medicine_id.equals(medicineId));
        } else {
        item.quantity = quantity;
        }
        // Tính lại tổng tiền
        cart.totalPrice = cart.medicine_item.reduce((sum, i) => {
        const itemPrice = Number(i.price);
        const itemQuantity = Number(i.quantity);
        if (isNaN(itemPrice) || isNaN(itemQuantity)) {
            return sum;
        }
        return sum + itemPrice * itemQuantity;
        }, 0);
        await cart.save();
        return cart;
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
