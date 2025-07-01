import Order from "../../model/order/order.model";
import { IOrder } from "../../interface/order/order.interface";
import OrderDetail from "../../model/order/order.detail.model";
import User from "../../model/auth/user.model";
import Stock from "../../model/inventory/stock.model";
import Cart from "../../model/order/cart.model";
import { OrderStatus } from "../../enum/order-status.enum";
import Shipping from "../../model/shipping.model";
import { IOrderItem } from "../../interface/order/order-detail.interface";
import { stat } from "fs";

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

  async checkOut(userId: string, selectItemIds: string[],shippingId: string) {
    const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
    if (!cart || cart.medicine_item.length === 0) {
      throw new Error("Giỏ hàng trống hoặc không tìm thấy");
    }
    
    const selectedItems = cart.medicine_item.filter((item: any) =>
      item?.medicine_id?._id && selectItemIds.includes(item.medicine_id._id.toString())
    );
    if (selectedItems.length === 0) {
      throw new Error("Không có sản phẩm nào được chọn để đặt hàng");
    }

    const shipping = await Shipping.findById(shippingId);
    if (!shipping) {  
      throw new Error("Không tìm thấy thông tin vận chuyển");
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

      stock.quantity -= item.quantity;
       console.log("Stock", stock);
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


    const orderDetail = await new OrderDetail({
      order_items: orderItems,
      totalOrder: totalAmount,
    }).save();


    const order = await new Order({
      user_id: userId,
      status: "đang chờ xác nhận",
      shipping_id: shippingId,
      totalAmount: totalAmount,
      finalAmount: totalAmount + shipping.price,
      orderDetail: orderDetail._id,
    }).save();


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

  async reviewOrder(userId: string,selectItemIds: string[],shippingId: string) {
    const cart = await Cart.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
    if (!cart || cart.medicine_item.length === 0) {
      throw new Error("Giỏ hàng trống hoặc không tìm thấy");
    }

    const user = await User.findById(userId).select("info.name info.phone info.address");
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    const shipping = await Shipping.findById(shippingId);
    if (!shipping) {
      throw new Error("Không tìm thấy thông tin vận chuyển");
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

    return {
      userInfo: {
        name: user.info.name,
        phone: user.info.phone,
        address: user.info.address,
      },
      orderItemsReview: orderItemsReview,
      shipping: shipping,
      totalAmount: totalAmount + shipping.price,
    }
  }
  
  async checkStatus(userId: string) {
    console.log("User ID:", userId);

    const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      throw new Error("Người dùng chưa có đơn hàng nào.");
    }

    // Lấy danh sách các ID của orderDetail từ các đơn hàng
    const orderDetailIds = orders.map(order => order.orderDetail); // <-- sửa theo đúng tên field trong Order

    // Tìm tất cả OrderDetail tương ứng
    const orderDetails = await OrderDetail.find({ _id: { $in: orderDetailIds } });

    // Tạo Map để tra nhanh
    const orderDetailMap = new Map();
    orderDetails.forEach(detail => {
      orderDetailMap.set(detail._id.toString(), detail);
    });

    // Trả về kết quả đã ghép nối
    const result = orders.map(order => {
      const detail = orderDetailMap.get(order.orderDetail.toString());

      return {
        orderId: order._id,
        status: order.status,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        items: detail?.order_items.map((item:IOrderItem) => ({
          order_item: item.medicine_id,
          medicineName: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.totalAmount,
          thumbnail: item.thumbnail,
        })),
      };
    });

  console.log("Formatted Result:", result);
  return result;
}


  async checkStatusOrder(userId: string, status: OrderStatus) {
    const orders = await Order.find({ user_id: userId,  status }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      throw new Error("Người dùng chưa có đơn hàng nào.");
    }

    // Lấy danh sách các ID của orderDetail từ các đơn hàng
    const orderDetailIds = orders.map(order => order.orderDetail); // <-- sửa theo đúng tên field trong Order

    // Tìm tất cả OrderDetail tương ứng
    const orderDetails = await OrderDetail.find({ _id: { $in: orderDetailIds } });

    // Tạo Map để tra nhanh
    const orderDetailMap = new Map();
    orderDetails.forEach(detail => {
      orderDetailMap.set(detail._id.toString(), detail);
    });

    // Trả về kết quả đã ghép nối
    const result = orders.map(order => {
      const detail = orderDetailMap.get(order.orderDetail.toString());

      return {
        orderId: order._id,
        status: order.status,
        totalAmount: order.totalAmount,
        finalAmount: order.finalAmount,
        items: detail?.order_items.map((item:IOrderItem) => ({
          order_item: item.medicine_id,
          medicineName: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.totalAmount,
          thumbnail: item.thumbnail,
        })),
      };
    });

  return result;
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
