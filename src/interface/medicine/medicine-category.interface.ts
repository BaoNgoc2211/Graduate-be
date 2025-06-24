import { MedicineCategoryEnum } from "../../enum/medicine/medicine-category.enum";
import {} from "../../enum/medicine/medicine-category.enum";
import mongoose, { Types } from "mongoose";

export interface IMedicineCategory {
  _id?: Types.ObjectId;
  // name: MedicineCategoryEnum;
  name: string;
  icon: string;
  medicine: mongoose.Types.ObjectId[];
}
