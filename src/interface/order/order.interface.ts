import mongoose from "mongoose";
import {
  PaymentMethodEnum,
  PaymentStatusEnum,
} from "../../enum/order/order.enum";
import { OrderStatus } from "../../enum/order-status.enum";
import { IOrderDetail } from "./order-detail.interface";

export interface IOrder {
  user_id: mongoose.Types.ObjectId;
  // IInfo: IInfo;
  // voucher_id: mongoose.Types.ObjectId;
  shipping_id: mongoose.Types.ObjectId;
  status: OrderStatus;
  totalAmount: number;
  finalAmount?: number;
  paymentMethod: PaymentMethodEnum;
  paymentStatus: PaymentStatusEnum;
  orderDetail: IOrderDetail[];
}
export interface IInfo {
  address: string;
  phone: string;
  name: string;
}
