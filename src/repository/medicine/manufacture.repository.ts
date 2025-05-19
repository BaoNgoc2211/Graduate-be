import Manufacturer from "../../model/medicine/manufacturer.model";
import { IManufacturer } from "../../interface/medicine/manufacturer.interface";
class ManufactureRepository {
  async findName(nameCo: string) {
    return await Manufacturer.findOne({ nameCo });
  }
  async findId(id: string) {
    return await Manufacturer.findById(id);
  }
  async create(manufacturer: IManufacturer) {
    return await Manufacturer.create(manufacturer);
  }
}

export default new ManufactureRepository();
