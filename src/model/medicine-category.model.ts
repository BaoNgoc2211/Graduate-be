import { mongo, Schema } from "mongoose";
import { IMedicineCategory } from "../interface/medicine-category.interface";
import { TherapeuticGroupEnum } from "../enum/medicine-cateogry.enum";

const medicineCategorySchema = new Schema<IMedicineCategory>({
  code: { type: String, unique: true },
  name: {
    type: String,
    enum: Object.values(TherapeuticGroupEnum),
    required: true,
  },
});
