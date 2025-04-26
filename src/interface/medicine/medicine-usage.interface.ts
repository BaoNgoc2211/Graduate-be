import mongoose from "mongoose";
import { MedicineUsageGroup } from "../../enum/medicine/medicine-usage.enum";

export interface IMedicineUsageGroup {
  name: MedicineUsageGroup;
  icon: string;
  medicineCategory: mongoose.Types.ObjectId[];
}
