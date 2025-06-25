import { IPurchaseOrderDetail } from "../../interface/order/purchase-order-detail.interface";
import purchaseOrderDetailRepository from "../../repository/order/purchase-order-detail.repository";

class PurchaseOrderDetailServices {
    async getAll() {
        return await purchaseOrderDetailRepository.findAll();
    }
    async getById(id: string) {
        return await purchaseOrderDetailRepository.findId(id); 
    }
    async create(purchaseOrderDetail: IPurchaseOrderDetail) {
        return await purchaseOrderDetailRepository.create(purchaseOrderDetail);
    }
    async update(id: string, purchaseOrderDetail: IPurchaseOrderDetail) {   
        return await purchaseOrderDetailRepository.update(id, purchaseOrderDetail);
    }
    async delete(id: string) {
        return await purchaseOrderDetailRepository.delete(id);
    }
}
const purchaseOrderDetailServices = new PurchaseOrderDetailServices();
export default purchaseOrderDetailServices;