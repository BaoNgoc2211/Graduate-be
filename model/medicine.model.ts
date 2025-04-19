import mongoose, { Schema } from "mongoose";
import { IMedicine, IReview } from "../interface/medicine.interface";
import {
  OralDosageForm,
  ParenteralDosageForm,
  TopicalDosageForm,
  InhalationDosageForm,
  SuppositoryDosageForm,
  EyeNoseEarDosageForm,
  OtherDosageForm,
  MainDosageForm,
} from "../enum/medicine.enum";

const reviewSchema = new Schema<IReview>(
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
  { timestamps: true }
);

// Định nghĩa schema cho medicine
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
      enum: Object.values(MainDosageForm), // Chỉ chấp nhận các giá trị từ enum
      required: true,
    },
    detailedDosageForm: {
      type: String,
      required: true,
      enum: [
        ...Object.values(OralDosageForm),
        ...Object.values(ParenteralDosageForm),
        ...Object.values(TopicalDosageForm),
        ...Object.values(InhalationDosageForm),
        ...Object.values(SuppositoryDosageForm),
        ...Object.values(EyeNoseEarDosageForm),
        ...Object.values(OtherDosageForm),
      ],
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
    benefits: {
      type: String,
      required: true,
    },
    usageInstruction: {
      type: String,
      required: true,
    },
    review: {
      type: reviewSchema,
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    manuafacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: true,
    },
  },
  {
    collection: "Medicine",
    timestamps: true,
    versionKey: false,
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
