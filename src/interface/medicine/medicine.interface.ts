import mongoose from "mongoose";
import {
  EyeNoseEarDosageFormEnum,
  InhalationDosageFormEnum,
  MainDosageFormEnum,
  OralDosageFormEnum,
  OtherDosageFormEnum,
  ParenteralDosageFormEnum,
  SuppositoryDosageFormEnum,
  TopicalDosageFormEnum,
} from "../../enum/medicine.enum";

export interface IMedicine {
  image: string;
  name: string;
  price: number;
  soldQuantity: number;
  stockQuantity: number;
  packaging: string;
  mainDosageForm: MainDosageFormEnum;
  detailedDosageForm:
    | OralDosageFormEnum
    | ParenteralDosageFormEnum
    | TopicalDosageFormEnum
    | InhalationDosageFormEnum
    | SuppositoryDosageFormEnum
    | EyeNoseEarDosageFormEnum
    | OtherDosageFormEnum;
  expiryDate: Date;
  description: string;
  indications: string;
  ingredients: string;
  usageInstruction: string;
  review: IReview[];
  drugUsageGroup: mongoose.Types.ObjectId[]; //IMedicineUsageGroup
  categoryId: mongoose.Types.ObjectId[]; //IMedicineCategory
  manufacturerId: mongoose.Types.ObjectId;
}

export interface IReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}
