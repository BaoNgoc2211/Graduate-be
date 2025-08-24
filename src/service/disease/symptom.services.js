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
const symptom_repository_1 = __importDefault(require("../../repository/disease/symptom.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class SymptomServices {
    checkNameExist(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield symptom_repository_1.default.findName(name)) {
                (0, create_error_1.default)(409, "Symptom is already exist");
            }
        });
    }
    checkIdExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield symptom_repository_1.default.findId(id))) {
                (0, create_error_1.default)(404, "Symptom name not found");
            }
        });
    }
    create(symptom) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkNameExist(symptom.name);
            return yield symptom_repository_1.default.create(symptom);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIdExist(id);
            return yield symptom_repository_1.default.delete(id);
        });
    }
    update(id, symptom) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield symptom_repository_1.default.update(id, symptom);
        });
    }
}
const symptomService = new SymptomServices();
exports.default = symptomService;
