import mongoose, { Schema } from "mongoose";
import { ISymptom } from "../../interface/disease/symptom.interface";

const SymptomSchema = new Schema<ISymptom>(
  {
    name: { type: String, required: true },
    kindOf: { type: String },
    symptomGroup: { type: String, trim: true },
  },
  { collection: "Symptom", timestamps: true }
);

const Symptom = mongoose.model("Symptom", SymptomSchema);
export default Symptom;
