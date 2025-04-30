import { MedicineCategoryRepository } from "../../repository/medicine-category.repository";

export class MedicineCategoryService {
  static async getAll() {
    return MedicineCategoryRepository.findAll();
  }

  static async getById(id: string) {
    return MedicineCategoryRepository.findById(id);
  }

  static async create(data: any) {
    return MedicineCategoryRepository.create(data);
  }

  static async update(id: string, data: any) {
    return MedicineCategoryRepository.update(id, data);
  }

  static async delete(id: string) {
    return MedicineCategoryRepository.delete(id);
  }
}
