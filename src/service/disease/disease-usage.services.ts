import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
import DiseaseUsageGroup from "../../model/disease/disease-usage.model";
import disUsageRepository from "../../repository/disease/disease-usage.repository ";
// import disUsageRepository from "../../repository/disease-usage.repository ";
// import disUsageRepository from "../../repository/disease-usage.repository";
import throwError from "../../util/create-error";

class DiseaseUsageGroupServices {
  private async checkNameExist(name: string) {
    if (await disUsageRepository.findName(name)) {
      throwError(409, "Disease Usage Group is already exist");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await disUsageRepository.findId(id))) {
      throwError(404, "Disease Usage Group name not found");
    }
  }
  async create(name: string, icon: string) {
    await this.checkNameExist(name);
    return await disUsageRepository.create(name, icon);
  }
  async delete(id: string) {
    await this.checkIdExist(id);
    return await disUsageRepository.delete(id);
  }
  async update(id: string, disUsage: IDiseaseUsageGroup) {
    return await disUsageRepository.update(id, disUsage);
  }
  async getAll(usageName?: string) {
    return usageName
      ? await this.checkNameExist(usageName)
      : await DiseaseUsageGroup.find();
  }

}
const disUsageGroupService = new DiseaseUsageGroupServices();
export default disUsageGroupService;
