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
const cart_model_1 = __importDefault(require("../../model/order/cart.model"));
class CartRepository {
    getCartFromDB(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findOne({ user_id: userId }).populate("medicine_item.medicine_id");
        });
    }
    saveCartToDB(userId, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findOneAndUpdate({ userId }, { $set: { items: cart.medicine_item } }, { upsert: true, new: true });
        });
    }
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.create(cart);
        });
    }
    update(id, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.findByIdAndUpdate(id, cart, { new: true });
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cart_model_1.default.deleteOne({ user_id: userId });
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_model_1.default.find({ user_id: userId })
                .populate({
                path: "medicine_item.medicine_id",
                select: "code name thumbnail",
                populate: {
                    path: "stock_id",
                    select: "sellingPrice"
                }
            });
        });
    }
}
exports.default = new CartRepository();
