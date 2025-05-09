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
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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
    packaging: {
      type: String,
      required: true,
    },
    mainDosageForm: {
      type: String,
      enum: Object.values(MainDosageEnum), 
      required: true,
    },
    detailedDosageForm: {
      type: String,
      required: true,
      enum: Object.values(DetailedDosageEnum),
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    indications: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    usageInstruction: {
      type: String,
      required: true,
    },
    // review: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     default: null,
    //   },
    // ],
    // drugUsageGroup: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Medicine Usage Group",
    //     required: true,
    //   },
    // ],
    categoryId: [
      {
        type: Schema.Types.ObjectId,
        ref: "MedicineCategory",
        required: true,
      },
    ],
    // manufacturerId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Manufacturer",
    //   required: true,
    // },
  },
  {
    collection: "Medicine",
    timestamps: true,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
