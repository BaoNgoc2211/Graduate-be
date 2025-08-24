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
const symptom_model_1 = __importDefault(require("../../model/disease/symptom.model"));
class SymptomRepository {
    findName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_model_1.default.findOne({ name });
        });
    }
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_model_1.default.findById(id);
        });
    }
    create(symptom) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_model_1.default.create(symptom);
        });
    }
    update(id, symptom) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_model_1.default.findByIdAndUpdate(id, symptom, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_model_1.default.findByIdAndDelete(id);
        });
    }
    getAll(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            return categoryName
                ? yield this.findName(categoryName)
                : yield disease_category_model_1.default.find();
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
const symptomRepository = new SymptomRepository();
exports.default = symptomRepository;
