
import { NameEnum } from "../../enum/disease/disease-usage.enum";
import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
import mongoose, { Schema } from "mongoose";
const DiseaseUsageGroupSchema = new Schema<IDiseaseUsageGroup>(
  {
    name: {
      type: String,
      enum: Object.values(NameEnum),
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    disease: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { collection: "Disease", timestamps: true }
);
const DiseaseUsageGroup = mongoose.model(
  "Disease Usage Group",
  DiseaseUsageGroupSchema
);
export default DiseaseUsageGroup;
