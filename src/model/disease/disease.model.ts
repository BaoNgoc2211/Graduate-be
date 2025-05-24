import { riskGroup, SeverityEnum } from "./../../enum/disease/disease.enum";
import mongoose, { Schema } from "mongoose";
import {
  IDisease,
  IDiseaseMedicine,
  IDiseaseSymptom,
} from "../../interface/disease/disease.interface";

const DiseaseSchema = new Schema<IDisease>(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    nameDiff: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    image: {
      type: String,
      trim: true,
    },
    common: {
      type: String,
      trim: true,
    },
    riskGroup: [
      {
        type: String,
        enum: Object.values(riskGroup),
      },
    ],
    causes: {
      type: String,
      required: true,
      trim: true,
    },
    diagnosis: {
      type: String,
      trim: true,
    },
    prevention: {
      type: String,
      trim: true,
    },
    severityLevel: {
      type: String,
      enum: Object.values(SeverityEnum),
      required: true,
    },
    treatmentPlan: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    symptomIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Symptom",
        required: true,
      },
    ],
    diseaseCategoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiseaseCategory",
        required: true,
      },
    ],
    diseaseUsageGroupIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiseaseUsageGroup",
        required: true,
      },
    ],
  },
  { collection: "Disease", timestamps: true }
);
const DiseaseSymptomSchema = new Schema<IDiseaseSymptom>({
  disease_id: { type: mongoose.Schema.Types.ObjectId, ref: "Disease" },
  symptom_id: { type: mongoose.Schema.Types.ObjectId, ref: "Symptom" },
});
const DiseaseMedicineSchema = new Schema<IDiseaseMedicine>({
  disease_id: { type: mongoose.Schema.Types.ObjectId, ref: "Disease" },
  medicine_id: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
});
const Disease = mongoose.model("Disease", DiseaseSchema);
export default Disease;
