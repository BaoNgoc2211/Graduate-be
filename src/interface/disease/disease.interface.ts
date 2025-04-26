import mongoose from "mongoose";
import { SeverityLevelEnum, StagesEnum } from "../../enum/disease/disease.enum";
// import file csv
export interface IDisease {
  name: string;
  symptom: string;
  stages: StagesEnum;
  causes: string;
  riskGroup: string;
  diagnosis: string;
  prevention: string;
  image: string;
  notes: string;
  severityLevel: SeverityLevelEnum;
  treatmentPlan: string;
  diseaseUsageGroup: mongoose.Types.ObjectId[];
  diseaseCategory: mongoose.Types.ObjectId[];
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
