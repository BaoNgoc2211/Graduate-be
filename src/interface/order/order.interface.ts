import { Types } from "mongoose";

export interface IOrder {
  _id?: Types.ObjectId;
  user_Id: Types.ObjectId; // Tham chiếu User
  status: string;
  totalAmount: number;
  finalAmount?: string;
  orderDate?: Date;
  orderDetail?: Types.ObjectId; // Tham chiếu đến OrderDetail
  createdAt?: Date;
  updatedAt?: Date;
}
