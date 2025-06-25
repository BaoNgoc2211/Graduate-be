import { IPurchaseOrderDetail } from "../../interface/order/purchase-order-detail.interface";
import { IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import PurchaseDetailOrder from "../../model/purchase-order-detail.model";

class PurchaseOrderDetailRepository {
    async findAll() {
        return await PurchaseDetailOrder.find()
    }
    async findId(id: string) {
        return await PurchaseDetailOrder.findById(id)
    }
    async create(purchaseDetailOrder: IPurchaseOrderDetail) {
        return await PurchaseDetailOrder.create(purchaseDetailOrder);
    }
    async update(id: string, purchaseDetailOrder: IPurchaseOrderDetail) {   
        return await PurchaseDetailOrder.findByIdAndUpdate(id, purchaseDetailOrder, { new: true });
    }
    async delete(id: string) {
        return await PurchaseDetailOrder.findByIdAndDelete(id);
    }
}
export default new PurchaseOrderDetailRepository();