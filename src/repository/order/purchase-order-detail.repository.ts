import { IMedicineDetail, IPurchaseOrderDetail } from "../../interface/order/purchase-order-detail.interface";
import { IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import ImportBatch from "../../model/inventory/import-batch.model";
import PurchaseDetailOrder from "../../model/purchase-order-detail.model";

class PurchaseOrderDetailRepository {
    async findAll() {
        return await PurchaseDetailOrder.find()
    }
    async findId(id: string) {
        return await PurchaseDetailOrder.findById(id)
    }

    async create(purchaseDetailOrder: IPurchaseOrderDetail) {
       let totalAmount = 0;
       const medicineDetails: IMedicineDetail[] = [];

        for (const medicine of purchaseDetailOrder.medicines) {
            // Lấy thông tin batch nếu có
            let importPrice = medicine.price;
            if (!importPrice && medicine.batch_id) {
                const batch = await ImportBatch.findById(medicine.batch_id);
                if (!batch) {
                    throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
                }
                importPrice = batch.importPrice;
            }

            const price = importPrice || 0;
            const VAT = medicine.VAT_Rate || 0;
            const CK = medicine.CK_Rate || 0;
            const totalPrice = price * medicine.quantity * (1 + VAT / 100 - CK / 100);

            totalAmount += totalPrice;

            medicineDetails.push({
                code: medicine.code,
                quantity: medicine.quantity,
                price,
                VAT_Rate: VAT,
                CK_Rate: CK,
                totalPrice,
                batch_id: medicine.batch_id
            });
           
        }
        const newOrder: IPurchaseOrderDetail = {
            medicines: medicineDetails,
            date_in: new Date(),
            totalAmount,
            note: purchaseDetailOrder.note || "",
        };
        return await PurchaseDetailOrder.create(newOrder);
    }
    async update(id: string, purchaseDetailOrder: IPurchaseOrderDetail) {   
        return await PurchaseDetailOrder.findByIdAndUpdate(id, purchaseDetailOrder, { new: true });
    }
    async delete(id: string) {
        return await PurchaseDetailOrder.findByIdAndDelete(id);
    }
}
export default new PurchaseOrderDetailRepository();