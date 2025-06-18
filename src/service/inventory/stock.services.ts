import { IStock } from "../../interface/inventory/stock.interface";
import stockRepository from "../../repository/inventory/stock.repository";

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
  async getStockByMedicineId(medicineId: string) {
    return await stockRepository.findByMedicineId(medicineId);
  }

}
export default new StockService();
