import Order from "../../model/order/order.model";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";
import User from "../../model/auth/user.model";
import throwError from "../../util/create-error";
import Stock from "../../model/inventory/stock.model";
import Cart from "../../model/order/cart.model";
import { IOrderDetail } from "../../interface/order/order-detail.interface";

class OrderDetailRepository {
  async findAll() {
    return await Order.find()
      .populate({
        path: "user_Id",
        model: "User",
        select: "info.name", // <-- Thêm email vào đây
      })
      .populate({
        path: "orderDetail",
        populate: [
          {
            path: "medicine.code",
            model: "Medicine",
            select: "code name thumbnail",
          },
          {
            path: "medicine.price",
            model: "ImportBatch",
            select: "sellingPrice medicine_id",
          },
        ],
      });
  }

  async findById(id: string) {
    const order = await Order.findById(id)
      .populate({
        path: "user_Id",
        model: "User",
        select: "name ",
      })
      .populate({
        path: "orderDetail",
        populate: [
          {
            path: "medicine.code",
            model: "Medicine",
            select: "code name thumbnail",
          },
          {
            path: "medicine.price",
            model: "ImportBatch",
            select: "sellingPrice medicine_id",
          },
        ],
      });
    return order;
  }


  // async checkOut(userId: string, data: IOrder) {
  //   // 1. Kiểm tra user tồn tại
  //   const user_id = await User.findById(userId);async checkout(userId: string) {
        // Step 1: Find the user's cart with populated medicine items
  async checkOut(userId: string) {
    const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
    if (!cart || cart.medicine_item.length === 0) {
        throw new Error("Giỏ hàng trống hoặc không tìm thấy");
    }
    // Step 2: Prepare order details array
    const orderDetails: IOrderDetail[] = [];
    // Calculate totalAmount for order
    let totalAmount = 0;
    for (const item of cart.medicine_item) {
        // Using the item.price saved in the cart at the time medicine was added,
        // so prices are locked as per user's cart experience.
        const itemPrice = item.price;
        const itemQuantity = item.quantity;
        const totalAmountForItem = itemPrice * itemQuantity;
        totalAmount += totalAmountForItem;
        // Stock ID - get from populated medicine if available
        const medicineData = item.medicine_id as any; // populated medicine document
        const stockId = medicineData.stock_id;
        const orderDetail = new OrderDetail({
            medicine_id: item.medicine_id._id,
            stock_id: stockId,
            thumbnail: item.thumbnail,
            name: item.name,
            price: itemPrice, // locked price
            quantity: itemQuantity,
            totalAmount: totalAmountForItem,
            note: "", // optionally add if needed
        });
        await orderDetail.save();
        orderDetails.push(orderDetail);
    }
    // Step 3: Create order referencing orderDetails
    const order = new Order({
        user_id: userId,
        status: "đang chờ xác nhận", // or your default status enum
        totalAmount,
        finalAmount: totalAmount, // could be modified for discounts, shipping etc
        orderDetail: orderDetails.map((detail) => detail._id), // store orderDetail IDs
    });
    await order.save();
    // Step 4: Clear user's cart after successful order
    await Cart.deleteOne({ user_id: userId });
    return {
        message: "Đặt hàng thành công",
        order,
    };
  }
      
  //   if (!user_id) {
  //     throwError(404, "Not found User");
  //   }
  //   // 2. Kiểm tra tồn kho cho từng sản phẩm trong orderDetail
  //   // const medicineIds = data.orderDetail.map((item) => item.medicine_id);
  //   // const medicines = await Stock.find({ medicine_id: { $in: medicineIds } });
  //   // console.log(medicines);
  //   for (const item of data.orderDetail) {
  //     const stock = await Stock.findById(item.stock_id);
  //     if (!stock) {
  //       throw new Error(`Không tìm thấy stock với ID: ${item.stock_id}`);
  //     }

  //     if (stock.quantity == null) {
  //       throw new Error(`Tồn kho không hợp lệ cho stock ID: ${item.stock_id}`);
  //     }

  //     if (item.quantity > stock.quantity) {
  //       throw new Error(
  //         `Số lượng đặt (${item.quantity}) vượt quá tồn kho (${stock.quantity}) cho thuốc có ID: ${stock.medicine}`
  //       );
  //     }
  //     if (item.quantity < stock.quantity) {
  //       throwError(404, "Hết sản phẩm");
  //     }

  //     // ❗ Nếu muốn trừ kho khi đặt hàng thành công, bật đoạn sau:
  //     // stock.quantity -= item.quantity;
  //     // await stock.save();
  //   }
  //   // 3. Tạo đơn hàng
  //   const order = await Order.create({
  //     ...data,
  //     user_id: userId,
  //   });
  //   return order;
  //   // 3. Trừ số lượng tồn kho 

  // }

  async updateOrder(id: string, data: Partial<IOrder>) {
    const order = await Order.findByIdAndUpdate(id, data, { new: true });
    return order;
  }
  async deleteOrder(id: string) {
    const order = await Order.findByIdAndDelete(id);
    return order;
  }
}
export default new OrderDetailRepository();
