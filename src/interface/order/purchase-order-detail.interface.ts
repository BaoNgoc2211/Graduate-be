import { Types } from "mongoose";

export interface IMedicineDetail {
  code: Types.ObjectId; // ID của thuốc, tham chiếu đến model Medicine
  quantity: number;
  price: number;
  VAT_Rate: number;
  CK_Rate: number;
  totalPrice: number;
}

export interface IPurchaseOrderDetail {
  _id?: Types.ObjectId;
  medicne: IMedicineDetail[];
  batch_id: Types.ObjectId; // tham chiếu ImportBatch
  date_in: Date;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}