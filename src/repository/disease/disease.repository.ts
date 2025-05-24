import { IDisease } from "../../interface/disease/disease.interface";
import Disease from "../../model/disease/disease.model";
import mongoose from "mongoose";
import disCategoryRepository from "./disease-category.repository";

class DiseaseRepository {
  async findId(id: string) {
    return await Disease.findById(id);
  }
  async findName(name: string) {
    return await Disease.findOne({ name });
  }
  async create(disease: IDisease) {
    const newDisease = await Disease.create(disease);
    for (const categoryId of disease.symptomIds) {
      await disCategoryRepository.updateDiseaseToCategory(
        categoryId,
        newDisease._id
      );
    }
    return newDisease;
  }
  async update(id: string, disease: IDisease) {
    return await Disease.findByIdAndUpdate(id, disease, { new: true });
  }
  async delete(id: mongoose.Types.ObjectId) {
    return await Disease.findByIdAndDelete(id);
  }
  async findAll() {
    return await Disease.find();
  }
  async getProduct() {
    return await Disease.find();
  }
}
export default new DiseaseRepository();
