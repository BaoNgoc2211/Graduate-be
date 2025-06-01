import mongoose, { Schema } from "mongoose";
import { IImportBatch } from "../../interface/medicine/import-batch.interface";
import { StatusEnum } from "../../enum/medicine/import-batch.enum";

const ImportBatchSchema = new Schema<IImportBatch>(
  {
    batchNumber: { type: String },
    importDate: { type: Date },
    expiryDate: { type: Date },
    importPrice: { type: Number },
    status: {type: String, enum: StatusEnum},
    medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    distributor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor",
    },
  },
  { collection: "ImportBatch", timestamps: true }
);
const ImportBatch = mongoose.model("ImportBatch", ImportBatchSchema);
export default ImportBatch;
