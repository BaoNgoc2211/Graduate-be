import { IDiseaseUsageGroup } from "../../interface/disease/disease-usage.interface";
import { IMedicineUsageGroup } from "../../interface/medicine/medicine-usage.interface";
import disUsageRepository from "../../repository/disease/disease-usage.repository ";
import medUsageRepository from "../../repository/medicine/medicine-usage.repository";
// import disUsageRepository from "../../repository/disease-usage.repository ";
// import disUsageRepository from "../../repository/disease-usage.repository";
import throwError from "../../util/create-error";

class MedicineUsageGroupServices {
  async getAll(page:number, limit:number) {
    return await medUsageRepository.getAll(page, limit);
  }
  async getById(id: string) {
    return await medUsageRepository.getById(id);
  }
  private async checkNameExist(name: string) {
    if (await medUsageRepository.findName(name)) {
      throwError(409, "Medicine Usage Group is already exist");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await medUsageRepository.findId(id))) {
      throwError(404, "Medicine Usage Group name not found");
    }
  }
  async add(name: string, icon: string) {
    await this.checkNameExist(name);
    return await medUsageRepository.create(name, icon);
  }
  async remove(id: string) {
    await this.checkIdExist(id);
    return await medUsageRepository.remove(id);
  }
  async edit(id: string, medUsage: IMedicineUsageGroup) {
    return await medUsageRepository.edit(id, medUsage);
  }
}
const medUsageService = new MedicineUsageGroupServices();
export default medUsageService;
