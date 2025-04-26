import mongoose from "mongoose";
import { IDisease } from "../interface/disease/disease.interface";

const DiseaseSchema = new mongoose.Schema<IDisease>({
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
    enum: ["Ủ bệnh", "Khởi phát", "Toàn phát", "Phục hồi"],
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
    enum: ["Nhẹ", "Trung bình", "Nặng", "Rất nặng", "Tử vong"],
    required: true,
  },
  treatmentPlan: {
    type: String,
  },
  diseaseCategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
