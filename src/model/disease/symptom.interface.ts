import mongoose, { Schema } from "mongoose";
import { IKindOf, ISymptom } from "../../interface/disease/symptom.interface";

const symptomSchema = new Schema<ISymptom>(
  {
    name: { type: String, required: true },
    kindOf: { type: String },
    // kindOf: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "KindOf",
    //   },
    // ],
    symptomGroup: { type: String, trim: true },
  },
  { collection: "Symptom", timestamps: true }
);
const kindOfSchema = new Schema<IKindOf>(
  {
    name: { type: String, unique: true },
  },
  { collection: "KindOf", timestamps: true }
);
const Symptom = mongoose.model("Symptom", symptomSchema);
export default Symptom;
