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
const purchase_order_services_1 = __importDefault(require("../../service/order/purchase-order.services"));
const response_1 = require("../../util/response");
class PurchaseOrderController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield purchase_order_services_1.default.getAll();
            (0, response_1.returnRes)(res, 200, "Get All", result);
        }));
        this.getById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield purchase_order_services_1.default.getById(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Purchase Order By ID", result);
        }));
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield purchase_order_services_1.default.create(req.body);
            (0, response_1.returnRes)(res, 201, "Created", result);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield purchase_order_services_1.default.update(req.params.id, req.body);
            (0, response_1.returnRes)(res, 200, "Updated", result);
        }));
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield purchase_order_services_1.default.delete(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted Successfully");
        }));
    }
}
const purchaseOrderController = new PurchaseOrderController();
exports.default = purchaseOrderController;
