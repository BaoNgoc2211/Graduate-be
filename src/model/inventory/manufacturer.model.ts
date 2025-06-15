import mongoose, { Schema } from "mongoose";
import { IManufacturer } from "../../interface/inventory/manufacturer.interface";

const ManufacturerSchema = new Schema<IManufacturer>(
  {
    nameCo: { type: String, trim: true, unique: true, required: true },
    country: { type: String, trim: true, required: true },
    branch: { type: String, trim: true, required: true },
  },
  { collection: "Manufacturer", timestamps: true }
);
const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
export default Manufacturer;
