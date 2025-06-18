import mongoose, { Schema } from "mongoose";
import { IOrderDetail, IOrderItem } from "../../interface/order/order-detail.interface";

const orderItemSchema = new Schema<IOrderItem>(
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
  { _id: false }
);

const orderDetailSchema = new Schema<IOrderDetail>(
  {
    order_items: [orderItemSchema],
    
    totalOrder: {
      type: Number,
    },
  },
  {
    collection: "OrderDetail",
    timestamps: true,
  }
);

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);
export default OrderDetail;
