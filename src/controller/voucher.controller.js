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
const error_middleware_1 = __importDefault(require("../middleware/error.middleware"));
const voucher_services_1 = __importDefault(require("../service/voucher.services"));
const response_1 = require("../util/response");
class VoucherController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const voucher = yield voucher_services_1.default.getAllVoucher(page, limit);
            (0, response_1.returnRes)(res, 200, "Get All Voucher", voucher);
        }));
        this.getValidVoucher = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const voucher = yield voucher_services_1.default.getValidVoucher();
            (0, response_1.returnRes)(res, 200, "Get Valid Voucher", voucher);
        }));
        this.addVoucher = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield voucher_services_1.default.createVoucher(req.body);
            (0, response_1.returnRes)(res, 200, "Create Voucher successful", data);
        }));
        this.updateVoucher = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const data = req.body;
            const voucher = yield voucher_services_1.default.updateVoucher(id, data);
            (0, response_1.returnRes)(res, 200, "Update Voucher", voucher);
        }));
        this.deleteVoucher = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const voucher = yield voucher_services_1.default.deleteVoucher(req.params.id);
            (0, response_1.returnRes)(res, 200, "Delete Voucher", voucher);
        }));
    }
}
exports.default = new VoucherController();
