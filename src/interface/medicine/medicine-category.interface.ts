import { MedicineCategoryEnum } from "../../enum/medicine/medicine-category.enum";
import {} from "../../enum/medicine/medicine-category.enum";
import mongoose from "mongoose";

export interface IMedicineCategory {
  name: MedicineCategoryEnum;
  icon: string;
  medicineId: mongoose.Types.ObjectId[];
  // usageGroups: mongoose.Types.ObjectId[];
}
