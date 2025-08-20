
import DisCategory from "../../model/disease/disease-category.model";
import mongoose from "mongoose";
import Symptom from "../../model/disease/symptom.model";
import { ISymptom } from "../../interface/disease/symptom.interface";

class SymptomRepository {
  async findName(name: string) {
    return await Symptom.findOne({ name });
  }
  async findId(id: string) {
    return await Symptom.findById(id);
  }

  async create(symptom: ISymptom) {
    return await Symptom.create( symptom );
  }
  async update(id: string, symptom: ISymptom) {
    return await Symptom.findByIdAndUpdate(id, symptom, {
      new: true,
    });
  }
  async delete(id: string) {
    return await Symptom.findByIdAndDelete(id);
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
const symptomRepository = new SymptomRepository();
export default symptomRepository;
