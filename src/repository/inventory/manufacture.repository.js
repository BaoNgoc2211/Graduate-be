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
const manufacturer_model_1 = __importDefault(require("../../model/inventory/manufacturer.model"));
class ManufactureRepository {
    findName(nameCo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacturer_model_1.default.findOne({ nameCo });
        });
    }
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield manufacturer_model_1.default.countDocuments();
            const items = yield manufacturer_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacturer_model_1.default.findById(id);
        });
    }
    create(manufacturer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacturer_model_1.default.create(manufacturer);
        });
    }
    update(id, manufacturer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacturer_model_1.default.findByIdAndUpdate(id, manufacturer, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacturer_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new ManufactureRepository();
