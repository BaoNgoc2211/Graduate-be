import { IStock } from "../../interface/inventory/stock.interface";
import Stock from "../../model/inventory/stock.model";
import PurchaseOrder from "../../model/purchase-order.model";

class StockRepository{
    async findAll(){
        return await Stock.find();
    }
    async findById(id: string){
        const stock = await Stock.findOne({medicine: id})
        return stock;
    }
    async createStock(data:IStock){
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
                sellingPrice: med.price,
            }).save();
            })
        );

        return stocks;
    }
   
    async updateStock(id:string, data:Partial<IStock>){
        const stock = await Stock.findByIdAndUpdate(id, data,{new:true});
        return stock;
    }
    async deleteStock(id:string){
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
export default new StockRepository;