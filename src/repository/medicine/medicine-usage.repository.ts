import mongoose from "mongoose";
import { IMedicineUsageGroup } from "../../interface/medicine/medicine-usage.interface";
import MedicineUsageGroup from "../../model/medicine/medicine-usage.model";


class MedGroupRepository {
  async getAll(page:number, limit:number) {
    const skip = (page - 1) * limit;
    const totalItems = await MedicineUsageGroup.countDocuments();
    const items = await MedicineUsageGroup.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt:-1})

    return {
      currentPage:page,
      totalPage : Math.ceil(totalItems/limit),
      totalItems,
      limit,
      data:items,
    }
  }
  async getById(id: string) {
    return await MedicineUsageGroup.findById(id);
  }
  async findName(name: string) {
    return await MedicineUsageGroup.findOne({ name });
  }
  async findId(id: string) {
    return await MedicineUsageGroup.findById(id);
  }
  async create(name: string, icon: string) {
    return await MedicineUsageGroup.create({ name, icon });
  }
  async remove(id: string) {
    return await MedicineUsageGroup.findByIdAndDelete(id);
  }
  async edit(id: string, medUsage: IMedicineUsageGroup) {
    return await MedicineUsageGroup.findByIdAndUpdate(id, medUsage, {
      new: true,
    });
  }
  async UsageToMedicine(medUsage: mongoose.Types.ObjectId,medId: mongoose.Types.ObjectId) {
    return await MedicineUsageGroup.findByIdAndUpdate(medUsage, {
      $push: { medicine: medId },
    });
  }
}
const medUsageRepository = new MedGroupRepository();
export default medUsageRepository
