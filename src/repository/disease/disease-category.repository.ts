import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import DisCategory from "../../model/disease/disease-category.model";
import mongoose from "mongoose";

class DisCategoryRepository {
  async findName(name: string) {
    return await DisCategory.findOne({ name });
  }
  async findId(id: string) {
    return await DisCategory.findById(id);
  }
  async findAll() {
    return await DisCategory.find().populate("disease").exec();
  }

  async findById(id: string) {
    return await DisCategory.findById(id).populate("disease").exec();
  }
  async create(name: string, icon: string) {
    return await DisCategory.create({ name, icon });
  }
  async update(id: string, disCategory: IDiseaseCategory) {
    return await DisCategory.findByIdAndUpdate(id, disCategory, {
      new: true,
    });
  }
  async delete(id: string) {
    return await DisCategory.findByIdAndDelete(id);
  }

  async updateDiseaseToCategory(
    diseaseCategoryId: mongoose.Types.ObjectId,
    diseaseId: mongoose.Types.ObjectId
  ) {
    return await DisCategory.findByIdAndUpdate(diseaseCategoryId, {
      $push: { disease: diseaseId },
    });
  }
}
const disCategoryRepository = new DisCategoryRepository();
export default disCategoryRepository;
