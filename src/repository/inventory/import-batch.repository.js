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
const import_batch_model_1 = __importDefault(require("../../model/inventory/import-batch.model"));
class importBatchRepository {
    findId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.findById(id).populate("medicine_id", "code name");
            // ).populate("distributor_id", "name code");
        });
    }
    findBatchNumber(batchNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.find({ batchNumber: batchNumber });
        });
    }
    create(importBatch) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.create(importBatch);
        });
    }
    findAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // .populate("medicine_id","code name")
            const skip = (page - 1) * limit;
            const totalItems = yield import_batch_model_1.default.countDocuments();
            const items = yield import_batch_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("distributor_id", "nameCo");
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    update(id, importBatch) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.findByIdAndUpdate(id, importBatch, { new: true });
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield import_batch_model_1.default.findByIdAndDelete(id);
        });
    }
}
exports.default = new importBatchRepository();
