import { NameEnum } from "./../../enum/disease/disease-category.enum";
import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import mongoose, { Schema } from "mongoose";

const DiseaseCategorySchema = new Schema<IDiseaseCategory>(
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
    // disUsage: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "DiseaseUsageGroup",
    //   },
    // ],
  },
  { collection: "DiseaseCategory" }
);

const DiseaseCategory = mongoose.model(
  "DiseaseCategory",
  DiseaseCategorySchema
);
export default DiseaseCategory;
