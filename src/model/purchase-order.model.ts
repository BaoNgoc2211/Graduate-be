import mongoose, { Schema } from "mongoose";
import { IPurchaseOrder } from "../interface/order/purchase-order.interface";

const purchaseOrder =  new Schema<IPurchaseOrder>({
    purchaseOrderDetail:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"PurchaseOrderDetail"
    },
    orderDate:{
        type: Date,
    },
    totalAmount:{
        type: Number,
    },
    note:{
        type:String,
    },
    },{
        collection:"PurchaseOrder",
        timestamps:true
    }
);
const PurchaseOrder = mongoose.model("PurchaseOrder",purchaseOrder);
export default PurchaseOrder;