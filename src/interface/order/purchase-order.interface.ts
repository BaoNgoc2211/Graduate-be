import { Types } from "mongoose";

export interface IPurchaseOrder {
  _id?: Types.ObjectId;
  purchaseOrderDetail: Types.ObjectId; // tham chiếu PurchaseOrderDetail
  note?: string;
  orderDate: Date;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}