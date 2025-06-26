import mongoose, { Types } from "mongoose";

// export interface IStock {
//   _id?: Types.ObjectId;
//   medicine: Types.ObjectId; // tham chiếu Medicine
//   batch: Types.ObjectId;    // tham chiếu ImportBatch
//   quantity: number;
//   sellingPrice: number;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
export interface IStock {
  medicine: mongoose.Types.ObjectId; 
  purchaseOrder: mongoose.Types.ObjectId;
  quantity: number;
  sellingPrice: number;
}
