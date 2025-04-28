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
    diseaseCategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Disease Category",
      },
    ],
    disease: [
      {
        type: Schema.Types.ObjectId,
        ref: "Disease",
      },
    ],
  },
  { collection: "Disease Usage Group", timestamps: true }
);
const DisUsageGroup = mongoose.model(
  "Disease Usage Group",
  DiseaseUsageGroupSchema
);
export default DisUsageGroup;
