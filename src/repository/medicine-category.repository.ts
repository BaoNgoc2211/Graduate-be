import MedicineCategory from "../model/medicine/medicine-category.model";
import { IMedicineCategory } from "../interface/medicine/medicine-category.interface";
import mongoose from "mongoose";

class MedicineCategoryRepository {
  // Lấy tất cả danh mục
  async findAll(){
    return await MedicineCategory.find()
      // .populate("medicine")
      // .populate("usageGroups")
      .exec();
  }

  async findById(id: string){
    return await MedicineCategory.findById(id);
  }

  async createMedicineCate(data: IMedicineCategory){
    return await MedicineCategory.create(data);
  }

  async updateMedicineCate(id:string, data:IMedicineCategory)
  {
    return await MedicineCategory.findByIdAndUpdate(id,data,{new:true}).exec();
  }
  
  async deleteMedicineCate(id:string)
  {
    return await MedicineCategory.findByIdAndDelete(id).exec();
  }
  async updateMedCatetoMedicine(medCateId:mongoose.Types.ObjectId,medId:mongoose.Types.ObjectId )
  {
    return await MedicineCategory.findByIdAndUpdate(medCateId,{
      $push:{medicineId:medId}
    })
  }
}
export default new MedicineCategoryRepository();
