import mongoose from "mongoose";

// export interface ICartDetail {
//   _id?: Types.ObjectId;
//   cart_id: Types.ObjectId;
//   user_id: Types.ObjectId;
//   medicine_items: IMedicineItem[];
// //   order_id?: Types.ObjectId;
// }

// export interface IMedicineItem {
//   medicine_id: Types.ObjectId;
//   quantity: number;
// }
export interface ICart {
  user_id: mongoose.Types.ObjectId;
  medicine_item: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
export interface ICartItem {
  medicine_id: mongoose.Types.ObjectId;
  thumbnail: string;
  name: string;
  price: number;
  quantity: number;
}
