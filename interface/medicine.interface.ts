import mongoose from "mongoose";
import {
  OralDosageForm,
  ParenteralDosageForm,
  TopicalDosageForm,
  InhalationDosageForm,
  SuppositoryDosageForm,
  EyeNoseEarDosageForm,
  OtherDosageForm,
  MainDosageForm
} from "../enum/medicine.enum";

export interface IMedicine{
  image:string,
  name:string,
  price:number,
  soldQuantity: number,
  stockQuantity:number,
  packaging: string,
  mainDosageForm: MainDosageForm,
  detailedDosageForm: OralDosageForm | ParenteralDosageForm | TopicalDosageForm | 
                      InhalationDosageForm | SuppositoryDosageForm | EyeNoseEarDosageForm | 
                      OtherDosageForm,
  expiryDate: Date,
  description: string,
  indications: string,
  ingredients: string,
  benefits: string, 
  usageInstruction: string,
  review: IReview,
  categoryId: mongoose.Types.ObjectId,
  manuafacturerId: mongoose.Types.ObjectId,
}

export interface IReview {
  user: mongoose.Types.ObjectId,
  rating: number,
  comment: string
}