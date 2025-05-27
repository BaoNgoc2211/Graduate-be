import { Schema } from "mongoose";

export const InfoSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, match: /^[0-9]{9,15}$/ },
    address: { type: String, required: true },
  },
  { _id: false } 
);
