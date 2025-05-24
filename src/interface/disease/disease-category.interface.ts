import { DiseaseCategoryEnum } from './../../enum/disease/disease-category.enum';
import mongoose from "mongoose";

export interface IDiseaseCategory {
  name: DiseaseCategoryEnum;
  icon: string;
  // disUsage: mongoose.Types.ObjectId[];
}
