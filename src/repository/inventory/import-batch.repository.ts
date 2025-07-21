import { IImportBatch } from "../../interface/inventory/import-batch.interface";
import ImportBatch from "../../model/inventory/import-batch.model";

class importBatchRepository {
  async findId(id: string) {
    return await ImportBatch.findById(id).populate("medicine_id", "code name");
    // ).populate("distributor_id", "name code");
  }
  async findBatchNumber(batchNumber: string) {
    return await ImportBatch.find({ batchNumber: batchNumber });
  }

  async create(importBatch: IImportBatch) {
    return await ImportBatch.create(importBatch);
  }
  async findAll(page:number,limit:number) {
    // .populate("medicine_id","code name")
    const skip = (page - 1) * limit;
    const totalItems = await ImportBatch.countDocuments();
    const items = await ImportBatch.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt : -1})
    .populate("distributor_id", "nameCo");
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }

  async update(id: string, importBatch: IImportBatch) {
    return await ImportBatch.findByIdAndUpdate(id, importBatch, { new: true });
  }

  async updateStatus(id: string, status: string) {
    return await ImportBatch.findByIdAndUpdate(id, { status }, { new: true });
  }

  async delete(id: string) {
    return await ImportBatch.findByIdAndDelete(id);
  }
}
export default new importBatchRepository();
