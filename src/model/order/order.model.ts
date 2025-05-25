import mongoose, { Schema } from "mongoose";
import { monitorEventLoopDelay } from "perf_hooks";
import { IOrder } from "../../interface/order/order.interface";
import { OrderStatus } from "../../enum/order-status.enum";

const orderSchema = new Schema<IOrder>(
    {
        user_Id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
        // voucher:{
        //     type:mongoose.Types.ObjectId,
        //     require:true,
        // },
        // shipping_id:{
        //     type:mongoose.Types.ObjectId,
        //     require:true,
        // },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: "PENDING",
            require: true,
        },
        // totalAmount:{
        //     type: Number,
        //     require: true,
        // },
        // finalAmount:{
        //     type: String,
        // },
        orderDate: {
            type: Date,
            default: Date.now
        },
        orderDetail:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderDetail"
        }

    },
    {
        collection:"Order",
        timestamps:true
    }
);
const Order = mongoose.model("Order",orderSchema);
export default Order;