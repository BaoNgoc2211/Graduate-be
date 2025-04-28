import mongoose from "mongoose";
import { DiseaseUsageGroupEnum } from "../../enum/disease/disease-usage.enum";

export interface IDiseaseUsageGroup {
  name: DiseaseUsageGroupEnum;
  icon: string;
  diseaseCategory: mongoose.Types.ObjectId[];
  disease: mongoose.Types.ObjectId[];
}
// import mongoose from "mongoose";
// import {
//   InternalNameEnum,
//   SurgeryNameEnum,
//   OpgNameEnum,
//   OthersNameEnum,
//   LabNameEnum,
//   PreventiveNameEnum,
// } from "../../enum/disease/disease-usage.enum";

// export interface IDiseaseUsageGroup {
//   name:
//     | InternalNameEnum
//     | SurgeryNameEnum
//     | OpgNameEnum
//     | OthersNameEnum
//     | LabNameEnum
//     | PreventiveNameEnum;
//   icon: string;
//   diseaseCategory: mongoose.Types.ObjectId[];
// }
