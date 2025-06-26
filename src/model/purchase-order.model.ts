import  mongoose, {Schema} from "mongoose";
import { IMedicineDetail, IPurchaseOrder } from "../interface/order/purchase-order.interface";


const medicineItemSchema = new Schema<IMedicineDetail>({
    medicine_id: {
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
const purchaseOrder = new Schema<IPurchaseOrder>({
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
        collection:"PurchaseOrder",
        timestamps:true
    })
;
const PurchaseOrder = mongoose.model<IPurchaseOrder>("PurchaseOrder",purchaseOrder);
export default PurchaseOrder;