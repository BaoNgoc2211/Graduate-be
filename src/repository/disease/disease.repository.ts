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
  
  // Tìm bệnh theo tên khác (nameDiff)
  async findByNameDiff(nameDiff: string) {
    return await Disease.findOne({ nameDiff });
  }
  
  // Tìm bệnh theo tên có chứa từ khóa
  async findByNameContains(keyword: string) {
    return await Disease.findOne({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { nameDiff: { $regex: keyword, $options: 'i' } }
      ]
    });
  }
  
  // Tìm bệnh theo symptom ID
  async findBySymptomId(symptomId: mongoose.Types.ObjectId) {
    return await Disease.find({
      symptomIds: symptomId
    }).populate({
      path: "symptomIds",
      select: "name"
    }).populate({
      path: "diseaseCategoryIds",
      select: "name"
    }).populate({
      path: "diseaseUsageGroupIds",
      select: "name"
    });
  }
  
  // Tìm bệnh theo nhiều symptom IDs
  async findBySymptomIds(symptomIds: mongoose.Types.ObjectId[]) {
    return await Disease.find({
      symptomIds: { $in: symptomIds }
    }).populate({
      path: "symptomIds",
      select: "name"
    }).populate({
      path: "diseaseCategoryIds",
      select: "name"
    }).populate({
      path: "diseaseUsageGroupIds",
      select: "name"
    });
  }
  
  // Tìm kiếm bệnh theo từ khóa
  async searchDiseases(keyword: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const totalItems = await Disease.countDocuments({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { nameDiff: { $regex: keyword, $options: 'i' } },
        { common: { $regex: keyword, $options: 'i' } }
      ]
    });
    
    const items = await Disease.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { nameDiff: { $regex: keyword, $options: 'i' } },
        { common: { $regex: keyword, $options: 'i' } }
      ]
    })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate({
      path: "symptomIds",
      select: "name"
    })
    .populate({
      path: "diseaseCategoryIds",
      select: "name"
    })
    .populate({
      path: "diseaseUsageGroupIds",
      select: "name"
    });
    
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    };
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
    .sort({ createdAt: -1 })
    .populate({
      path: "symptomIds",
      select: "name"
    })
    .populate({
      path: "diseaseCategoryIds",
      select: "name"
    })
    .populate({
      path: "diseaseUsageGroupIds",
      select: "name"
    })
    .populate({
      path:"symptomIds",
      select:"name"
    });
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }
  async getProduct() {
    return await Disease.find();
  }
}
export default new DiseaseRepository();
