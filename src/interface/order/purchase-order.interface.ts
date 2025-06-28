import { Types } from "mongoose";

export interface IMedicineDetail {
  medicine_id: Types.ObjectId; // ID của thuốc, tham chiếu đến model Medicine
  batch_id: Types.ObjectId;
  quantity: number;
  price: number;
  packaging: string; // Đơn vị tính của thuốc, ví dụ: "viên", "gói", "chai"
  VAT_Rate: number;
  CK_Rate: number;
  totalPrice: number;
}

export interface IPurchaseOrder {
  _id?: Types.ObjectId;
  medicines: IMedicineDetail[];
   // tham chiếu ImportBatch
  date_in: Date;
  totalAmount: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}