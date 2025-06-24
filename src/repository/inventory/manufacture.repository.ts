import Manufacturer from "../../model/inventory/manufacturer.model";
import { IManufacturer } from "../../interface/inventory/manufacturer.interface";
class ManufactureRepository {
  async findName(nameCo: string) {
    return await Manufacturer.findOne({ nameCo });
  }
  async getAll(){
    return await Manufacturer.find();
  }
  async findId(id: string) {
    return await Manufacturer.findById(id);
  }
  async create(manufacturer: IManufacturer) {
    return await Manufacturer.create(manufacturer);
  }
  async update(id: string, manufacturer: IManufacturer) {
    return await Manufacturer.findByIdAndUpdate(id, manufacturer, { new: true });
  }
  async delete(id: string) {
    return await Manufacturer.findByIdAndDelete(id);  
  }
}
export default new ManufactureRepository();
