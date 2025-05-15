import mongoose, { Schema } from "mongoose";
import { IShipping } from "../interface/shipping.interface";

const ShippingSchema = new Schema<IShipping>(
  {},
  { collection: "Shipping", timestamps: true }
);

const Shipping = mongoose.model("Shipping", ShippingSchema);
export default Shipping;
