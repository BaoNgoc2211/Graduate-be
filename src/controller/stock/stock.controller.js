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
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const stock_services_1 = __importDefault(require("../../service/inventory/stock.services"));
const response_1 = require("../../util/response");
class StockController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = yield stock_services_1.default.getAllStock(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All", result);
        }));
        this.getLowStock = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield stock_services_1.default.getLowStock();
            (0, response_1.returnRes)(res, 200, "Get Low Stock", result);
        }));
        this.getStockByMedicineId = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield stock_services_1.default.getStockByMedicineId(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Stock By Medicine ID", result);
        }));
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield stock_services_1.default.createStock(req.body);
            (0, response_1.returnRes)(res, 201, "Created", result);
        }));
        // update = asyncError(async (req: Request, res: Response) => {
        //   const result = await stockServices.updateStock(req.params.id, req.body);
        //   returnRes(res, 200, "Updated", result!);
        // });
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield stock_services_1.default.deleteStock(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted", result);
        }));
    }
}
exports.default = new StockController();
