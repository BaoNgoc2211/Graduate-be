import { Types } from "mongoose";

export interface IStock {
  _id?: Types.ObjectId;
  medicine: Types.ObjectId; // tham chiếu Medicine
  batch: Types.ObjectId;    // tham chiếu ImportBatch
  quantity: number;
  sellingPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}