import mongoose, { Schema } from "mongoose";
import { IDistributor } from "../../interface/medicine/distributor.interface";

const DistributorSchema = new Schema<IDistributor>(
  {
    nameCo: { type: String, unique: true, required: true },
    nameRep: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true, // Tự động loại bỏ khoảng trắng đầu và cuối
      lowercase: true, // Chuyển email về chữ thường
      match: /^\S+@\S+\.\S+$/, // Kiểm tra đúng định dạng email
      required: true,
    },
    phone: { type: String,match: /^[0-9]{9,15}$/, unique: true, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
  },
  { collection: "Distributor", timestamps: true }
);
const Distributor = mongoose.model("Distributor", DistributorSchema);
export default Distributor;
