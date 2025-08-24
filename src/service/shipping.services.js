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
const shipping_repository_1 = __importDefault(require("../repository/shipping.repository"));
class ShippingService {
    // Add methods related to shipping here
    getAllShippingMethods() {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to get all shipping methods
            return yield shipping_repository_1.default.getAll();
        });
    }
    getShippingMethodById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to get a shipping method by ID
            return yield shipping_repository_1.default.getById(id);
        });
    }
    createShippingMethod(shippingData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to create a new shipping method
            return yield shipping_repository_1.default.create(shippingData);
        });
    }
    updateShippingMethod(id, shippingData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to update a shipping method
            return yield shipping_repository_1.default.update(id, shippingData);
        });
    }
    deleteShippingMethod(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Logic to delete a shipping method
            return yield shipping_repository_1.default.delete(id);
        });
    }
}
const shippingService = new ShippingService();
exports.default = shippingService;
