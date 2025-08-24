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
const voucher_repository_1 = __importDefault(require("../repository/voucher.repository"));
class VoucherServices {
    getAllVoucher(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_repository_1.default.getAllVoucher(page, limit);
        });
    }
    getValidVoucher() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_repository_1.default.getValidateVoucher();
        });
    }
    createVoucher(voucher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_repository_1.default.create(voucher);
        });
    }
    deactivateExpiredVouchers() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const result = yield voucher_repository_1.default.expireVouchersByDate(now);
            console.log(`[VoucherService] ${result.modifiedCount} vouchers expired and deactivated.`);
        });
    }
    updateVoucher(id, voucher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_repository_1.default.edit(id, voucher);
        });
    }
    deleteVoucher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_repository_1.default.delete(id);
        });
    }
}
const voucherServices = new VoucherServices();
exports.default = voucherServices;
