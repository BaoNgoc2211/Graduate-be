import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
import DisUsageGroup from "../../model/disease/disease-usage.model";

class DisUsageGroupRepository {
  async findName(name: string) {
    return await DisUsageGroup.findOne({ name });
  }
  async findId(id: string) {
    return await DisUsageGroup.findById(id);
  }
  async create(name: string, icon: string) {
    return await DisUsageGroup.create({ name, icon });
  }
  async remove(id: string) {
    return await DisUsageGroup.findByIdAndDelete(id);
  }
  async edit(id: string, disUsage: IDiseaseUsageGroup) {
    return await DisUsageGroup.findByIdAndUpdate(id, disUsage, { new: true });
  }
}
export default new DisUsageGroupRepository();
