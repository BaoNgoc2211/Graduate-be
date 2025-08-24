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
const manufacture_repository_1 = __importDefault(require("../../repository/inventory/manufacture.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class ManufacturerServices {
    checkNameCoExist(nameCo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield manufacture_repository_1.default.findName(nameCo)) {
                (0, create_error_1.default)(409, "Manufacturer Corporation Name already exists");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield manufacture_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, "Manufacturer not found");
            }
        });
    }
    getManufacturerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield manufacture_repository_1.default.findId(id);
        });
    }
    addManufacturer(manufacturer) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameCoExist(manufacturer.nameCo);
            return yield manufacture_repository_1.default.create(manufacturer);
        });
    }
    getAllManufacturers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacture_repository_1.default.getAll(page, limit);
        });
    }
    updateManufacturer(id, manufacturer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacture_repository_1.default.update(id, manufacturer);
        });
    }
    deleteManufacturer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield manufacture_repository_1.default.delete(id);
        });
    }
}
const manufacturerServices = new ManufacturerServices();
exports.default = manufacturerServices;
