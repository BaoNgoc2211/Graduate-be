import Order from "../../model/order/order.model";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";
import User from "../../model/auth/user.model";
import throwError from "../../util/create-error";
import Stock from "../../model/inventory/stock.model";
import Cart from "../../model/order/cart.model";
import { IOrderDetail, IOrderItem } from "../../interface/order/order-detail.interface";
import { Status } from "cloudinary";
import { StatusEnum } from "../../enum/medicine/import-batch.enum";
import { OrderStatus } from "../../enum/order-status.enum";
import Medicine from "../../model/medicine/medicine.model";
import { userInfo } from "os";

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
  async checkOut(userId: string, selectItemIds: string[]) {
    // Lấy giỏ hàng và populate thông tin thuốc
    const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");

    if (!cart || cart.medicine_item.length === 0) {
      throw new Error("Giỏ hàng trống hoặc không tìm thấy");
    }

    // Lọc ra các sản phẩm được chọn để đặt hàng
    const selectedItems = cart.medicine_item.filter((item: any) =>
      item?.medicine_id?._id && selectItemIds.includes(item.medicine_id._id.toString())
    );

    if (selectedItems.length === 0) {
      throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of selectedItems) {
      const medicine = item.medicine_id as any;
      const stockId = medicine.stock_id;

      const stock = await Stock.findById(stockId);
      if (!stock) {
        throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
      }

      if (stock.quantity < item.quantity) {
        throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
      }

      // Trừ số lượng tồn kho
      stock.quantity -= item.quantity;
      await stock.save();

      const itemPrice = stock.sellingPrice;
      const itemQuantity = Number(item.quantity);
      const totalForItem = itemPrice * itemQuantity;

      totalAmount += totalForItem;

      orderItems.push({
        medicine_id: medicine._id,
        stock_id: stockId,
        thumbnail: medicine.thumbnail,
        name: medicine.name,
        price: itemPrice,
        quantity: itemQuantity,
        totalAmount: totalForItem,
        note: "",
      });
    }

    // ✅ Tạo chi tiết đơn hàng
    const orderDetail = await new OrderDetail({
      order_items: orderItems,
      totalOrder: totalAmount,
    }).save();

    // ✅ Tạo đơn hàng chính
    const order = await new Order({
      user_id: userId,
      status: "đang chờ xác nhận",
      totalAmount: totalAmount,
      finalAmount: totalAmount,
      orderDetail: orderDetail._id,
    }).save();

    // ✅ Cập nhật giỏ hàng: loại bỏ item đã đặt hàng
    cart.medicine_item = cart.medicine_item.filter(
      (item: any) => !selectItemIds.includes(item?.medicine_id?._id?.toString())
    );
    cart.quantity = cart.medicine_item.reduce((sum: number, item: any) => sum + item.quantity, 0);
    await cart.save();

    return {
      message: "Đặt hàng thành công",
      order,
    };
  }

  async reviewOrder(userId: string,selectItemIds: string[]) {
    const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
    if (!cart || cart.medicine_item.length === 0) {
      throw new Error("Giỏ hàng trống hoặc không tìm thấy");
    }

    const user = await User.findById(userId).select("info.name info.phone info.address");
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const selectedItems = cart.medicine_item.filter((item: any) =>
      item?.medicine_id?._id && selectItemIds.includes(item.medicine_id._id.toString())
    );

    if (selectedItems.length === 0) {
      throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
    }

    const orderItemsReview = [];
    let totalAmount = 0;  
    for (const item of selectedItems) {
      const medicine = item.medicine_id as any;
      const stockId = medicine.stock_id;

      const stock = await Stock.findById(stockId);
      if (!stock) {
        throw new Error(`Không tìm thấy tồn kho cho thuốc ${medicine.name}`);
      }

      if (stock.quantity < item.quantity) {
        throw new Error(`Sản phẩm ${medicine.name} chỉ còn ${stock.quantity} trong kho`);
      }

      const itemPrice = stock.sellingPrice;
      const itemQuantity = Number(item.quantity);
      const totalForItem = itemPrice * itemQuantity;

      totalAmount += totalForItem;

      orderItemsReview.push({
        medicine_id: medicine._id,
        stock_id: stockId,
        thumbnail: medicine.thumbnail,
        name: medicine.name,
        price: itemPrice,
        quantity: itemQuantity,
        totalAmount: totalForItem,
        note: "",
      });
    }
    console.log("User Info:", user.info);
    return {
      userInfo: {
        name: user.info.name,
        phone: user.info.phone,
        address: user.info.address,
      },
      orderItemsReview: orderItemsReview,
      totalAmount,
    }
  }
  
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
