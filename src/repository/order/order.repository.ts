import Order from "../../model/order/order.model";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";
import User from "../../model/auth/user.model";
import throwError from "../../util/create-error";
import Stock from "../../model/inventory/stock.model";
import Cart from "../../model/order/cart.model";
import { IOrderDetail } from "../../interface/order/order-detail.interface";
import { Status } from "cloudinary";
import { StatusEnum } from "../../enum/medicine/import-batch.enum";
import { OrderStatus } from "../../enum/order-status.enum";

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

  //#region Quy
  // async checkOut(userId: string) {
  //   const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
  //   if (!cart || cart.medicine_item.length === 0) {
  //       throw new Error("Giỏ hàng trống hoặc không tìm thấy");
  //   }
  //   // Step 2: Prepare order details array
  //   const orderDetails: IOrderDetail[] = [];
  //   // Calculate totalAmount for order
  //   let totalAmount = 0;
  //   for (const item of cart.medicine_item) {
  //       const medicineData = item.medicine_id as any; // populated medicine document
  //       const stockId = medicineData.stock_id;
  //       const stock = await Stock.findById(stockId);
  //       if (!stock) {
  //           throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicineData.name}`);
  //       }

  //       // Kiểm tra số lượng
  //       if (stock.quantity < item.quantity) {
  //           throw new Error(`Sản phẩm ${medicineData.name} chỉ còn ${stock.quantity} trong kho`);
  //       }
  //       stock.quantity -= item.quantity; // Trừ số lượng tồn kho
  //       await stock.save(); // Lưu thay đổi tồn kho

  //       const itemPrice = item.price;
  //       const itemQuantity = item.quantity;
  //       const totalAmountForItem = itemPrice * itemQuantity;
  //       totalAmount += totalAmountForItem;
  //       // Stock ID - get from populated medicine if available
  //       // const medicineData = item.medicine_id as any; // populated medicine document

  //       const orderDetail = new OrderDetail({
  //           medicine_id: item.medicine_id._id,
  //           stock_id: stockId,
  //           thumbnail: item.thumbnail,
  //           name: item.name,
  //           price: itemPrice, // locked price
  //           quantity: itemQuantity,
  //           totalAmount: totalAmountForItem,
  //           note: "", // optionally add if needed
  //       });
  //       await orderDetail.save();
  //       orderDetails.push(orderDetail);
  //   }
  //   // Step 3: Create order referencing orderDetails
  //   const order = new Order({
  //       user_id: userId,
  //       status: "đang chờ xác nhận", // or your default status enum
  //       totalAmount,
  //       finalAmount: totalAmount, // could be modified for discounts, shipping etc
  //       orderDetail: orderDetails.map((detail) => detail._id), // store orderDetail IDs
  //   });
  //   await order.save();
  //   // Step 4: Clear user's cart after successful order
  //   await Cart.deleteOne({ user_id: userId });
  //   return {
  //       message: "Đặt hàng thành công",
  //       order,
  //   };
  // }
  //#endregion
  async checkStatus(userId: string) {
    const orders = await Order.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "orderDetail",
        populate: {
          path: "medicine_id",
          model: "Medicine", // thay bằng tên model thật nếu khác
        },
      });

    if (!orders || orders.length === 0) {
      throw new Error("Người dùng chưa có đơn hàng nào.");
    }

    return orders.map((order) => ({
      orderId: order._id,
      status: order.status,
      totalAmount: order.totalAmount,
      finalAmount: order.finalAmount,
      items: order.orderDetail.map((detail: any) => ({
        medicineId: detail.medicine_id.id,
        medicineName: detail.name,
        quantity: detail.quantity,
        price: detail.price,
        total: detail.totalAmount,
        thumbnail: detail.thumbnail,
        // medicineInfo: detail.medicine_id // nếu muốn hiển thị thêm thông tin thuốc
      })),
    }));
  }
  async checkStatusOrder(userId: string, status: OrderStatus) {
    const orders = await Order.find({ user_id: userId, status })
      .sort({ createdAt: -1 })
      .populate("orderDetail");
    return orders.map((order) => ({
      orderId: order._id,
      status: order.status,
      totalAmount: order.totalAmount,
      finalAmount: order.finalAmount,
      items: order.orderDetail.map((detail: any) => ({
        medicicneId: detail.medicine_id,
        medicineName: detail.name,
        quantity: detail.quantity,
        price: detail.price,
        total: detail.totalAmount,
        thumbnail: detail.thumbnail,
        // medicineInfo: detail.medicine_id // nếu muốn hiển thị thêm thông tin thuốc
      })),
    }));
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
