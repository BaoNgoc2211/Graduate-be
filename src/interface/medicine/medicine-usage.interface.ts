import mongoose from "mongoose";
export interface IMedicineUsageGroup {
  name: string;
  icon: string;
  medicine: mongoose.Types.ObjectId[];
}
