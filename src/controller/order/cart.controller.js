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
const response_1 = require("../../util/response");
const cart_services_1 = __importDefault(require("../../service/order/cart.services"));
class CartController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const data = yield cart_services_1.default.getAll(String(userId));
            (0, response_1.returnRes)(res, 200, "Get cart items successful", data);
        }));
        this.addToCart = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const { medicine_id, quantity } = req.body;
            const data = yield cart_services_1.default.addToCart(String(userId), medicine_id, quantity);
            (0, response_1.returnRes)(res, 200, "Add item to cart successful", data);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const { medicine_id, quantity } = req.body;
            const data = yield cart_services_1.default.update(String(userId), medicine_id, quantity);
            (0, response_1.returnRes)(res, 200, "Update cart successful", data);
        }));
        this.remove = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const { medicine_id } = req.body;
            const data = yield cart_services_1.default.removeItem(String(userId), medicine_id);
            (0, response_1.returnRes)(res, 200, "Remove item from cart successful", data);
        }));
        this.clear = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.user;
            const data = yield cart_services_1.default.clearCart(String(userId));
            (0, response_1.returnRes)(res, 200, "Clear cart successful", data);
        }));
    }
}
const cartController = new CartController();
exports.default = cartController;
