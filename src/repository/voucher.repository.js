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
const voucher_model_1 = __importDefault(require("../model/voucher.model"));
class VoucherRepository {
    getAllVoucher(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const totalItems = yield voucher_model_1.default.countDocuments();
            const items = yield voucher_model_1.default.find()
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
            return {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
                limit,
                data: items,
            };
        });
    }
    getValidateVoucher() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const validVoucher = yield voucher_model_1.default.find({
                isActive: true,
                $or: [
                    {
                        endDate: { $exists: false }
                    },
                    {
                        endDate: { $gte: now }
                    }
                ]
            });
            return validVoucher;
        });
    }
    create(voucher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_model_1.default.create(voucher);
        });
    }
    edit(id, voucher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_model_1.default.findByIdAndUpdate(id, voucher, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield voucher_model_1.default.findByIdAndDelete(id);
        });
    }
    // async getAllVoucher(code: string) {
    //   const filter = await Voucher.aggregate([
    //     // tìm theo tên gần đúng, không phân biệt hoa và thường
    //     {
    //       $match: {
    //         code: new RegExp(code, "i"),
    //       },
    //     },
    //     // tìm theo loại giảm giá phần trăm và cố định
    //     // tìm theo phạm vi áp dụng 
    //   ]);
    //   return filter;
    // }
    expireVouchersByDate(currentDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return voucher_model_1.default.updateMany({ endDate: { $lt: currentDate }, isActive: true }, { $set: { isActive: false } });
        });
    }
}
exports.default = new VoucherRepository();
