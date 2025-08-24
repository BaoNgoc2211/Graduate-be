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
const medicine_usage_repository_1 = __importDefault(require("../../repository/medicine/medicine-usage.repository"));
// import disUsageRepository from "../../repository/disease-usage.repository ";
// import disUsageRepository from "../../repository/disease-usage.repository";
const create_error_1 = __importDefault(require("../../util/create-error"));
class MedicineUsageGroupServices {
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_usage_repository_1.default.getAll(page, limit);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_usage_repository_1.default.getById(id);
        });
    }
    checkNameExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield medicine_usage_repository_1.default.findName(name)) {
                (0, create_error_1.default)(409, "Medicine Usage Group is already exist");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield medicine_usage_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, "Medicine Usage Group name not found");
            }
        });
    }
    add(name, icon) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameExist(name);
            return yield medicine_usage_repository_1.default.create(name, icon);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield medicine_usage_repository_1.default.remove(id);
        });
    }
    edit(id, medUsage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield medicine_usage_repository_1.default.edit(id, medUsage);
        });
    }
}
const medUsageService = new MedicineUsageGroupServices();
exports.default = medUsageService;
