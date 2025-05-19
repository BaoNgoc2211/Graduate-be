import { NameEnum } from "./../../enum/medicine/medicine-usage.enum";
import { IMedicineUsageGroup } from "./../../interface/medicine/medicine-usage.interface";
import mongoose, { Schema } from "mongoose";


const MedicineUsageGroupSchema = new Schema<IMedicineUsageGroup>(
  {
    name: {
      type: String,
      enum: Object.values(NameEnum),
      unique: true,
      required: true,
    },
    icon: {
      type: String,
    }
  },
  { collection: "MedicineUsageGroup", timestamps: true }
);
const MedicineUsageGroup = mongoose.model(
  "MedicineUsageGroup",
  MedicineUsageGroupSchema
);
export default MedicineUsageGroup;
