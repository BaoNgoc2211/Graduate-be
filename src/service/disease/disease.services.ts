import mongoose from "mongoose";
import { IDisease } from "../../interface/disease/disease.interface";
import diseaseRepository from "../../repository/disease/disease.repository";
import throwError from "../../util/create-error";

class DiseaseServices {
  private async checkExistName(name: string) {
    if (await diseaseRepository.findName(name)) {
      throwError(409, "Disease name is already exist");
    }
  }
  async createDisease(disease: IDisease) {
    await this.checkExistName(disease.name);
    return await diseaseRepository.add(disease);
  }
  async editDisease(id: string, disease: IDisease) {
    return await diseaseRepository.edit(id, disease);
  }
  async deleteDisease(id: mongoose.Types.ObjectId) {
    return await diseaseRepository.remove(id);
  }
  async getDisease(
    name: string,
    symptom: string,
    stages: string,
    causes: string,
    riskGroup: string,
    diagnosis: string,
    prevention: string,
    image: string,
    notes: string,
    severityLevel: string,
    treatmentPlan: string,
    diseaseUsageGroup: string,
    diseaseCategory: string,
    page: number,
    size: number
  ) {
    // const builder = new DiseaseQueryBuilder().setNa
  }
}
const diseaseServices = new DiseaseServices();
export default diseaseServices;
