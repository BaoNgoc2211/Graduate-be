import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import disCategoryRepository from "../../repository/disease/disease-category.repository";
import throwError from "../../util/create-error";

class DisCategoryServices {
  private async checkNameExist(name: string) {
    if (await disCategoryRepository.findName(name)) {
      throwError(409, "Disease Category id already exists");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await disCategoryRepository.findId(id))) {
      throwError(404, " Disease Category name not found ");
    }
  }
  async getAll(page:number, limit:number) {
    return disCategoryRepository.findAll(page,limit);
  }

  async getById(id: string) {
    return disCategoryRepository.findById(id);
  }
  async create(name: string, icon: string) {
    await this.checkNameExist(name);
    return await disCategoryRepository.create(name, icon);
  }
  async delete(id: string) {
    await this.checkIdExist(id);
    return await disCategoryRepository.delete(id);
  }
  async update(id: string, disCategory: IDiseaseCategory) {
    return await disCategoryRepository.update(id, disCategory);
  }
}
const disCategoryService = new DisCategoryServices();
export default disCategoryService;
