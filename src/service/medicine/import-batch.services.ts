import { StatusEnum } from "../../enum/medicine/import-batch.enum";
import { IImportBatch } from "../../interface/medicine/import-batch.interface";
import importBatchRepository from "../../repository/medicine/import-batch.repository";
import throwError from "../../util/create-error";

class ImportBatchServices {
  // private async checkIdExist(id: string) {
  //   if (!(await importBatchRepository.findId(id))) {
  //     throwError(404, "Import Batch not found");
  //   }
  // }

  async addImportBatch(importBatch: IImportBatch) {
    if (importBatch.quantity <= 0) {
      throwError(400, "Quantity must be greater than 0");
    }
    return await importBatchRepository.create(importBatch);
  }

  // async getImportBatch(id: string) {
  //   await this.checkIdExist(id);
  //   return await importBatchRepository.findId(id);
  // }

  // async updateImportBatchStatus(id: string, status: string) {
  //   await this.checkIdExist(id);
  //   if (!Object.values(StatusEnum).includes(status as StatusEnum)) {
  //     throwError(400, "Invalid status value");
  //   }
  //   return await importBatchRepository.updateStatus(id, status);
  // }

  // async deleteImportBatch(id: string) {
  //   await this.checkIdExist(id);
  //   return await importBatchRepository.delete(id);
  // }

  // async getAllImportBatches() {
  //   return await importBatchRepository.findAll();
  // }

  // async getBatchesByMedicine(medicineId: string) {
  //   return await importBatchRepository.findByMedicine(medicineId);
  // }
}

const importBatchServices = new ImportBatchServices();
export default importBatchServices;