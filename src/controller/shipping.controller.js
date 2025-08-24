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
const response_1 = require("../util/response");
const shipping_services_1 = __importDefault(require("../service/shipping.services"));
class ShippingController {
    constructor() {
        this.getAllShipping = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const shipping = yield shipping_services_1.default.getAllShippingMethods();
            (0, response_1.returnRes)(res, 200, "Get All Shipping", shipping);
        }));
        this.getShippingById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const shipping = yield shipping_services_1.default.getShippingMethodById(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Shipping By ID", shipping);
        }));
        this.createShipping = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const shipping = yield shipping_services_1.default.createShippingMethod(req.body);
            (0, response_1.returnRes)(res, 201, "Created Shipping Method", shipping);
        }));
        this.updateShipping = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const shipping = yield shipping_services_1.default.updateShippingMethod(req.params.id, req.body);
            (0, response_1.returnRes)(res, 200, "Updated Shipping Method", shipping);
        }));
        this.deleteShipping = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const shipping = yield shipping_services_1.default.deleteShippingMethod(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted Shipping Method", shipping);
        }));
    }
}
const shippingController = new ShippingController();
exports.default = shippingController;
