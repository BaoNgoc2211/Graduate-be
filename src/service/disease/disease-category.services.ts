import { IDiseaseCategory } from "../../interface/disease/disease-category.interface";
import diseaseCategoryRepository from "../../repository/disease-category.reposite";
// import disCategoryRepository from "../../repository/disease-category.repository";
import throwError from "../../util/create-error";

class DisCategoryServices {
  private async checkNameExist(name: string) {
    if (await diseaseCategoryRepository.findName(name)) {
      throwError(409, "Disease Category id already exists");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await diseaseCategoryRepository.findId(id))) {
      throwError(404, " Disease Category name not found ");
    }
  }
  async addDisCategory(name: string, icon: string) {
    await this.checkNameExist(name);
    return await diseaseCategoryRepository.create(name, icon);
  }
  async deleteDisCategory(id: string) {
    await this.checkIdExist(id);
    return await diseaseCategoryRepository.remove(id);
  }
  async editDisCategory(id: string, disCategory: IDiseaseCategory) {
    return await diseaseCategoryRepository.edit(id, disCategory);
  }
}
const disCategoryService = new DisCategoryServices();
export default disCategoryService;
