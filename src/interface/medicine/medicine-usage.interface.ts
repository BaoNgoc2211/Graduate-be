import { MedicineUsageGroup } from "../../enum/medicine/medicine-usage.enum";
import mongoose, { Types } from "mongoose";
export interface IMedicineUsageGroup {
  name: MedicineUsageGroup;
  icon: string;
  medicine: mongoose.Types.ObjectId[];
}
