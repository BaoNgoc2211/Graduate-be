import { IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import purchaseOrderRepository from "../../repository/order/purchase-order.repository";

class PurchaseOrderServices {
  //#region getAll
  async getAll() {
    return await purchaseOrderRepository.findAll();
  }
  async getById(id: string) {
    return await purchaseOrderRepository.findId(id);
  }
  async create(purchaseOrder: IPurchaseOrder) {
    return await purchaseOrderRepository.create(purchaseOrder);
  }
  async update(id: string, purchaseOrder: IPurchaseOrder) {
    return await purchaseOrderRepository.update(id, purchaseOrder);
  }
  async delete(id: string) {
    return await purchaseOrderRepository.delete(id);
  }
}
const purchaseOrderServices = new PurchaseOrderServices();
export default purchaseOrderServices;