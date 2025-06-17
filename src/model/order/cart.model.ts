import { ICartItem } from "../../interface/order/cart.interface";
import mongoose, { Schema } from "mongoose";
import { ICart } from "../../interface/order/cart.interface";

const cartItemSchema = new Schema<ICartItem>(
  {
    medicine_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    medicine_item: [cartItemSchema],
    quantity: { type: Number, default: 1 },
  },
  { collection: "Cart", timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
