import medicineCategoryRepository from "../../repository/medicine/medicine-category.repository";
export class MedicineCategoryService {
  static async getAll(page:number, limit:number) {
    return medicineCategoryRepository.findAll(page,limit);
  }

  static async getById(id: string) {
    return medicineCategoryRepository.findById(id);
  }

  static async create(data: any) {
    return medicineCategoryRepository.createMedicineCate(data);
  }

  static async update(id: string, data: any) {
    return medicineCategoryRepository.updateMedicineCate(id, data);
  }

  static async delete(id: string) {
    return medicineCategoryRepository.deleteMedicineCate(id);
  }
}
