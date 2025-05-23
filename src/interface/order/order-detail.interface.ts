import { Types } from "mongoose";

export interface IMedicineItem {
  stock: Types.ObjectId; 
  name: string;
  price: number;
  quantity: number;
}
export interface IOrderDetail {
  _id?: string; // Optional vì khi tạo mới thì chưa có ID
  medicine: IMedicineItem[];
  totalAmount: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}