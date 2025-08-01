import mongoose from "mongoose";
import { IMedicine } from "../medicine/medicine.interface";

export interface ICart {
  user_id: mongoose.Types.ObjectId;
  medicine_item: ICartItem[];
  quantity?: number;
}
export interface ICartItem {
  medicine_id: mongoose.Types.ObjectId|IMedicine;
  quantity: number;
}
