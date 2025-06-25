import { IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import PurchaseOrder from "../../model/purchase-order.model";

class PurchaseOrderRepository {
    async findAll() {
        return await PurchaseOrder.find()
    }
    async findId(id: string) {
        return await PurchaseOrder.findById(id)
    }
    async create(purchaseOrder: IPurchaseOrder) {
        return await PurchaseOrder.create(purchaseOrder);
    }
    async update(id: string, purchaseOrder: IPurchaseOrder) {
        return await PurchaseOrder.findByIdAndUpdate(id, purchaseOrder, { new: true });
    }
    async delete(id: string) {
        return await PurchaseOrder.findByIdAndDelete(id);
    }
}
export default new PurchaseOrderRepository();