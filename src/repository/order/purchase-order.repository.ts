import { IMedicineDetail, IPurchaseOrder } from "../../interface/order/purchase-order.interface";
import PurchaseOrder from "../../model/purchase-order.model";
import ImportBatch from "../../model/inventory/import-batch.model";
import Stock from "../../model/inventory/stock.model";
import stockRepository from "../inventory/stock.repository";
import Medicine from "../../model/medicine/medicine.model";

class PurchaseOrderRepository {
    async findAll() {
        return await PurchaseOrder.find()
    }
    async findId(id: string) {
        return await PurchaseOrder.findById(id)
    }
    
    async create(purchaseOrder: IPurchaseOrder) {
       let totalPrice = 0;
       const medicineDetails: IMedicineDetail[] = [];

        for (const medicine of purchaseOrder.medicines) {
            // Lấy thông tin batch nếu có
            let importPriceBatch = medicine.price;
            const batch = await ImportBatch.findById(medicine.batch_id);
            if (!importPriceBatch && medicine.batch_id) {
               
                if (!batch) {
                    throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
                }
                importPriceBatch = batch.importPrice;
                
            }
            
            if (!batch) {
                throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
            }
            const distributor = batch.distributor_id;

            const medicinePackaging = await Medicine.findById(medicine.medicine_id, 'packaging');
            if (!medicinePackaging) {
                throw new Error(`Không tìm thấy thông tin đóng gói cho thuốc với ID ${medicine.medicine_id}`);
            }

            const importPrice = importPriceBatch ;
            const packaging = medicinePackaging?.packaging
            const VAT = medicine.VAT_Rate || 0;
            const CK = medicine.CK_Rate || 0;
            const price =  Math.round(importPrice * (1 + VAT / 100 - CK / 100));
            
            const totalAmount = Math.round(price * medicine.quantity * (1 + VAT / 100 - CK / 100));

            totalPrice += totalAmount;
            medicineDetails.push({
                medicine_id: medicine.medicine_id,
                quantity: medicine.quantity,
                importPrice,
                packaging,
                VAT_Rate: VAT,
                CK_Rate: CK,
                price,
                totalAmount,
                batch_id: medicine.batch_id,
                distributor_id: distributor,
            });
           
        }
        const newOrder: IPurchaseOrder = {
            medicines: medicineDetails,
            date_in: new Date(),
            totalPrice,
            note: purchaseOrder.note || "",
        };
        const createdOrder = await PurchaseOrder.create(newOrder);

        await stockRepository.createStocksFromPurchaseOrder(createdOrder.id);
  

        return createdOrder;
    }
    
   async update(purchaseOrderId: string, updatedData: IPurchaseOrder) {
    
    let totalPrice = 0;
    const medicineDetails: IMedicineDetail[] = [];

    for (const medicine of updatedData.medicines) {
        // Lấy thông tin batch nếu có
        let importPriceBatch = medicine.price;
        if (!importPriceBatch && medicine.batch_id) {
            const batch = await ImportBatch.findById(medicine.batch_id);
            if (!batch) {
                throw new Error(`Không tìm thấy lô hàng với ID ${medicine.batch_id}`);
            }
            importPriceBatch = batch.importPrice;
        }
        const medicinePackaging = await Medicine.findById(medicine.medicine_id, 'packaging');
        if (!medicinePackaging) {
            throw new Error(`Không tìm thấy thông tin đóng gói cho thuốc với ID ${medicine.medicine_id}`);
        }

        const importPrice = importPriceBatch ;
        const packaging = medicinePackaging?.packaging
        const VAT = medicine.VAT_Rate || 0;
        const CK = medicine.CK_Rate || 0;
        const price =  importPrice * (1 + VAT / 100 - CK / 100);
        
        const totalAmount = price * medicine.quantity * (1 + VAT / 100 - CK / 100);

        totalPrice += totalAmount;

        medicineDetails.push({
            medicine_id: medicine.medicine_id,
            quantity: medicine.quantity,
            importPrice,
            packaging,
            VAT_Rate: VAT,
            CK_Rate: CK,
            price,
            totalAmount,
            batch_id: medicine.batch_id,
            distributor_id: medicine.distributor_id,
        });
        
    }
    // Cập nhật lại đơn nhập
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
        purchaseOrderId,
        {
            medicines: medicineDetails,
            totalPrice,
            note: updatedData.note || "",
        },
        { new: true }
    );

    if (!updatedOrder) {
        throw new Error("Không tìm thấy đơn nhập để cập nhật");
    }

    await stockRepository.updateStocksFromPurchaseOrder(purchaseOrderId);

    return updatedOrder;
}

    async delete(purchaseOrderId: string) {
        const existingOrder = await PurchaseOrder.findById(purchaseOrderId);
        if (!existingOrder) {
            throw new Error("Không tìm thấy đơn nhập để xóa");
        }
        const relatedStocks = await Stock.find({ purchaseOrder: purchaseOrderId }).lean();
        // Xóa tất cả các bản ghi trong kho liên quan đến đơn nhập này
        await Stock.deleteMany({ purchaseOrder: purchaseOrderId });

        // Xóa đơn nhập kho
        await PurchaseOrder.findByIdAndDelete(purchaseOrderId);

        const totalQuantityDeleted = relatedStocks.reduce((sum, stock) => sum + stock.quantity, 0);
        return {
            deletedPurchaseOrderId: purchaseOrderId,
        deletedStocks: relatedStocks.map((s) => ({
            medicine_id: s.medicine,
            quantity: s.quantity,
            sellingPrice: s.sellingPrice
        })),
        totalQuantityDeleted,
        deletedAt: new Date()
        };
    }
}
export default new PurchaseOrderRepository();
