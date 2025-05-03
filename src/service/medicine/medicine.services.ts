import medicineRepository from "../../repository/medicine.repository";

import mongoose from "mongoose";

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
}

export default new MedicineService();
