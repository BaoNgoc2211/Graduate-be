import { StatusEnum } from "../../enum/medicine/import-batch.enum";
import { IImportBatch } from "../../interface/inventory/import-batch.interface";
import importBatchRepository from "../../repository/inventory/import-batch.repository";
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
  async getImportBatchById(id: string) {
    return await importBatchRepository.findId(id);
  }
  async getAllImportBatches() {
    return await importBatchRepository.findAll();
  }

  async updateImportBatch(id: string, importBatch: IImportBatch) {
    return await importBatchRepository.update(id, importBatch);
  }

  async updateImportBatchStatus(id: string, status: StatusEnum) {
    // if (!Object.values(StatusEnum).includes(status)) {
    //   throwError(400, "Invalid status value");
    // }
    return await importBatchRepository.updateStatus(id, status);
  }
  
  async deleteImportBatch(id: string) {
    return await importBatchRepository.delete(id); 
  }
}

const importBatchServices = new ImportBatchServices();
export default importBatchServices;