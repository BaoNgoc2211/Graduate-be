import { IImportBatch } from "../../interface/medicine/import-batch.interface";
import ImportBatch from "../../model/medicine/import-batch.model";

class importBatchRepository {
  async findId(id: string) {
    return await ImportBatch.findById(id).populate(
      "medicine_id distributor_id"
    );
  }
  async findByMedicine(medicineId: string) {
    return await ImportBatch.find({ medicine_id: medicineId });
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
