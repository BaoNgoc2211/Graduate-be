import mongoose from "mongoose";
import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
import DisUsageGroup from "../../model/disease/disease-usage.model";
import DiseaseUsageGroup from "../../model/disease/disease-usage.model";

class DisUsageGroupRepository {
  async findName(name: string) {
    return await DisUsageGroup.findOne({ name });
  }
  async findAll(page:number, limit:number){
    const skip = (page - 1) * limit;
    const totalItems = await DisUsageGroup.countDocuments();
    const items = await DisUsageGroup.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt : -1})
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }
  async findId(id: string) {
    return await DisUsageGroup.findById(id);
  }
  async create(name: string, icon: string) {
    return await DisUsageGroup.create({ name, icon });
  }
  async update(id: string, disUsage: IDiseaseUsageGroup) {
    return await DisUsageGroup.findByIdAndUpdate(id, disUsage, { new: true });
  }
  async delete(id: string) {
    return await DisUsageGroup.findByIdAndDelete(id);
  }
  async updateUsageToDisease(
    idUsageDisease:mongoose.Types.ObjectId,
    idDisease:mongoose.Types.ObjectId){
    return await DiseaseUsageGroup.findByIdAndUpdate(idUsageDisease,{
       $push: {disease: idDisease },    
    });
  }
}
export default new DisUsageGroupRepository();
