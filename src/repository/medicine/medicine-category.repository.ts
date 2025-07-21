import MedicineCategory from "../../model/medicine/medicine-category.model";
import { IMedicineCategory } from "../../interface/medicine/medicine-category.interface";
import mongoose from "mongoose";

class MedicineCategoryRepository {
  // Lấy tất cả danh mục
  async findAll(page:number, limit:number) {
    const skip = (page - 1) * limit;
    const totalItems = await MedicineCategory.countDocuments();
    const items = await MedicineCategory.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt : -1})
    .populate("medicine name")
    return {
      currentPage:page,
      totalPage: Math.ceil(totalItems/limit),
      totalItems,
      limit,
      data:items,
    }

  }

  async findById(id: string) {
    return await MedicineCategory.findById(id).populate("medicine").exec();
  }

  async createMedicineCate(data: IMedicineCategory) {
    return await MedicineCategory.create(data);
  }

  async updateMedicineCate(id: string, data: IMedicineCategory) {
    return await MedicineCategory.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  async deleteMedicineCate(id: string) {
    return await MedicineCategory.findByIdAndDelete(id).exec();
  }
  async updateMedCatetoMedicine(medCateId: mongoose.Types.ObjectId,medId: mongoose.Types.ObjectId) {
    return await MedicineCategory.findByIdAndUpdate(medCateId, {
      $push: { medicine: medId },
    });
  }

  

}
export default new MedicineCategoryRepository();
