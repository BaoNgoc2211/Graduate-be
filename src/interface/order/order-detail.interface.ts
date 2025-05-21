import { Types } from "mongoose";

export interface IMedicineItem {
  code: Types.ObjectId; // Mã thuốc (tham chiếu đến Medicine)
  price?: Types.ObjectId; // Tham chiếu đến lô thuốc (Batch)
  
}

export interface IOrderDetail {
  _id?: Types.ObjectId;
  medicine: IMedicineItem[];
  totalAmount:number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
