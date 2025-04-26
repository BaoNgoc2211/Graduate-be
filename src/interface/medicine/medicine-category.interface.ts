import { MedicineCategoryEnum } from "../../enum/medicine/medicine-category.enum";
import {} from "../../enum/medicine/medicine-category.enum";
import mongoose from "mongoose";

export interface IMedicineCategory {
  name: MedicineCategoryEnum;
  icon: string;
  medicine: mongoose.Types.ObjectId[];
}
