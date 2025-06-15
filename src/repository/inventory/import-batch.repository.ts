import { IImportBatch } from "../../interface/inventory/import-batch.interface";
import ImportBatch from "../../model/inventory/import-batch.model";

class importBatchRepository {
  async findId(id: string) {
    return await ImportBatch.findById(id).populate(
      "medicine_id distributor_id"
    );
  }
  async findBatchNumber(batchNumber: string) {
    return await ImportBatch.find({ batchNumber: batchNumber });
  }

  async create(importBatch: IImportBatch) {
    return await ImportBatch.create(importBatch);
  }
  async findAll() {
    return await ImportBatch.find().populate("medicine_id distributor_id");
  }
  async updateStatus(id: string, status: string) {
    return await ImportBatch.findByIdAndUpdate(id, { status }, { new: true });
  }

  async delete(id: string) {
    return await ImportBatch.findByIdAndDelete(id);
  }
}
export default new importBatchRepository();
