import { Types } from "mongoose";

export interface IMedicineDetail {
  code: Types.ObjectId; // ID của thuốc, tham chiếu đến model Medicine
  batch_id: Types.ObjectId;
  quantity: number;
  price: number;
  VAT_Rate: number;
  CK_Rate: number;
  totalPrice: number;
}

export interface IPurchaseOrderDetail {
  _id?: Types.ObjectId;
  medicines: IMedicineDetail[];
   // tham chiếu ImportBatch
  date_in: Date;
  totalAmount: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}