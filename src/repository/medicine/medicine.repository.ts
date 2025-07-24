import Medicine from "../../model/medicine/medicine.model";
import { IMedicine } from "../../interface/medicine/medicine.interface";
import {} from "../../enum/medicine/medicine.enum";
import mongoose, { FilterQuery } from "mongoose";
import medicineCategoryRepository from "./medicine-category.repository";
import medUsageRepository from "./medicine-usage.repository";


class medicineRepository {
  //list danh sach thuoc

  async findMedicineAdmin(page:number, limit:number) {
    const skip = (page - 1 ) * limit;
    const totalItems = await Medicine.countDocuments();
    const items = await Medicine.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select("_id code name thumbnail dosageForm ")
    .populate({
      path: "stock_id",
      select: "sellingPrice quantity", 
    })
    .populate({
      path: "manufacturer_id",
      select: "nameCo", 
    });
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }
  async findMedicneUser(page:number, limit:number)
  {
    const skip = (page - 1) * limit;
    const totalItems = await Medicine.countDocuments();
    const items = await Medicine.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .select("name thumbnail")
    .populate({
      path: "stock_id",
      select: "sellingPrice quantity", 
    })
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
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
    }).populate({
      path: "manufacturer_id",
      select: "nameCo country", 
    });

  }
   async createMedicine(medicine: IMedicine) {
    if (!medicine.code) {
      const count = await Medicine.countDocuments();
      const nextCode = `MED${(count + 1).toString().padStart(3, "0")}`;
      medicine.code = nextCode;
    }
    const newMedicine = await Medicine.create(medicine);
    for (const medicineCategoryId of medicine.medCategory_id) {
      await medicineCategoryRepository.updateMedCatetoMedicine(
        medicineCategoryId,
        newMedicine._id
      );
    }
    for (const medicineUsageId of medicine.medUsage_id) {
      await medUsageRepository.UsageToMedicine(
        medicineUsageId,
        newMedicine._id
      );
    }
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
