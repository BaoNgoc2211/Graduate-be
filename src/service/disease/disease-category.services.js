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
const disease_category_repository_1 = __importDefault(require("../../repository/disease/disease-category.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class DisCategoryServices {
    checkNameExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield disease_category_repository_1.default.findName(name)) {
                (0, create_error_1.default)(409, "Disease Category id already exists");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield disease_category_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, " Disease Category name not found ");
            }
        });
    }
    getAll(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return disease_category_repository_1.default.findAll(page, limit);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return disease_category_repository_1.default.findById(id);
        });
    }
    create(name, icon) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameExist(name);
            return yield disease_category_repository_1.default.create(name, icon);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield disease_category_repository_1.default.delete(id);
        });
    }
    update(id, disCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_category_repository_1.default.update(id, disCategory);
        });
    }
}
const disCategoryService = new DisCategoryServices();
exports.default = disCategoryService;
