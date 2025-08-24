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
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const disease_services_1 = __importDefault(require("../../service/disease/disease.services"));
const response_1 = require("../../util/response");
class DiseaseController {
    constructor() {
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield disease_services_1.default.create(req.body);
            (0, response_1.returnRes)(res, 201, "Add disease successful", data);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield disease_services_1.default.update(id, req.body);
            (0, response_1.returnRes)(res, 200, "Edit disease successful", data);
        }));
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield disease_services_1.default.delete(new mongoose_1.default.Types.ObjectId(id));
            (0, response_1.returnRes)(res, 200, "Delete disease successful", data);
        }));
        this.getDetail = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield disease_services_1.default.getById(id);
            (0, response_1.returnRes)(res, 200, "Get disease detail successful", data);
        }));
        this.getAllDiseases = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const data = yield disease_services_1.default.getAll(page, limit);
            (0, response_1.returnRes)(res, 200, "Get all diseases successful", data);
        }));
    }
}
const diseaseController = new DiseaseController();
exports.default = diseaseController;
