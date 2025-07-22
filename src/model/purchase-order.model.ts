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
    importPrice: {
        type: Number,
        required: true,
    },
    packaging: {
        type: String,
        required: true, // Ví dụ đơn vị tính mặc định là "viên"
    },
    VAT_Rate: {
        type: Number,
        default: 0,
    },
    CK_Rate: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    batch_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"ImportBatch",
    },
    distributor_id:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"Distributor",
    }
},{_id:false}
);
const purchaseOrder = new Schema<IPurchaseOrder>({
    medicines:[medicineItemSchema],
    
    date_in:{
        type: Date,
    },
    totalPrice:{
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