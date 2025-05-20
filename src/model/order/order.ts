import mongoose, { mongo, Schema } from "mongoose";
import { monitorEventLoopDelay } from "perf_hooks";

const orderSchema = new Schema(
    {
        user_Id:{
            type:mongoose.Types.ObjectId,
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
            default: "Pending",
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
            type: mongoose.Types.ObjectId,
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