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
const distributor_repository_1 = __importDefault(require("../../repository/inventory/distributor.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class DistributorServices {
    constructor() {
        this.getDistributorById = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield distributor_repository_1.default.findId(id);
        });
    }
    checkNameCoExist(nameCo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield distributor_repository_1.default.findName(nameCo)) {
                (0, create_error_1.default)(409, "Distributor Corporation Name already exists");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield distributor_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, "Distributor not found");
            }
        });
    }
    getAllDistributors(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield distributor_repository_1.default.findAll(page, limit);
        });
    }
    addDistributor(distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameCoExist(distributor.nameCo);
            return yield distributor_repository_1.default.create(distributor);
        });
    }
    updateDistributor(id, distributor) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield distributor_repository_1.default.update(id, distributor);
        });
    }
    deleteDistributor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield distributor_repository_1.default.delete(id);
        });
    }
}
const distributorServices = new DistributorServices();
exports.default = distributorServices;
