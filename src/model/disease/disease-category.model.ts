import { NameEnum } from "./../../enum/disease/disease-category.enum";
import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import mongoose, { Schema } from "mongoose";

const DisCategorySchema = new Schema<IDiseaseCategory>(
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
    disUsage: [
      {
        type: Schema.Types.ObjectId,
        ref: "Disease Usage Group",
      },
    ],
    disease: [
      {
        type: Schema.Types.ObjectId,
        ref: "Disease",
      },
    ],
  },
  { collection: "Disease Category" }
);

const DisCategory = mongoose.model(
  "DiseaseCategory",
  DisCategorySchema
);
export default DisCategory;
