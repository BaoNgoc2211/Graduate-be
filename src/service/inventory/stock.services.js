"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stock_repository_1 = __importDefault(require("../../repository/inventory/stock.repository"));
class StockService {
    getAllStock(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_repository_1.default.findAll(page, limit);
        });
    }
    getLowStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_repository_1.default.getLowStock();
        });
    }
    getStockByMedicineId(medicineId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_repository_1.default.findByMedicineId(medicineId);
        });
    }
    createStock(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_repository_1.default.createStock(data);
        });
    }
    // async updateStock(id: string, data: Partial<IStock>) {
    //   return await stockRepository.updateStock(id, data);
    // }
    deleteStock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stock_repository_1.default.deleteStock(id);
        });
    }
}
exports.default = new StockService();
