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
const disease_repository_1 = __importDefault(require("../../repository/disease/disease.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class DiseaseServices {
    // private async checkExistName(name: string, ) {
    //   if (await diseaseRepository.findName(name)) {
    //     throwError(409, "Disease name is already exist");
    //   }
    // }
    checkExistName(name, ignoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield disease_repository_1.default.findName(name);
            if (existing && existing._id.toString() !== ignoreId) {
                (0, create_error_1.default)(409, "Disease name already exists");
            }
        });
    }
    checkCode(code, ignoreId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield disease_repository_1.default.findName(code);
            if (existing && existing._id.toString() !== ignoreId) {
                (0, create_error_1.default)(409, "Disease code already exists");
            }
        });
    }
    create(disease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkExistName(disease.code);
            yield this.checkExistName(disease.name);
            return yield disease_repository_1.default.create(disease);
        });
    }
    update(id, disease) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkExistName(disease.name, id);
            return yield disease_repository_1.default.update(id, disease);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_repository_1.default.delete(id);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_repository_1.default.findId(id);
        });
    }
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_repository_1.default.findAll(page, limit);
        });
    }
}
const diseaseServices = new DiseaseServices();
exports.default = diseaseServices;
