import mongoose from "mongoose";
import {
  DetailedDosageFormEnum,
  MainDosageFormEnum,
} from "../../enum/medicine/medicine.enum";

export interface IMedicine {
  image: string;
  name: string;
  price: number;
  soldQuantity: number;
  stockQuantity: number;
  packaging: string;
  mainDosageForm: MainDosageFormEnum;
  detailedDosageForm: DetailedDosageFormEnum;
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
