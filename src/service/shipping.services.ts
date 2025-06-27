import shippingRepository from "../repository/shipping.repository";

class ShippingService {
  // Add methods related to shipping here
    async getAllShippingMethods() {
        // Logic to get all shipping methods
        return await shippingRepository.getAll();
    }
    async getShippingMethodById(id: string) {
        // Logic to get a shipping method by ID
        return await shippingRepository.getById(id);
    }
    async createShippingMethod(shippingData: any) {
        // Logic to create a new shipping method
        return await shippingRepository.create(shippingData);
    }
    async updateShippingMethod(id: string, shippingData: any) {
        // Logic to update a shipping method
        return await shippingRepository.update(id, shippingData);
    }
    async deleteShippingMethod(id: string) {
        // Logic to delete a shipping method
        return await shippingRepository.delete(id);
    }

}
const shippingService = new ShippingService();
export default shippingService;