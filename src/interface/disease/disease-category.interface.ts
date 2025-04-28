import { DiseaseCategoryEnum } from './../../enum/disease/disease-category.enum';
import mongoose from "mongoose";

export interface IDiseaseCategory {
  name: DiseaseCategoryEnum;
  icon: string;
  disease: mongoose.Types.ObjectId[];
}
