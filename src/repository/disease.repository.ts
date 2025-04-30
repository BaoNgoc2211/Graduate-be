import { IDisease } from "../interface/disease/disease.interface";
import Disease from "../model/disease/disease.model";
import diseaseCategoryRepository from "./disease-category.reposite";
import mongoose from "mongoose";

class DiseaseRepository {
  async findId(id: string) {
    return await Disease.findById(id);
  }
  async findName(name: string) {
    return await Disease.findOne({ name: name });
  }
  async add(disease: IDisease) {
    const newDisease = await Disease.create(disease);
    for (const diseaseCategoryId of disease.diseaseCategory) {
      await diseaseCategoryRepository.updateDiseaseToCategory(
        diseaseCategoryId,
        newDisease._id
      );
    }
    return newDisease;
  }
  async remove(id: mongoose.Types.ObjectId) {
    return await Disease.findByIdAndDelete(id);
  }

  async edit(id: string, product: IDisease) {
    return await Disease.findByIdAndUpdate(id, product);
  }

  async getProduct() {
    return await Disease.find();
  }
}
export default new DiseaseRepository();
