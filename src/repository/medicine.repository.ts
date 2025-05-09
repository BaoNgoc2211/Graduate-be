import Medicine from "../model/medicine/medicine.model";
import { IMedicine } from "../interface/medicine/medicine.interface";
import { MainDosageEnum,DetailedDosageFormEnum } from "../enum/medicine/medicine.enum";
import mongoose,{FilterQuery} from "mongoose";
import medicineCategoryRepository from "./medicine-category.repository";

class MedicineRepository
{
  async findById(id: string) {
      return await Medicine.findById(id)
    }
  
    async findByName(name: string) {
      return await Medicine.findOne({ name: name });
    }
  
    async createMedicine(medicine: IMedicine) {
      const newMedicine = await Medicine.create(medicine);
      for (const medicineCategoryId of medicine.categoryId)
      {
          await medicineCategoryRepository.updateMedCatetoMedicine(
            medicineCategoryId,
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
  
    async findAll() {
      return await Medicine.find();
    }

    async searchMedicine(name:string)
    {
      return await Medicine.find({
        name: { $regex: name, $options: 'i' } // tìm không phân biệt hoa thường
      });
    }
    async findMedicine(filter: FilterQuery<any>){
      return await Medicine.find(filter).populate("categoryId");
    }
}

export default new MedicineRepository();