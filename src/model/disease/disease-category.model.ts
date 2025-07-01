import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import mongoose, { Schema } from "mongoose";

const DiseaseCategorySchema = new Schema<IDiseaseCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    icon: {
      type: String,
      required: true,
    },
    diseaseUsage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiseaseUsageGroup",
        required: true,
      },
    ],
    disease: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Disease",
        required: true,
      },
    ],
  },
  { collection: "DiseaseCategory", timestamps: true }
);

const DiseaseCategory = mongoose.model(
  "DiseaseCategory",
  DiseaseCategorySchema
);
export default DiseaseCategory;
