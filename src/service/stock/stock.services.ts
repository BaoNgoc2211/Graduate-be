import { IStock } from "../../interface/order/stock.interface";
import stockRepository from "../../repository/stock/stock.repository";

class StockService {
  async getAllStock() {
    return await stockRepository.findAll();
  }
  async getById(id: string) {
    return await stockRepository.findById(id);
  }
  async createStock(data: IStock) {
    return await stockRepository.createStock(data);
  }
  async updateStock(id: string, data: Partial<IStock>) {
    return await stockRepository.updateStock(id, data);
  }
  async deleteStock(id: string) {
    return await stockRepository.deleteStock(id);
  }
}
export default new StockService();
