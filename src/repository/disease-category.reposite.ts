import DiseaseCategory from "model/disease/disease-category.model";
import mongoose from "mongoose";

class DiseaseCategoryRepository {
  async findName(name: string) {
    return await DiseaseCategory.findOne({ name });
  }
  async findId(id: string) {
    return await DiseaseCategory.findById(id);
  }

  async create(name: string) {
    return await DiseaseCategory.create({ name });
  }
  async remove(id: string) {
    return await DiseaseCategory.findByIdAndDelete(id);
  }

  async edit(id: string, newName: string) {
    return await DiseaseCategory.findByIdAndUpdate(id, { name: newName });
  }
  async getAll(categoryName?: string) {
    return categoryName
      ? await this.findName(categoryName)
      : await DiseaseCategory.find();
  }

  async updateDiseaseToCategory(
    diseaseCategoryId: mongoose.Types.ObjectId,
    diseaseId: mongoose.Types.ObjectId
  ) {
    return await DiseaseCategory.findByIdAndUpdate(diseaseCategoryId, {
      $push: { disease: diseaseId },
    });
  }
}
export default new DiseaseCategoryRepository();
