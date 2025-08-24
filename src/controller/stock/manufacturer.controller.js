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
const manufacturer_services_1 = __importDefault(require("../../service/inventory/manufacturer.services"));
const response_1 = require("../../util/response");
class ManufacturerController {
    constructor() {
        this.addManufacturer = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield manufacturer_services_1.default.addManufacturer(req.body);
            (0, response_1.returnRes)(res, 200, "Add Manufacturer Successful", data);
        }));
        this.getManufacturerById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = yield manufacturer_services_1.default.getManufacturerById(id);
            (0, response_1.returnRes)(res, 200, "Get Manufacturer By Id Successful", data);
        }));
        this.getAllManufacturers = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const data = yield manufacturer_services_1.default.getAllManufacturers(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All Manufacturers Successful", data);
        }));
        this.updateManufacturer = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield manufacturer_services_1.default.updateManufacturer(req.params.id, req.body);
            (0, response_1.returnRes)(res, 200, "Update Manufacturer Successful", data);
        }));
        this.deleteManufacturer = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield manufacturer_services_1.default.deleteManufacturer(req.params.id);
            (0, response_1.returnRes)(res, 200, "Delete Manufacturer Successful");
        }));
    }
}
const manufacturerController = new ManufacturerController();
exports.default = manufacturerController;
