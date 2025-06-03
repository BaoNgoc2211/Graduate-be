import mongoose, { Schema } from "mongoose";
import { IStock } from "../../interface/inventory/stock.interface";

const stockSchema = new Schema<IStock>(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImportBatch",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    sellingPrice: {
      type: Number,
      min: 0,
    },
  },
  { collection: "Stock", timestamps: true }
);
const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
