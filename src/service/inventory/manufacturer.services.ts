import { IManufacturer } from "../../interface/inventory/manufacturer.interface";
import manufactureRepository from "../../repository/inventory/manufacture.repository";
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
  async getManufacturerById(id: string) {
    await this.checkIdExist(id);
    return await manufactureRepository.findId(id);
  }
  async addManufacturer(manufacturer: IManufacturer) {
    await this.checkNameCoExist(manufacturer.nameCo);
    return await manufactureRepository.create(manufacturer);
  }
  async getAllManufacturers(page:number, limit:number) {
    return await manufactureRepository.getAll(page, limit);
  }
  async updateManufacturer(id: string, manufacturer: IManufacturer) {
    return await manufactureRepository.update(id, manufacturer);
  }
  async deleteManufacturer(id: string) {
    return await manufactureRepository.delete(id);
  }
} 
const manufacturerServices = new ManufacturerServices();
export default manufacturerServices;
