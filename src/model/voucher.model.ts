import { disCountTypeEnum } from "./../enum/voucher.enum";

import mongoose, { Schema } from "mongoose";
import { IVoucher } from "../interface/voucher.interface";

const VoucherSchema = new Schema<IVoucher>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean },
    discountType: {
      type: String,
      enum: Object.values(disCountTypeEnum),
      required: true,
    },
    discountValue: { type: Number },
    minOrderValue: { type: Number },
    maxDiscountValue: { type: Number },
    usageLimit: { type: Number },
    usedCount: { type: Number },
    // applyTo: { type: String, enum: Object.values(applyToEnum), required: true },
    // applyToIds: [{ type: mongoose.Schema.Types.Mixed }], 
  },
  { collection: "Voucher", timestamps: true }
);
VoucherSchema.index({ endDate: 1 }); // Tối ưu cho cron
const Voucher = mongoose.model("Voucher", VoucherSchema);
export default Voucher;
