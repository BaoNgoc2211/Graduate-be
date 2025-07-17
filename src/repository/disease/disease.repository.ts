import { IDisease } from "../../interface/disease/disease.interface";
import Disease from "../../model/disease/disease.model";
import mongoose from "mongoose";
import disCategoryRepository from "./disease-category.repository";
import diseaseUsageRepository from "./disease-usage.repository ";

class DiseaseRepository {
  async findId(id: string) {
    return await Disease.findById(id)
    .populate({
      path:"symptomIds",
      select:"name"
    })
    .populate({
      path:"diseaseCategoryIds",
      select:"name"
    })
    .populate({
      path:"diseaseUsageGroupIds",
      select:"name"
    });
  }
  async findName(name: string) {
    return await Disease.findOne({ name });
  }
  async create(disease: IDisease) {
    const newDisease = await Disease.create(disease);
    for (const categoryId of disease.diseaseCategoryIds) {
      await disCategoryRepository.updateDiseaseToCategory(categoryId,newDisease._id);
    }
    for (const usageId of disease.diseaseUsageGroupIds){
      await diseaseUsageRepository.updateUsageToDisease(usageId,newDisease._id);
    }
    return newDisease;
  }
  async update(id: string, disease: IDisease) {
    return await Disease.findByIdAndUpdate(id, disease, { new: true });
  }
  async delete(id: mongoose.Types.ObjectId) {
    return await Disease.findByIdAndDelete(id);
  }
  async findAll(page = 1, limit = 10) {
    const skip = (page - 1 ) * limit;
    const totalItems = await Disease.countDocuments();
    const items = await Disease.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      data: items,
    }
  }
  async getProduct() {
    return await Disease.find();
  }
}
export default new DiseaseRepository();
