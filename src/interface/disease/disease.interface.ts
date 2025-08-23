import mongoose from "mongoose";
import {
  RiskGroup,
  SeverityLevelEnum,
} from "../../enum/disease/disease.enum";
// import file csv
export interface IDisease {
  code: string;
  name: string;
  nameDiff?: string;
  image?: string;
  common: string;
  riskGroup: RiskGroup[]; // nhóm nguy cơ
  causes: string;
  diagnosis: string;
  prevention: string;
  severityLevel: SeverityLevelEnum;
  treatmentPlan: string;
  notes?: string;
  status?: string;
  symptomIds: mongoose.Types.ObjectId[];
  diseaseCategoryIds: mongoose.Types.ObjectId[];
  diseaseUsageGroupIds: mongoose.Types.ObjectId[];
  medicine_id?: mongoose.Types.ObjectId[];
}
export interface IDiseaseSymptom {
  disease_id: mongoose.Types.ObjectId;
  symptom_id: mongoose.Types.ObjectId;
}
export interface IDiseaseMedicine {
  disease_id: mongoose.Types.ObjectId;
  medicine_id: mongoose.Types.ObjectId;
}
export interface IProductMethod extends Document {
  addDisease(data: IDisease): Promise<IDisease>;
  removeDisease(id: string): Promise<void>;
  getAllDisease(page: number, size: number, name: string): Promise<IDisease[]>;
}
export interface IDiseaseRepo {
  page: number;
  size: number;
  name: string;
}
