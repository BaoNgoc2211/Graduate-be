import mongoose, { Schema } from "mongoose";
import { IOrderDetail } from "../../interface/order/order-detail.interface";

const orderDetail = new Schema<IOrderDetail>(
  {
    stock_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    note: {
      type: String,
    },
  },
  {
    collection: "OrderDetail",
    timestamps: true,
  }
);
const OrderDetail = mongoose.model("OrderDetail", orderDetail);
export default OrderDetail;
