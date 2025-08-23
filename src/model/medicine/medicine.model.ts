import mongoose, { Schema } from "mongoose";
import { DetailedDosageEnum } from "../../enum/medicine/medicine.enum";
import {
  IMedicine,
} from "../../interface/medicine/medicine.interface";
const medicineSchema = new Schema<IMedicine>(
  {
    code: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
        trim: true,
      },
    ],
    packaging: {
      type: String,
      required: true,
      trim: true,
    },
    // dạng điều chế
    dosageForm: {
      type: String,
      required: true,
      enum: Object.values(DetailedDosageEnum),
    },
    //hướng dẫn sử dụng
    use: {
      type: String,
      required: true,
      trim: true,
    },
    // liều dùng
    dosage: {
      type: String,
    },
    //công dụng
    indication: {
      type: String,
      trim: true,
    },
    //tác dụng phụ
    adverse: {
      type: String,
      trim: true,
    },
    //chống chỉ định
    contraindication: {
      type: String,
      trim: true,
    },
    // thận trọng khi sử dụng
    precaution: {
      type: String,
      trim: true,
    },
    ability: {
      type: String,
      trim: true,
    },
    pregnancy: {
      type: String,
      trim: true,
    },
    // tương tác thuốc
    drugInteractions: {
      type: String,
      trim: true,
    },
    //bảo quản
    storage: {
      type: String,
      trim: true,
    },
    active: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    age_group: [
      {
        type: String,
      },
    ],
    importBatch_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImportBatch",
        required: true,
      },
    ],
    medCategory_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicineCategory",
        required: true,
      },
    ],
    medUsage_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicineUsageGroup",
        required: true,
      },
    ],
    manufacturer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true,
    },
    // stock_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Stock",
    //  required: true,
    // },
  },
  {
    collection: "Medicine",
    timestamps: true,
  }
);


const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
