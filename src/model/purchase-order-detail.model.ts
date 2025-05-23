import  mongoose, {Schema} from "mongoose";
import { IPurchaseOrderDetail } from "../interface/order/purchase-order-detail.interface";

const purchaseOrderDetail = new Schema<IPurchaseOrderDetail>({
    medicne:[{
        code:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Medicine",
        },
        quantity:{
        type: Number,
        },
        price:{
            type: Number,
        },
        VAT_Rate:{
            type: Number     
        },
        CK_Rate:{
            type: Number
        },
        totalPrice:{
            type:Number
        }
    }],
    batch_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"ImportBatch",
    },
        
    date_in:{
        type: Date,
    },
    totalAmount:{
        type: Number
    }
    },{
        collection:"PurchaseDetailOrder",
        timestamps:true
    })
;
const PurchaseDetailOrder = mongoose.model<IPurchaseOrderDetail>("PurchaseOrderDetail",purchaseOrderDetail);
export default PurchaseDetailOrder;