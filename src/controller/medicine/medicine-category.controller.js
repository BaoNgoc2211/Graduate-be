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
const medicine_category_services_1 = require("../../service/medicine/medicine-category.services");
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const response_1 = require("../../util/response");
class MedicineCategoryController {
    constructor() {
        this.getAll = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const categories = yield medicine_category_services_1.MedicineCategoryService.getAll(page, limit);
            (0, response_1.returnRes)(res, 200, "Get all Medicine", categories);
        }));
        this.getById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield medicine_category_services_1.MedicineCategoryService.getById(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Id Medicine", category);
        }));
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const category = yield medicine_category_services_1.MedicineCategoryService.create(req.body);
            (0, response_1.returnRes)(res, 201, "Created MedCate", category);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const updated = yield medicine_category_services_1.MedicineCategoryService.update(req.params.id, req.body);
            (0, response_1.returnRes)(res, 200, "Updated MedCate", updated);
        }));
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleted = yield medicine_category_services_1.MedicineCategoryService.delete(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted MedCate", deleted);
        }));
    }
}
exports.default = new MedicineCategoryController();
