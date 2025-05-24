import mongoose, { Schema } from "mongoose";

const stock = new Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    },
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImportBatch",
    },
    quantity: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
  },
  {
    collection: "Stock",
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stock);
export default Stock;
