import { IStock } from "../../interface/inventory/stock.interface";
import Stock from "../../model/inventory/stock.model";

class StockRepository{
    async findAll(){
        return await Stock.find();
    }
    async findById(id: string){
        const stock = await Stock.findOne({medicine: id})
        return stock;
    }
    async createStock(data:IStock){
        const stock = await Stock.create(data);
        return stock;
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