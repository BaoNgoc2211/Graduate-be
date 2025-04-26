import { SeverityEnum } from "./../../enum/disease/disease.enum";
import mongoose, { Schema } from "mongoose";
import { IDisease } from "../../interface/disease/disease.interface";
import { StageEnum } from "../../enum/disease/disease.enum";

const DiseaseSchema = new Schema<IDisease>(
  {
    name: {
      type: String,
      required: true,
    },
    symptom: {
      type: String,
      required: true,
    },
    stages: {
      type: String,
      enum: Object.values(StageEnum),
      required: true,
    },
    causes: {
      type: String,
      required: true,
    },
    riskGroup: {
      type: String,
    },
    diagnosis: {
      type: String,
    },
    prevention: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    severityLevel: {
      type: String,
      enum: Object.values(SeverityEnum),
      required: true,
    },
    treatmentPlan: {
      type: String,
    },
    diseaseUsageGroup: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
    diseaseCategory: [
      {
        type: Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { collection: "Disease", timestamps: true }
);
const Disease = mongoose.model(
  "Disease",
  DiseaseSchema
);
export default Disease;
