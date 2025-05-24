import mongoose from "mongoose";
import { IDisease } from "../../interface/disease/disease.interface";
import diseaseRepository from "../../repository/disease/disease.repository";
import throwError from "../../util/create-error";

class DiseaseServices {
  // private async checkExistName(name: string, ) {
  //   if (await diseaseRepository.findName(name)) {
  //     throwError(409, "Disease name is already exist");
  //   }
  // }
  private async checkExistName(name: string, ignoreId?: string) {
    const existing = await diseaseRepository.findName(name);
    if (existing && existing._id.toString() !== ignoreId) {
      throwError(409, "Disease name already exists");
    }
  }
  async create(disease: IDisease) {
    await this.checkExistName(disease.name);
    return await diseaseRepository.create(disease);
  }
  async update(id: string, disease: IDisease) {
    await this.checkExistName(disease.name, id);
    return await diseaseRepository.update(id, disease);
  }
  async delete(id: mongoose.Types.ObjectId) {
    return await diseaseRepository.delete(id);
  }
  // async getAllDisease(disease: IDisease) {
  //   return await diseaseRepository.findAll();
  //   // const builder = new DiseaseQueryBuilder().setNa
  // }
}
const diseaseServices = new DiseaseServices();
export default diseaseServices;
