import { Types } from 'mongoose';

export interface ICartDetail {
  _id?: Types.ObjectId;
  cart_id: Types.ObjectId;
  user_id: Types.ObjectId;
  medicine_items: IMedicineItem[];
//   order_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IMedicineItem {
  medicine_id: Types.ObjectId;
  quantity: number;
}