import { IDistributor } from "../../interface/inventory/distributor.interface";
import distributorRepository from "../../repository/inventory/distributor.repository";
import throwError from "../../util/create-error";
class DistributorServices {
  private async checkNameCoExist(nameCo: string) {
    if (await distributorRepository.findName(nameCo)) {
      throwError(409, "Distributor Corporation Name already exists");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await distributorRepository.findId(id))) {
      throwError(404, "Distributor not found");
    }
  }
  async getAllDistributors() {
    return await distributorRepository.findAll();
  }
  async addDistributor(distributor: IDistributor) {
    await this.checkNameCoExist(distributor.nameCo);
    return await distributorRepository.create(distributor);
  }
  async updateDistributor(id: string, distributor: IDistributor) {
    await this.checkIdExist(id);
    return await distributorRepository.update(id, distributor);
  }
  async deleteDistributor(id: string) {
    return await distributorRepository.delete(id);
  }
}
const distributorServices = new DistributorServices();
export default distributorServices;

