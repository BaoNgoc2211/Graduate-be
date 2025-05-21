import mongoose, { Schema } from "mongoose";

const orderDetail = new Schema({
    medicine:[{
        code: {
            type: mongoose.Types.ObjectId,
            ref: 'Medicine',
            required: true
        },
        price:{
            type: mongoose.Types.ObjectId,
            ref:"ImportBatch",
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        }
    }],
    totalAmount:{
        type: String
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