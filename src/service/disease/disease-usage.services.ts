import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
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
  async addDiseaseUsageGroup(name: string, icon: string) {
    await this.checkNameExist(name);
    return await disUsageRepository.create(name, icon);
  }
  async removeDiseaseUsageGroup(id: string) {
    await this.checkIdExist(id);
    return await disUsageRepository.remove(id);
  }
  async editDiseaseUsageGroup(id: string, disUsage: IDiseaseUsageGroup) {
    return await disUsageRepository.edit(id, disUsage);
  }
}
const disUsageGroupService = new DiseaseUsageGroupServices();
export default disUsageGroupService;
