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
const medicine_repository_1 = __importDefault(require("../../repository/medicine/medicine.repository"));
const mongoose_1 = __importDefault(require("mongoose"));
// interface FilterParams {
//   name?: string;
//   categoryId?: string;
//   // minPrice?: number;
//   // maxPrice?: number;
//   indications?: string;
// }
class MedicineService {
    getMedicineUser(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.findMedicneUser(page, limit);
        });
    }
    getMedicineAdmin(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.findMedicineAdmin(page, limit);
        });
    }
    getMedByCreatedDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.findCreateAddWithin30Days();
        });
    }
    getMedicineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.findById(id);
        });
    }
    getMedicineByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.findByName(name);
        });
    }
    createMedicine(medicine) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.createMedicine(medicine);
        });
    }
    updateMedicine(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.updateMedicine(id, updatedData);
        });
    }
    deleteMedicine(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.deleteMedicine(new mongoose_1.default.Types.ObjectId(id));
        });
    }
    getId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.getId(id);
        });
    }
    // async searchMedicince(params: FilterParams) {
    //   const { name, categoryId, indications } = params;
    //   const filters: any = {};
    //   if (name) {
    //     filters.name = { $regex: name, $options: "i" };
    //   }
    //   // if (categoryId) {
    //   //   if (mongoose.Types.ObjectId.isValid(categoryId)) {
    //   //     filters.categoryId = categoryId;
    //   //   } else {
    //   //     const error: any = new Error("Invalid categoryId format");
    //   //     error.statusCode = 400; // ⚠️ BẮT BUỘC PHẢI CÓ
    //   //     throw error;
    //   //   }
    //   // }
    //   if (indications) {
    //     filters.indications = { $regex: indications, $options: "i" };
    //   }
    //   // console.log("Searching with filters:", filters);
    //   return await medicineRepository.findMedicine(filters);
    // }
    searchMed(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_repository_1.default.searchMedicine(name, page, limit);
        });
    }
}
exports.default = new MedicineService();
