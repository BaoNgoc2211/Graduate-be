import medicineRepository from "../../repository/medicine.repository";

import mongoose from "mongoose";

interface FilterParams {
  name?: string;
  categoryId?: string;
  // minPrice?: number;
  // maxPrice?: number;
  indications?: string;
}
class MedicineService {
  async getAllMedicines() {
    return await medicineRepository.findAll();
  }

  async getMedicineById(id: string) {
    return await medicineRepository.findById(id);
  }

  async getMedicineByName(name: string) {
    return await medicineRepository.findByName(name);
  }

  async createMedicine(medicine:any ) {
    return await medicineRepository.createMedicine(medicine);
  }

  async updateMedicine(id: string, updatedData:any ) {
    return await medicineRepository.updateMedicine(id, updatedData);
  }

  async deleteMedicine(id: string) {
    return await medicineRepository.deleteMedicine(new mongoose.Types.ObjectId(id));
  }

  async searchMedicince(params: FilterParams) {
    const { name, categoryId, indications } = params;
  
    const filters: any = {};
  
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }
  
    // if (categoryId) {
    //   if (mongoose.Types.ObjectId.isValid(categoryId)) {
    //     filters.categoryId = categoryId;
    //   } else {
    //     const error: any = new Error("Invalid categoryId format");
    //     error.statusCode = 400; // ⚠️ BẮT BUỘC PHẢI CÓ
    //     throw error;
    //   }
    // }
  
    if (indications) {
      filters.indications = { $regex: indications, $options: "i" };
    }
  
    // console.log("Searching with filters:", filters);
    return await medicineRepository.findMedicine(filters);
  }

  async searchMed(name:string)
  {
    return await medicineRepository.searchMedicine(name);
  }

}

export default new MedicineService();
