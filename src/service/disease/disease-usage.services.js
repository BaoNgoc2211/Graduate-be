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
const disease_usage_model_1 = __importDefault(require("../../model/disease/disease-usage.model"));
const disease_usage_repository_1 = __importDefault(require("../../repository/disease/disease-usage.repository "));
// import disUsageRepository from "../../repository/disease-usage.repository ";
// import disUsageRepository from "../../repository/disease-usage.repository";
const create_error_1 = __importDefault(require("../../util/create-error"));
class DiseaseUsageGroupServices {
    checkNameExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield disease_usage_repository_1.default.findName(name)) {
                (0, create_error_1.default)(409, "Disease Usage Group is already exist");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield disease_usage_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, "Disease Usage Group name not found");
            }
        });
    }
    create(name, icon) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameExist(name);
            return yield disease_usage_repository_1.default.create(name, icon);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield disease_usage_repository_1.default.delete(id);
        });
    }
    update(id, disUsage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield disease_usage_repository_1.default.update(id, disUsage);
        });
    }
    getAll(usageName) {
        return __awaiter(this, void 0, void 0, function* () {
            return usageName
                ? yield this.checkNameExist(usageName)
                : yield disease_usage_model_1.default.find();
        });
    }
}
const disUsageGroupService = new DiseaseUsageGroupServices();
exports.default = disUsageGroupService;
