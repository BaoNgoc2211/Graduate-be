import { MedicineCategoryEnum } from "./../../enum/medicine-category.enum";
import {} from "../../enum/medicine-category.enum";
import mongoose from "mongoose";

export interface IMedicineCategory {
  name: MedicineCategoryEnum;
  medicine: mongoose.Types.ObjectId[];
}