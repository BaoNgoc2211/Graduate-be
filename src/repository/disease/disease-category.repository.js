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
const disease_category_model_1 = __importDefault(require("../../model/disease/disease-category.model"));
class DisCategoryRepository {
    findName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findOne({ name });
        });
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findById(id);
        });
    }
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield disease_category_model_1.default.countDocuments();
            const items = yield disease_category_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("disease");
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findById(id).populate("disease").exec();
        });
    }
    create(name, icon) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.create({ name, icon });
        });
    }
    update(id, disCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findByIdAndUpdate(id, disCategory, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findByIdAndDelete(id);
        });
    }
    updateDiseaseToCategory(diseaseCategoryId, diseaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_model_1.default.findByIdAndUpdate(diseaseCategoryId, {
                $push: { disease: diseaseId },
            });
        });
    }
}
const disCategoryRepository = new DisCategoryRepository();
exports.default = disCategoryRepository;
