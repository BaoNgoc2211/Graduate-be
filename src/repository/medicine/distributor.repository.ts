import Distributor from "../../model/medicine/distributor.model";
import { IDistributor } from "../../interface/medicine/distributor.interface";
class DistributorRepository {
  async findName(nameCo: string) {
    return await Distributor.findOne({ nameCo });
  }
  async findId(id: string) {
    return await Distributor.findById(id);
  }
  async create(distributor: IDistributor) {
    return await Distributor.create(distributor);
  }
}
export default new DistributorRepository();
