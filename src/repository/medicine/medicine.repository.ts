import Medicine from "../../model/medicine/medicine.model";
import { IMedicine } from "../../interface/medicine/medicine.interface";
import {} from "../../enum/medicine/medicine.enum";
import mongoose, { FilterQuery } from "mongoose";
import medicineCategoryRepository from "./medicine-category.repository";

class medicineRepository {
  //list danh sach thuoc
  async findAll() {
    return await Medicine.find() // Lấy tất cả thuốc và thông tin kho liên quan;
    .populate({
      path: "stock_id",
      select: "sellingPrice quantity", 
    });
  }
  //  5 sản phẩm mới nhất trong vòng 30 ngày 
  async findCreateAddWithin30Days() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
    return await Medicine.find({
      createdAt: { $gte: thirtyDaysAgo }
    })
      .sort({ createdAt: -1 }) // mới nhất trước
      .limit(5); // chỉ lấy 5 sản phẩm
  }

  //list detail thuoc
  async findById(id: string) {
    return await Medicine.findById(id)
    .populate({
      path: "stock_id",
      select: "sellingPrice quantity", // Chỉ lấy price và quantity từ Stock  
    });;
  }
   async createMedicine(medicine: IMedicine) {
    const newMedicine = await Medicine.create(medicine);
    // for (const medicineCategoryId of medicine.medCategory_id) {
    //   await medicineCategoryRepository.updateMedCatetoMedicine(
    //     medicineCategoryId,
    //     newMedicine._id
    //   );
    // }
    return newMedicine;
  }

  async deleteMedicine(id: mongoose.Types.ObjectId) {
    return await Medicine.findByIdAndDelete(id);
  }

  async updateMedicine(id: string, updated: Partial<IMedicine>) {
    return await Medicine.findByIdAndUpdate(id, updated, { new: true });
  }

  async findByName(name: string) {
    return await Medicine.findOne({ name: name });
  }
 
  async getId(id: string) {
    return await Medicine.findById(id);
  }

  async searchMedicine(name: string) {
    return await Medicine.find({
      name: { $regex: name, $options: "i" }, // tìm không phân biệt hoa thường
    });
  }
  async findMedicine(filter: FilterQuery<any>) {
    return await Medicine.find(filter).populate("categoryId");
  }
}

export default new medicineRepository();
