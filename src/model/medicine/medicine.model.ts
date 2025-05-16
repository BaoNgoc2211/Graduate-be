import mongoose, { Schema } from "mongoose";
import {
  DetailedDosageEnum,
  MainDosageEnum,
} from "../../enum/medicine/medicine.enum";
import { IMedicine, IReview } from "../../interface/medicine/medicine.interface";
const ReviewSchema = new Schema<IReview>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { collection: "Review", timestamps: true }
);

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
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    image: [
      {
        type: String,
        required: true,
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
    //liều dùng
    dosage: {
      type: String,
      trim: true,
    },
    soldQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    //hướng dẫn sử dụng
    usageInstruction: {
      type: String,
      required: true,
      trim: true,
    },
    //công dụng
    indication: {
      type: String,
      trim: true,
    },
    //tác dụng phụ
    side_Effect: {
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
    pregnacy: {
      type: String,
      trim: true,
    },
    // tương tác thuốc
    drug_Interaction: {
      type: String,
      trim: true,
    },
    //bảo quản
    preserve: {
      type: String,
      trim: true,
    },
    active: {
      type: String,
      trim: true,
    },
    med_CategoryId: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicineCategory",
        required: true,
      },
    ],
    // med_UsageId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "MedicineCategory",
    //   required: true,
    // },
    // batch_Id:{
    //   type: Schema.Types.ObjectId,
    //   ref: "MedicineCategory",
    //   required: true,
    // }
    // manufacturerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Manufacturer",
    //   required: true,
    // },
    // medBatchId:{
    //   type: Schema.Types.ObjectId,
    //     ref: "MedicineCategory",
    //     required: true,
    // }
    // review: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     default: null,
    //   },
    // ],
  },
  {
    collection: "Medicine",
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
