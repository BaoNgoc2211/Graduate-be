import Shipping from "../model/shipping.model";


class ShippingRepository {
  async getAll() {
    return Shipping.find();
  }

  async getById(id: string) {
    return Shipping.findById(id);
  }

  async create(shippingData: any) {
    const shipping = new Shipping(shippingData);
    return shipping.save();
  }

  async update(id: string, shippingData: any) {
    return Shipping.findByIdAndUpdate(id, shippingData, { new: true });
  }

  async delete(id: string) {
    return Shipping.findByIdAndDelete(id);
  }
}
export default new ShippingRepository;