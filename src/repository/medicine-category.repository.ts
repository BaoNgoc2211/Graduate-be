import MedicineCategory from "../model/medicine/medicine-category.model";
import { IMedicineCategory } from "../interface/medicine/medicine-category.interface";
import mongoose from "mongoose";

export const MedicineCategoryRepository = {
  // Lấy tất cả danh mục
  findAll: async () => {
    return MedicineCategory.find()
      // .populate("medicine")
      // .populate("usageGroups")
      .exec();
  },

  // Lấy 1 danh mục theo id
  findById: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return MedicineCategory.findById(id)
      // .populate("medicine")
      // .populate("usageGroups")
      .exec();
  },

  // Tạo mới danh mục
  create: async (data: IMedicineCategory) => {
    return MedicineCategory.create(data);
  },

  // Cập nhật danh mục
  update: async (id: string, data: Partial<IMedicineCategory>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return MedicineCategory.findByIdAndUpdate(id, data, { new: true }).exec();
  },

  // Xóa danh mục
  delete: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return MedicineCategory.findByIdAndDelete(id).exec();
  },
};
