import Distributor from "../../model/inventory/distributor.model";
import { IDistributor } from "../../interface/inventory/distributor.interface";
class DistributorRepository {
  async findName(nameCo: string) {
    return await Distributor.findOne({ nameCo });
  }
  async findAll() {
    return await Distributor.find();
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
