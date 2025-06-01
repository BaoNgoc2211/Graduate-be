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
    thumbnail: { type: String },
    name: { type: String },
    price: { type: Number,},
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
    totalPrice: { type: Number },
  },
  { collection: "Cart", timestamps: true }
);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
