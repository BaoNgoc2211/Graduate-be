import mongoose from "mongoose";
import {
  DetailedDosageFormEnum,
  MainDosageFormEnum,
} from "../../enum/medicine/medicine.enum";

export interface IMedicine {
  code?: string;
  name: string;
  thumbnail?: string;
  image: string[];
  packaging: string;
  dosageForm: DetailedDosageFormEnum;
  dosage?: string;
  soldQuantity?: number;
  stockQuantity: number;
  usageInstruction: string;
  indication?: string;
  side_Effect?: string;
  contraindication?: string;
  precaution?: string;
  ability?: string;
  pregnacy?: string;
  drug_Interaction?: string;
  preserve?: string;
  active?: string;
  med_CategoryId: mongoose.Types.ObjectId[];
}

export interface IReview {
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}
