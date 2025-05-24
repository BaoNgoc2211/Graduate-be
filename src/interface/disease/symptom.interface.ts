import mongoose from "mongoose";

export interface ISymptom {
  name: string; 
  kindOf: string;
  // kindOf: IKindOf[]; 
  symptomGroup: string;
}
export interface IKindOf {
  name: string;
  symptom_id: mongoose.Types.ObjectId;
}
