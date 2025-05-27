import mongoose from "mongoose";

export interface IOrderDetail {
  stock_id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  totalAmount: number;
  note?: string;
}
