import mongoose, { Schema } from "mongoose";
import { IImportBatch } from "../../interface/inventory/import-batch.interface";
import { ImportBatchStatus } from "../../enum/medicine/import-batch.enum";

const ImportBatchSchema = new Schema<IImportBatch>(
  {
    batchNumber: { type: String },
    importDate: { type: Date },
    expiryDate: { type: Date },
    importPrice: { type: Number },
    status: { type: String },
    distributor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Distributor",
    },
  },
  { collection: "ImportBatch", timestamps: true }
);
const ImportBatch = mongoose.model("ImportBatch", ImportBatchSchema);
export default ImportBatch;
