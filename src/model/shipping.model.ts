import mongoose, { Schema } from "mongoose";
import { IShipping } from "../interface/shipping.interface";
import { ShippingType } from "../enum/shipping.enum";

const ShippingSchema = new Schema<IShipping>({
    type: {
      type: String, 
      enum: Object.values(ShippingType),
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Giá phải là số dương
    },
  },
  { collection: "Shipping", timestamps: true }
);

const Shipping = mongoose.model("Shipping", ShippingSchema);
export default Shipping;
