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
const import_batch_services_1 = __importDefault(require("../../service/inventory/import-batch.services"));
const response_1 = require("../../util/response");
class ImportBatchController {
    constructor() {
        this.addDistributor = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield import_batch_services_1.default.addImportBatch(req.body);
            (0, response_1.returnRes)(res, 200, "Add Distributor Successful", data);
        }));
        this.getImportBatchById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield import_batch_services_1.default.getImportBatchById(id);
            (0, response_1.returnRes)(res, 200, "Get Import Batch By Id Successful", data);
        }));
        this.getAllImportBatches = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const data = yield import_batch_services_1.default.getAllImportBatches(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All Import Batches Successful", data);
        }));
        this.updateImportBatch = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield import_batch_services_1.default.updateImportBatch(id, req.body);
            (0, response_1.returnRes)(res, 200, "Update Import Batch Successful", data);
        }));
        this.updateImportBatchStatus = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { status } = req.body;
            const data = yield import_batch_services_1.default.updateImportBatchStatus(id, status);
            (0, response_1.returnRes)(res, 200, "Update Import Batch Status Successful", data);
        }));
        this.deleteImportBatch = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield import_batch_services_1.default.deleteImportBatch(id);
            (0, response_1.returnRes)(res, 200, "Delete Import Batch Successful");
        }));
    }
}
const importBatchController = new ImportBatchController();
exports.default = importBatchController;
