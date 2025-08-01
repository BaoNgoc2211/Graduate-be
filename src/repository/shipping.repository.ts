import { IShipping } from "../interface/shipping.interface";
import Shipping from "../model/shipping.model";
class ShippingRepository {
  async getAll() {
    return Shipping.find();
  }

  async getById(id: string) {
    return Shipping.findById(id);
  }

  async create(shippingData: IShipping) {
    const shipping = new Shipping(shippingData);
    return shipping.save();
  }

  async update(id: string, shippingData: IShipping) {
    return Shipping.findByIdAndUpdate(id, shippingData, { new: true });
  }

  async delete(id: string) {
    return Shipping.findByIdAndDelete(id);
  }
}
export default new ShippingRepository;