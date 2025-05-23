import mongoose, { Schema } from "mongoose";
import { IPurchaseOrder } from "../interface/order/purchase-order.interface";

const purchaseOrder =  new Schema<IPurchaseOrder>({
    purchaseOrderDetail:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"PurchaseOrderDetail"
    },
    note:{
        type:String,
    },
    orderDate:{
        type: Date,
    },
    totalAmount:{
        type: Number,
    }
    },{
        collection:"PurchaseOrder",
        timestamps:true
    }
);
const PurchaseOrder = mongoose.model("PurchaseOrder",purchaseOrder);
export default PurchaseOrder;