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
const shipping_model_1 = __importDefault(require("../model/shipping.model"));
class ShippingRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return shipping_model_1.default.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return shipping_model_1.default.findById(id);
        });
    }
    create(shippingData) {
        return __awaiter(this, void 0, void 0, function* () {
            const shipping = new shipping_model_1.default(shippingData);
            return shipping.save();
        });
    }
    update(id, shippingData) {
        return __awaiter(this, void 0, void 0, function* () {
            return shipping_model_1.default.findByIdAndUpdate(id, shippingData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return shipping_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new ShippingRepository;
