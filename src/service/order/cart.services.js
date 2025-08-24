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
const user_model_1 = __importDefault(require("../../model/auth/user.model"));
const medicine_model_1 = __importDefault(require("../../model/medicine/medicine.model"));
const cart_model_1 = __importDefault(require("../../model/order/cart.model"));
const cart_repository_1 = __importDefault(require("../../repository/order/cart.repository"));
const create_error_1 = __importDefault(require("../../util/create-error"));
class CartServices {
    constructor() {
        this.addToCart = (user_id, medicine_id, quantity) => __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.getUserById(user_id);
            // Kiểm tra xem thuốc có tồn tại không
            const checkMedicine = yield medicine_model_1.default.findById(medicine_id).populate("stock_id");
            if (!checkMedicine) {
                (0, create_error_1.default)(404, "Thuốc không tồn tại");
            }
            let cart = yield cart_model_1.default.findOne({ user_id });
            if (!cart) {
                cart = yield cart_model_1.default.create({
                    user_id,
                    medicine_item: [
                        {
                            medicine_id: new mongoose_1.default.Types.ObjectId(medicine_id),
                            quantity,
                        },
                    ],
                    quantity,
                });
            }
            else {
                // 3. Nếu đã có giỏ hàng thì kiểm tra xem thuốc đã có trong giỏ hàng chưa
                const existingItem = cart.medicine_item.find((item) => item.medicine_id.toString() === medicine_id);
                if (existingItem) {
                    // 4. Nếu có rồi thì cập nhật số lượng
                    existingItem.quantity += quantity;
                }
                else {
                    // 5. Nếu chưa có thì thêm mới vào giỏ hàng
                    cart.medicine_item.push({
                        medicine_id: new mongoose_1.default.Types.ObjectId(medicine_id),
                        quantity,
                    });
                }
                // 6. Cập nhật tổng số lượng trong giỏ hàng
                cart.quantity = cart.medicine_item.reduce((sum, item) => sum + item.quantity, 0);
                // 7. Lưu giỏ hàng
                yield cart.save();
            }
            return { user_id: checkUser === null || checkUser === void 0 ? void 0 : checkUser.id, medicine_id, quantity };
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                (0, create_error_1.default)(404, "Email không tồn tại");
            }
            return user;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ _id: id });
            if (!user) {
                (0, create_error_1.default)(404, "User không tồn tại");
            }
            return user;
        });
    }
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.getAll(userId);
        });
    }
    update(userId, medicine_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId });
            if (!cart)
                (0, create_error_1.default)(404, "Giỏ hàng không tồn tại");
            const item = cart === null || cart === void 0 ? void 0 : cart.medicine_item.find((item) => item.medicine_id.toString() === medicine_id);
            if (!item)
                (0, create_error_1.default)(404, "Thuốc không tồn tại trong giỏ");
            item.quantity = quantity;
            cart.quantity = cart.medicine_item.reduce((sum, item) => sum + item.quantity, 0);
            yield cart.save();
            return cart;
        });
    }
    removeItem(userId, medicine_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_model_1.default.findOne({ user_id: userId });
            if (!cart || !cart.medicine_item) {
                (0, create_error_1.default)(404, "Giỏ hàng không tồn tại hoặc không có sản phẩm");
            }
            cart.medicine_item = cart.medicine_item.filter((item) => item.medicine_id.toString() !== medicine_id);
            cart.quantity = cart.medicine_item.reduce((sum, item) => sum + item.quantity, 0);
            yield cart.save();
            return cart;
        });
    }
    clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cart_model_1.default.deleteOne({ user_id: userId });
        });
    }
}
const cartService = new CartServices();
exports.default = cartService;
