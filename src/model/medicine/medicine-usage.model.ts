import { NameEnum } from "enum/medicine/medicine-usage.enum";
import { IMedicineUsageGroup } from "./../../interface/medicine/medicine-usage.interface";
import mongoose, { Schema } from "mongoose";
import { ref } from "process";

const MedicineUsageGroupSchema = new Schema<IMedicineUsageGroup>(
  {
    name: {
      type: String,
      enum: Object.values(NameEnum),
      required: true,
    },
    icon: {
      type: String,
    },
    medicineCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Medicine Category",
      },
    ],
  },
  { collection: "Medicine Usage Group", timestamps: true }
);
const MedicineUsageGroup = mongoose.model(
  "Medicine Usage Group",
  MedicineUsageGroupSchema
);
export default MedicineUsageGroup;
