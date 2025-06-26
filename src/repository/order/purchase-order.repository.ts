import { IMedicineDetail, IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import PurchaseOrder from "../../model/purchase-order.model";
import ImportBatch from "../../model/inventory/import-batch.model";

class PurchaseOrderRepository {
    async findAll() {
        return await PurchaseOrder.find()
    }
    async findId(id: string) {
        return await PurchaseOrder.findById(id)
    }
    async create(purchaseOrder: IPurchaseOrder) {
       let totalAmount = 0;
       const medicineDetails: IMedicineDetail[] = [];

        for (const medicine of purchaseOrder.medicines) {
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
                medicine_id: medicine.medicine_id,
                quantity: medicine.quantity,
                price,
                VAT_Rate: VAT,
                CK_Rate: CK,
                totalPrice,
                batch_id: medicine.batch_id
            });
           
        }
        const newOrder: IPurchaseOrder = {
            medicines: medicineDetails,
            date_in: new Date(),
            totalAmount,
            note: purchaseOrder.note || "",
        };
        return await PurchaseOrder.create(newOrder);
    }
    async update(id: string, purchaseOrder: IPurchaseOrder) {
        return await PurchaseOrder.findByIdAndUpdate(id, purchaseOrder, { new: true });
    }
    async delete(id: string) {
        return await PurchaseOrder.findByIdAndDelete(id);
    }
}
export default new PurchaseOrderRepository();
