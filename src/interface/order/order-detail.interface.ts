import mongoose from "mongoose";

export interface IOrderItem {
  medicine_id: mongoose.Types.ObjectId;
  stock_id: mongoose.Types.ObjectId;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  _id?: mongoose.Types.ObjectId;
  note?: string;
}

export interface IOrderDetail {
  order_items: IOrderItem[];
  totalOrder: number;
   // Tổng giá trị đơn hàng
   // Ghi chú cho đơn hàng
  // Có thể thêm các trường khác như user_id, orderId, ... nếu cần
  _id?: mongoose.Types.ObjectId;
}
