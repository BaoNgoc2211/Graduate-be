import mongoose, { Schema } from "mongoose";
import { ICartDetail, IMedicineItem } from "../../interface/order/cart-item.interface";


const medicineItem = new mongoose.Schema<IMedicineItem>({
    medicine_id: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});
const cartDetail = new mongoose.Schema<ICartDetail>(
{
    cart_id:{
        type: Schema.Types.ObjectId,
        ref:"Cart"
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    medicine_items:[
        [medicineItem],
    ],
    // order_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Order',
    // }
},{timestamps:true});


const CartDetail = mongoose.model<ICartDetail>("CartDetail", cartDetail);
export default CartDetail;
