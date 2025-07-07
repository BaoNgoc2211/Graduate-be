import mongoose, { Schema } from "mongoose";
import { IStock } from "../../interface/inventory/stock.interface";

const stockSchema = new Schema<IStock>(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    purchaseOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseOrder",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    // packaging: {
    //   type: String,
    //   required: true, // Ví dụ: "Hộp 10 viên", "Chai 100ml"
    // },
    sellingPrice: {
      type: Number,
      min: 0,
    },
  },
  { collection: "Stock", timestamps: true }
);
const Stock = mongoose.model("Stock", stockSchema);
export default Stock;
