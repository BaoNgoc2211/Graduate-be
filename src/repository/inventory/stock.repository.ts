import e from "cors";
import { IStock } from "../../interface/inventory/stock.interface";
import Stock from "../../model/inventory/stock.model";
import PurchaseOrder from "../../model/purchase-order.model";

class StockRepository {
  async findAll() {
    return await Stock.find();
  }
//   async getLowStock() {
//     const stock = await Stock.find();
//     const lowStock = stock.filter((item) => item.quantity <= 10);
//     return lowStock;
//   }
  async getLowStock() {
    return await Stock.find({ quantity: { $lte: 10 } });
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

    const stocks = await Promise.all(
      order.medicines.map((med) => {
        return new Stock({
          medicine: med.medicine_id,
          purchaseOrder: purchaseOrderId,
          quantity: med.quantity,
          packaging: med.packaging,
          sellingPrice: med.price,
        }).save();
      })
    );
    return stocks;
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
          packaging: med.packaging,
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
    const stock = await Stock.find({ medicine: medicineId });
    if (!stock) {
      throw new Error(`Stock not found for medicine ID: ${medicineId}`);
    }
    return stock;
  }
}
export default new StockRepository();
