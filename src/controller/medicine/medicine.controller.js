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
const medicine_services_1 = __importDefault(require("../../service/medicine/medicine.services"));
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const response_1 = require("../../util/response");
class MedicineController {
    constructor() {
        this.getMedicineAdmin = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const medicines = yield medicine_services_1.default.getMedicineAdmin(page, limit);
            (0, response_1.returnRes)(res, 200, "Medicine", medicines);
        }));
        this.getMedicineUser = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const medicines = yield medicine_services_1.default.getMedicineUser(page, limit);
            (0, response_1.returnRes)(res, 200, "Medicine:", medicines);
        }));
        this.getCreateAdd = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield medicine_services_1.default.getMedByCreatedDate();
                (0, response_1.returnRes)(res, 200, "Fetch last 30 days medicines", result);
            }
            catch (error) {
                console.error("Error in getRecentMedicines:", error);
                res.status(500).json({ message: "Internal Server Error" });
            }
        }));
        this.getById = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const medicineId = yield medicine_services_1.default.getMedicineById(req.params.id);
            (0, response_1.returnRes)(res, 200, "Get Id Medicine", medicineId);
        }));
        this.create = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const newMedicine = yield medicine_services_1.default.createMedicine(req.body);
            (0, response_1.returnRes)(res, 201, "Created Medicine", newMedicine);
        }));
        this.update = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const updated = yield medicine_services_1.default.updateMedicine(req.params.id, req.body);
            (0, response_1.returnRes)(res, 200, "Updated Medicine", updated);
        }));
        this.delete = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const deleted = yield medicine_services_1.default.deleteMedicine(req.params.id);
            (0, response_1.returnRes)(res, 200, "Deleted Medicine", deleted);
        }));
        // filterMedicine = asyncError(async (req: Request, res: Response) => {
        //   const { name, categoryId, indications } = req.query;
        //   const medicines = await medicineServices.searchMedicince({
        //     name: name as string,
        //     categoryId: categoryId as string,
        //     indications: indications as string,
        //   });
        //   return res.status(200).json({ success: true, data: medicines });
        // });
        this.searchMed = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.query;
            // if (!name || typeof name !== "string") {
            //   returnRes(res, 400, "Invalid search query");
            // }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const results = yield medicine_services_1.default.searchMed(name, page, limit);
            (0, response_1.returnRes)(res, 200, "Search Results", results);
        }));
    }
}
exports.default = new MedicineController();
