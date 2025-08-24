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
const medicine_usage_services_1 = __importDefault(require("../../service/medicine/medicine-usage.services"));
const response_1 = require("../../util/response");
class MedUsageGroupController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const usage = yield medicine_usage_services_1.default.getAll(page, limit);
            (0, response_1.returnRes)(res, 200, "GetAll", usage);
        }));
        this.getById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield medicine_usage_services_1.default.getById(id);
            (0, response_1.returnRes)(res, 200, "Get Medicine usage group by id successful", data);
        }));
        this.addMedUsage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, icon } = req.body;
            const data = yield medicine_usage_services_1.default.add(name, icon);
            (0, response_1.returnRes)(res, 201, "Add Medicine Usage Group successful", data);
        }));
        this.editMedUsage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield medicine_usage_services_1.default.edit(id, req.body);
            (0, response_1.returnRes)(res, 200, "Edit Medicine usage group successful", data);
        }));
        this.deleteMedUsage = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield medicine_usage_services_1.default.remove(id);
            (0, response_1.returnRes)(res, 200, "Delete Medicine usage group successful", data);
        }));
    }
}
const medUsageController = new MedUsageGroupController();
exports.default = medUsageController;
