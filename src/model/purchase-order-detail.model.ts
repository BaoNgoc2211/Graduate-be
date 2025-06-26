import  mongoose, {Schema} from "mongoose";
import { IMedicineDetail, IPurchaseOrderDetail } from "../interface/order/purchase-order-detail.interface";


const medicineItemSchema = new Schema<IMedicineDetail>({
    code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    VAT_Rate: {
        type: Number,
        default: 0,
    },
    CK_Rate: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    batch_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"ImportBatch",
    },
});
const purchaseOrderDetail = new Schema<IPurchaseOrderDetail>({
    medicines:[medicineItemSchema],
    
    date_in:{
        type: Date,
    },
    totalAmount:{
        type: Number
    },
    note:{
        type: String,
    }
    },{
        collection:"PurchaseDetailOrder",
        timestamps:true
    })
;
const PurchaseDetailOrder = mongoose.model<IPurchaseOrderDetail>("PurchaseOrderDetail",purchaseOrderDetail);
export default PurchaseDetailOrder;