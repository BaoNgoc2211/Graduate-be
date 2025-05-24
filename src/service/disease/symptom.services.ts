import { ISymptom } from "../../interface/disease/symptom.interface";
import symptomRepository from "../../repository/disease/symptom.repository";
import throwError from "../../util/create-error";

class SymptomServices {
  private async checkNameExist(name: string) {
    if (await symptomRepository.findName(name)) {
      throwError(409, "Symptom is already exist");
    }
  }
  private async checkIdExist(id: string) {
    if (!(await symptomRepository.findId(id))) {
      throwError(404, "Symptom name not found");
    }
  }
  async create(symptom: ISymptom) {
    await this.checkNameExist(symptom.name);
    return await symptomRepository.create(symptom);
  }
  async delete(id: string) {
    await this.checkIdExist(id);
    return await symptomRepository.delete(id);
  }
  async update(id: string, symptom: ISymptom) {
    return await symptomRepository.update(id, symptom);
  }
}
const symptomService = new SymptomServices();
export default symptomService;
