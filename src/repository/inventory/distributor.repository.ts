import Distributor from "../../model/inventory/distributor.model";
import { IDistributor } from "../../interface/inventory/distributor.interface";
class DistributorRepository {
  async findName(nameCo: string) {
    return await Distributor.findOne({ nameCo });
  }
  async findAll(page:number, limit:number) {
    const skip = (page - 1) * limit;
    const totalItems = await Distributor.countDocuments();
    const items = await Distributor.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt : -1})
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }
  async findId(id: string) {
    return await Distributor.findById(id);
  }
  async create(distributor: IDistributor) {
    return await Distributor.create(distributor);
  }
  async update(id: string, distributor: IDistributor) {
    return await Distributor.findByIdAndUpdate(id, distributor, { new: true });
  }
  async delete(id: string) {
    return await Distributor.findByIdAndDelete(id);
  }
}
export default new DistributorRepository();
