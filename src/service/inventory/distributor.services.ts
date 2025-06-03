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
  async addDistributor(distributor: IDistributor) {
    await this.checkNameCoExist(distributor.nameCo);
    return await distributorRepository.create(distributor);
  }
}
const distributorServices = new DistributorServices();
export default distributorServices;

