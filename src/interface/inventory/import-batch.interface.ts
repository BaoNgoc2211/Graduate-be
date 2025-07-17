import mongoose from "mongoose";
import { ImportBatchStatus } from "../../enum/medicine/import-batch.enum";

export interface IImportBatch {
  batchNumber: string;
  importDate: Date;
  expiryDate: Date;
  importPrice: number;
  status: ImportBatchStatus;
  // sellingPrice: number;
  // medicine_id: mongoose.Types.ObjectId;
  distributor_id: mongoose.Types.ObjectId;
}
