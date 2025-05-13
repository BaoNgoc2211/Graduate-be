import mongoose from "mongoose";
import { DiseaseUsageGroupEnum } from "../../enum/disease/disease-usage.enum";

export interface IDiseaseUsageGroup {
  name: DiseaseUsageGroupEnum;
  icon: string;
  disease: mongoose.Types.ObjectId[];
}
