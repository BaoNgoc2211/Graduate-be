import { NameEnum } from "./../../enum/medicine/medicine-category.enum";
import mongoose, { Schema } from "mongoose";
import { IMedicineCategory } from "../../interface/medicine/medicine-category.interface";

const MedicineCategorySchema = new Schema<IMedicineCategory>(
  {
    name: {
      type: String,
      enum: Object.values(NameEnum),
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    medicine: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medicine",
      },
    ],
    usageGroups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medicine Usage Group",
      },
    ],
  },
  { collection: "Medicine Category", timestamps: true }
);
const MedicineCategory = mongoose.model(
  "MedicineCategory",
  MedicineCategorySchema
);
export default MedicineCategory;
