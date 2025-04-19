import mongoose from "mongoose";

export interface IDisease {
  name: string;
  symptom: string;
  stages: "Ủ bệnh" | "Khởi phát" | "Toàn phát" | "Phục hồi";
  causes: string;
  riskGroup: string;
  diagnosis: string;
  prevention: string;
  image: string;
  notes: string;
  severityLevel: "Nhẹ" | "Trung bình" | "Nặng" | "Rất nặng" | "Tử vong";
  treatmentPlan: string;
  diseaseCategory: mongoose.Types.ObjectId;
}
