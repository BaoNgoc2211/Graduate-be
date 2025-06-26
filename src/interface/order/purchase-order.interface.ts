import { Types } from "mongoose";

export interface IPurchaseOrder {
  _id?: Types.ObjectId;
  purchaseOrderDetail: Types.ObjectId; // tham chiếu PurchaseOrderDetail
  orderDate: Date;
  totalAmount: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}