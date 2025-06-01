import { IStock } from "../../interface/order/stock.interface";
import Stock from "../../model/order/stock.model";

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
}
export default new StockRepository;