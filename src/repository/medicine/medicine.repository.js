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
const medicine_model_1 = __importDefault(require("../../model/medicine/medicine.model"));
const medicine_category_repository_1 = __importDefault(require("./medicine-category.repository"));
const medicine_usage_repository_1 = __importDefault(require("./medicine-usage.repository"));
class medicineRepository {
    //list danh sach thuoc
    findMedicineAdmin(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield medicine_model_1.default.countDocuments();
            const items = yield medicine_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .select("_id code name thumbnail dosageForm ")
                .populate({
                path: "stock_id",
                select: "sellingPrice quantity",
            })
                .populate({
                path: "manufacturer_id",
                select: "nameCo",
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
    findMedicneUser(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield medicine_model_1.default.countDocuments();
            const items = yield medicine_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .select("name thumbnail")
                .populate({
                path: "stock_id",
                select: "sellingPrice quantity",
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
    //  5 sản phẩm mới nhất trong vòng 30 ngày 
    findCreateAddWithin30Days() {
        return __awaiter(this, void 0, void 0, function* () {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return yield medicine_model_1.default.find({
                createdAt: { $gte: thirtyDaysAgo }
            })
                .sort({ createdAt: -1 }) // mới nhất trước
                .limit(5); // chỉ lấy 5 sản phẩm
        });
    }
    //list detail thuoc
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_model_1.default.findById(id)
                .populate({
                path: "stock_id",
                select: "sellingPrice quantity", // Chỉ lấy price và quantity từ Stock  
            }).populate({
                path: "manufacturer_id",
                select: "nameCo country",
            }).populate({
                path: "medCategory_id",
                select: "name", // Chỉ lấy name và description từ MedicineCategory
            })
                .populate({
                path: "medUsage_id",
                select: "name"
            });
        });
    }
    createMedicine(medicine) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!medicine.code) {
                const count = yield medicine_model_1.default.countDocuments();
                const nextCode = `MED${(count + 1).toString().padStart(3, "0")}`;
                medicine.code = nextCode;
            }
            const newMedicine = yield medicine_model_1.default.create(medicine);
            for (const medicineCategoryId of medicine.medCategory_id) {
                yield medicine_category_repository_1.default.updateMedCatetoMedicine(medicineCategoryId, newMedicine._id);
            }
            for (const medicineUsageId of medicine.medUsage_id) {
                yield medicine_usage_repository_1.default.UsageToMedicine(medicineUsageId, newMedicine._id);
            }
            return newMedicine;
        });
    }
    deleteMedicine(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_model_1.default.findByIdAndDelete(id);
        });
    }
    updateMedicine(id, updated) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_model_1.default.findByIdAndUpdate(id, updated, { new: true });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_model_1.default.findOne({ name: name });
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_model_1.default.findById(id);
        });
    }
    searchMedicine(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyword = (name !== null && name !== void 0 ? name : "").trim();
            // if (!keyword) {
            //   return {
            //     currentPage: page,
            //     totalPages: 0,
            //     totalItems: 0,
            //     limit,
            //     data: [],
            //   };
            // }
            const skip = (page - 1) * limit;
            // Tìm tổng số document khớp keyword
            const totalItems = yield medicine_model_1.default.countDocuments({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { indication: { $regex: keyword, $options: "i" } }
                ]
            });
            // Query có phân trang
            const items = yield medicine_model_1.default.find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { indication: { $regex: keyword, $options: "i" } }
                ]
            })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
                .select("name thumbnail")
                .populate({
                path: "stock_id",
                select: "sellingPrice quantity",
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
}
exports.default = new medicineRepository();
