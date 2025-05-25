import mongoose, { Schema } from "mongoose";
import { IOrderDetail } from "../../interface/order/order-detail.interface";

const orderDetail = new Schema<IOrderDetail>({
    medicine:[{
        stock: {
            type: mongoose.Types.ObjectId,
            ref: 'Stock',
            required: true
        },
        // name:{
        //     type: String,
        // },
        price:{
            type: Number,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
    }],
    totalAmount:{
        type: Number,
    },
    note:{
        type: String,
    }
    },{
        collection:"OrderDetail",
        timestamps:true
    }
);
const OrderDetail = mongoose.model("OrderDetail",orderDetail);
export default OrderDetail;