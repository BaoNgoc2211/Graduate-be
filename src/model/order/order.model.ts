import { IOrderDetail } from "./../../interface/order/order-detail.interface";
import { InfoSchema } from "./info.model";
import { PaymentMethod, PaymentStatus } from "./../../enum/order/order.enum";
import mongoose, { Schema } from "mongoose";
import { monitorEventLoopDelay } from "perf_hooks";
import { IInfo, IOrder } from "../../interface/order/order.interface";
import { OrderStatus } from "../../enum/order-status.enum";
import { ref } from "process";

const orderSchema = new Schema<IOrder>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    // IInfo: {
    //   InfoSchema,
    // },
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      require: true,
    },
    shipping_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipping",
      require: true,
    },  
    status: {
      type: String,
      enum: Object.values(OrderStatus),
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    finalAmount: {
      type: Number,
    },
    paymentMethod: { 
      type: String, enum: Object.values(PaymentMethod), 

    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
    },
    orderDetail:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail",
      required: true,
    },
  },
  {
    collection: "Order",
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
