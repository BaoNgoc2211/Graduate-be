import mongoose from "mongoose";

export interface IOrderDetail {
  medicine_id: mongoose.Types.ObjectId;
  stock_id: mongoose.Types.ObjectId;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
  totalAmount: number;
  note?: string;
}
