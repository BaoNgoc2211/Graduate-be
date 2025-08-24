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
const distributor_services_1 = __importDefault(require("../../service/inventory/distributor.services"));
const response_1 = require("../../util/response");
class DistributorController {
    constructor() {
        this.addDistributor = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield distributor_services_1.default.addDistributor(req.body);
            (0, response_1.returnRes)(res, 200, "Add Distributor Successful", data);
        }));
        this.getDistributorById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield distributor_services_1.default.getDistributorById(id);
            (0, response_1.returnRes)(res, 200, "Get Distributor By Id Successful", data);
        }));
        this.getAllDistributor = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const distributors = yield distributor_services_1.default.getAllDistributors(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All Distributors Successful", distributors);
        }));
        this.updateDistributor = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield distributor_services_1.default.updateDistributor(id, req.body);
            (0, response_1.returnRes)(res, 200, "Update Distributor Successful", data);
        }));
        this.deleteDistributor = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield distributor_services_1.default.deleteDistributor(id);
            (0, response_1.returnRes)(res, 200, "Delete Distributor Successful");
        }));
    }
}
const distributorController = new DistributorController();
exports.default = distributorController;
