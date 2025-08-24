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
const disease_model_1 = __importDefault(require("../../model/disease/disease.model"));
const disease_category_repository_1 = __importDefault(require("./disease-category.repository"));
const disease_usage_repository_1 = __importDefault(require("./disease-usage.repository "));
class DiseaseRepository {
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findById(id)
                .populate({
                path: "symptomIds",
                select: "name"
            })
                .populate({
                path: "diseaseCategoryIds",
                select: "name"
            })
                .populate({
                path: "diseaseUsageGroupIds",
                select: "name"
            });
        });
    }
    findName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findOne({ name });
        });
    }
    // Tìm bệnh theo tên khác (nameDiff)
    findByNameDiff(nameDiff) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findOne({ nameDiff });
        });
    }
    // Tìm bệnh theo tên có chứa từ khóa
    findByNameContains(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findOne({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { nameDiff: { $regex: keyword, $options: 'i' } }
                ]
            });
        });
    }
    // Tìm bệnh theo symptom ID
    findBySymptomId(symptomId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.find({
                symptomIds: symptomId
            }).populate({
                path: "symptomIds",
                select: "name"
            }).populate({
                path: "diseaseCategoryIds",
                select: "name"
            }).populate({
                path: "diseaseUsageGroupIds",
                select: "name"
            });
        });
    }
    // Tìm bệnh theo nhiều symptom IDs
    findBySymptomIds(symptomIds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.find({
                symptomIds: { $in: symptomIds }
            }).populate({
                path: "symptomIds",
                select: "name"
            }).populate({
                path: "diseaseCategoryIds",
                select: "name"
            }).populate({
                path: "diseaseUsageGroupIds",
                select: "name"
            });
        });
    }
    // Tìm kiếm bệnh theo từ khóa
    searchDiseases(keyword_1) {
        return __awaiter(this, arguments, void 0, function* (keyword, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const totalItems = yield disease_model_1.default.countDocuments({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { nameDiff: { $regex: keyword, $options: 'i' } },
                    { common: { $regex: keyword, $options: 'i' } }
                ]
            });
            const items = yield disease_model_1.default.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { nameDiff: { $regex: keyword, $options: 'i' } },
                    { common: { $regex: keyword, $options: 'i' } }
                ]
            })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate({
                path: "symptomIds",
                select: "name"
            })
                .populate({
                path: "diseaseCategoryIds",
                select: "name"
            })
                .populate({
                path: "diseaseUsageGroupIds",
                select: "name"
            });
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    create(disease) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDisease = yield disease_model_1.default.create(disease);
            for (const categoryId of disease.diseaseCategoryIds) {
                yield disease_category_repository_1.default.updateDiseaseToCategory(categoryId, newDisease._id);
            }
            for (const usageId of disease.diseaseUsageGroupIds) {
                yield disease_usage_repository_1.default.updateUsageToDisease(usageId, newDisease._id);
            }
            return newDisease;
        });
    }
    update(id, disease) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findByIdAndUpdate(id, disease, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.findByIdAndDelete(id);
        });
    }
    findAll() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            const totalItems = yield disease_model_1.default.countDocuments();
            const items = yield disease_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate({
                path: "symptomIds",
                select: "name"
            })
                .populate({
                path: "diseaseCategoryIds",
                select: "name"
            })
                .populate({
                path: "diseaseUsageGroupIds",
                select: "name"
            })
                .populate({
                path: "symptomIds",
                select: "name"
            });
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_model_1.default.find();
        });
    }
}
exports.default = new DiseaseRepository();
