import { IStock } from "../../interface/inventory/stock.interface";
import ImportBatch from "../../model/inventory/import-batch.model";
import Stock from "../../model/inventory/stock.model";
import PurchaseOrder from "../../model/purchase-order.model";
import { addMonths, isBefore } from 'date-fns';

class StockRepository {
  async findAll(page:number, limit:number) {
    const skip = (page - 1) * limit;
    const totalItems = await Stock.countDocuments();
    const items = await Stock.find()
    .skip(skip)
    .limit(limit)
    .sort({createdAt: -1})
    .populate("medicine", "code name thumbnail dosageForm packaging")
    return {
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
      limit,
      data: items,
    }
  }
  async getLowStock() {
    return await Stock.find({ quantity: { $lte: 10 } }).populate("medicine", "code name thumbnail dosageForm packaging ");
  }
  async createStock(data: IStock) {
    // const purchaseOrder = PurchaseOrder.findById(data.purchaseOrder);
    // purchaseOrder.
    // const stock :IStock = {
    //     medicine: data.medicine,
    //     purchaseOrder: data.purchaseOrder,
    //     quantity: purchaseOrder.medic,
    return await Stock.create(data);
  }
  async createStocksFromPurchaseOrder(purchaseOrderId: any) {
    const order = await PurchaseOrder.findById(purchaseOrderId).lean();
    if (!order) throw new Error("Không tìm thấy đơn nhập");
    const currentDate = new Date();

  const stocks = await Promise.all(
    order.medicines.map(async (med) => {
      const basePrice = med.price;
      let sellingPrice = basePrice * 1.4; // +40% lợi nhuận

      // Tìm thông tin lô nhập của thuốc (giả định có trường importBatch)
      const importBatch = await ImportBatch.findOne({
        medicine: med.medicine_id,
        packaging: med.packaging,
      }).lean();

      if (importBatch && importBatch.expiryDate) {
        const expiryDate = new Date(importBatch.expiryDate);
        const thresholdDate = addMonths(currentDate, 3); // 3 tháng tới

        // Nếu thuốc sắp hết hạn thì giảm giá 20%
        if (isBefore(expiryDate, thresholdDate)) {
          sellingPrice *= 0.8;
        }
      }

      return new Stock({
        medicine: med.medicine_id,
        purchaseOrder: purchaseOrderId,
        quantity: med.quantity,
        packaging: med.packaging,
        sellingPrice: Math.round(sellingPrice), // làm tròn nếu cần
      }).save();
    })
  );

    // const stocks = await Promise.all(
    //   order.medicines.map((med) => {
    //     return new Stock({
    //       medicine: med.medicine_id,
    //       purchaseOrder: purchaseOrderId,
    //       quantity: med.quantity,
    //       packaging: med.packaging,
    //       sellingPrice: med.price,
    //     }).save();
    //   })
    // );
    // return stocks;
  }

  async updateStocksFromPurchaseOrder(purchaseOrderId: any) {
    const order = await PurchaseOrder.findById(purchaseOrderId).lean();
    if (!order) throw new Error("Không tìm thấy đơn nhập");
    for (const med of order.medicines) {
      const stock = await Stock.findOne({
        medicine: med.medicine_id,
        purchaseOrder: purchaseOrderId,
      });
      if (stock) {
        // Cập nhật số lượng và giá bán
        stock.quantity = med.quantity;
        stock.sellingPrice = med.price;
        await stock.save();
      } else {
        // Nếu không tìm thấy stock, tạo mới
        await new Stock({
          medicine: med.medicine_id,
          purchaseOrder: purchaseOrderId,
          quantity: med.quantity,
          // packaging: med.packaging,
          sellingPrice: med.price,
        }).save();
      }
    }
    return await Stock.find({ purchaseOrder: purchaseOrderId });
  }
  async deleteStock(id: string) {
    const stock = await Stock.findByIdAndDelete(id);
    return stock;
  }
  async findByMedicineId(medicineId: string) {
    const stock = await Stock.find({ medicine: medicineId })
    .populate({
      path:"medicine", 
      select:"code name thumbnail dosageForm packaging",
      populate: {
        path: "manufacturer_id",
        select: "nameCo"
      }
      });
    if (!stock) {
      throw new Error(`Stock not found for medicine ID: ${medicineId}`);
    }
    return stock;
  }
}
export default new StockRepository();
