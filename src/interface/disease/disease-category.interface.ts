import mongoose, { Types } from "mongoose";

export interface IDiseaseCategory {
  _id?: Types.ObjectId;
  name: string;
  icon: string;
  diseaseUsage?: mongoose.Types.ObjectId[];
  disease?: mongoose.Types.ObjectId[];
}
