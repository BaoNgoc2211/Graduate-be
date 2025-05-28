import mongoose, { Schema } from "mongoose";
import { IOrderDetail } from "../../interface/order/order-detail.interface";

const orderDetaiSchema = new Schema<IOrderDetail>(
  {
    medicine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    stock_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    thumbnail: {
      type: String,
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
    quantity: {
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
const OrderDetail = mongoose.model("OrderDetail", orderDetaiSchema);
export default OrderDetail;
