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
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const disease_usage_services_1 = __importDefault(require("../../service/disease/disease-usage.services"));
const response_1 = require("../../util/response");
class DisUsageGroupController {
    constructor() {
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, icon } = req.body;
            const data = yield disease_usage_services_1.default.create(name, icon);
            (0, response_1.returnRes)(res, 201, "Add Disease Usage Group successful", data);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield disease_usage_services_1.default.update(id, req.body);
            (0, response_1.returnRes)(res, 200, "Edit disease usage group successful", data);
        }));
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield disease_usage_services_1.default.delete(id);
            (0, response_1.returnRes)(res, 200, "Delete disease usage group successful", data);
        }));
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { usageName } = req.query;
            const data = yield disease_usage_services_1.default.getAll(usageName);
            (0, response_1.returnRes)(res, 200, "Get disease usage group successful", data);
        }));
    }
}
const disUsageGroupController = new DisUsageGroupController();
exports.default = disUsageGroupController;
