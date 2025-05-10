import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    cartTotalPrice:{
        type: Number,
        default:0
    }
},{timestamps:true});

const Cart = mongoose.model("Cart",cartSchema);
export default Cart;