import { IManufacturer } from "../../interface/medicine/manufacturer.interface";
import manufactureRepository from "../../repository/medicine/manufacture.repository";
import throwError from "../../util/create-error";
class ManufacturerServices {
  private async checkNameCoExist(nameCo: string) {
    if (await manufactureRepository.findName(nameCo)) {
      throwError(409, "Manufacturer Corporation Name already exists");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await manufactureRepository.findId(id))) {
      throwError(404, "Manufacturer not found");
    }
  }
  async addManufacturer(manufacturer: IManufacturer) {
    await this.checkNameCoExist(manufacturer.nameCo);
    return await manufactureRepository.create(manufacturer);
  }
}
const manufacturerServices = new ManufacturerServices();
export default manufacturerServices;
