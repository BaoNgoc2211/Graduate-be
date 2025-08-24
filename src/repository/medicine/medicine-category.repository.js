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
const medicine_category_model_1 = __importDefault(require("../../model/medicine/medicine-category.model"));
class MedicineCategoryRepository {
    // Lấy tất cả danh mục
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield medicine_category_model_1.default.countDocuments();
            const items = yield medicine_category_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("medicine name");
            return {
                currentPage: page,
                totalPage: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_category_model_1.default.findById(id).populate("medicine").exec();
        });
    }
    createMedicineCate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_category_model_1.default.create(data);
        });
    }
    updateMedicineCate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_category_model_1.default.findByIdAndUpdate(id, data, {
                new: true,
            }).exec();
        });
    }
    deleteMedicineCate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_category_model_1.default.findByIdAndDelete(id).exec();
        });
    }
    updateMedCatetoMedicine(medCateId, medId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_category_model_1.default.findByIdAndUpdate(medCateId, {
                $push: { medicine: medId },
            });
        });
    }
}
exports.default = new MedicineCategoryRepository();
