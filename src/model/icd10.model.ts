import mongoose from "mongoose";

const ICD10Schema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  vietnameseName: { type: String },
  chapter: { type: String },
});

export const ICD10Model = mongoose.model("ICD10", ICD10Schema);
