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
exports.MedicineCategoryService = void 0;
const medicine_category_repository_1 = __importDefault(require("../../repository/medicine/medicine-category.repository"));
class MedicineCategoryService {
    static getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicine_category_repository_1.default.findAll(page, limit);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicine_category_repository_1.default.findById(id);
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicine_category_repository_1.default.createMedicineCate(data);
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicine_category_repository_1.default.updateMedicineCate(id, data);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return medicine_category_repository_1.default.deleteMedicineCate(id);
        });
    }
}
exports.MedicineCategoryService = MedicineCategoryService;
