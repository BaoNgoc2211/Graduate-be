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

  async create(name: string, icon: string) {
    return await DisCategory.create({ name, icon });
  }
  async remove(id: string) {
    return await DisCategory.findByIdAndDelete(id);
  }

  async edit(id: string, disCategory: IDiseaseCategory) {
    return await DisCategory.findByIdAndUpdate(id, disCategory, {
      new: true,
    });
  }
  async getAll(categoryName?: string) {
    return categoryName
      ? await this.findName(categoryName)
      : await DisCategory.find();
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
export default new DisCategoryRepository();
