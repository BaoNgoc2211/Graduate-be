import Order from "../../model/order/order.model";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";
import User from "../../model/auth/user.model";
import throwError from "../../util/create-error";
import Stock from "../../model/order/stock.model";

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

  async createOrder(userId: string, data: IOrder) {
    // 1. Kiểm tra user tồn tại
    const user_id = await User.findById(userId);
    if (!user_id) {
      throwError(404, "Not found User");
    }
    // 2. Kiểm tra tồn kho cho từng sản phẩm trong orderDetail
    // const medicineIds = data.orderDetail.map((item) => item.medicine_id);
    // const medicines = await Stock.find({ medicine_id: { $in: medicineIds } });
    // console.log(medicines);
    for (const item of data.orderDetail) {
      const stock = await Stock.findById(item.stock_id);
      if (!stock) {
        throw new Error(`Không tìm thấy stock với ID: ${item.stock_id}`);
      }

      if (stock.quantity == null) {
        throw new Error(`Tồn kho không hợp lệ cho stock ID: ${item.stock_id}`);
      }

      if (item.quantity > stock.quantity) {
        throw new Error(
          `Số lượng đặt (${item.quantity}) vượt quá tồn kho (${stock.quantity}) cho thuốc có ID: ${stock.medicine}`
        );
      }
      if (item.quantity < stock.quantity) {
        throwError(404, "Hết sản phẩm");
      }

      // ❗ Nếu muốn trừ kho khi đặt hàng thành công, bật đoạn sau:
      // stock.quantity -= item.quantity;
      // await stock.save();
    }
    // 3. Tạo đơn hàng
    const order = await Order.create({
      ...data,
      user_id: userId,
    });
    return order;
    // 3. Trừ số lượng tồn kho 

  }

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
