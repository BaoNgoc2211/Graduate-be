import mongoose from "mongoose";

export interface IStock {
  medicine: mongoose.Types.ObjectId; 
  purchaseOrder: mongoose.Types.ObjectId;
  quantity: number;
  // packaging: string;
  sellingPrice: number;
}
