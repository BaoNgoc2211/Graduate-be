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
const disease_prediction_services_1 = __importDefault(require("../../service/disease-prediction.services"));
const create_error_1 = __importDefault(require("../../util/create-error"));
const error_middleware_1 = __importDefault(require("../../middleware/error.middleware"));
const response_1 = require("../../util/response");
class DiseasePredictionController {
    constructor() {
        /**
         * Dự đoán bệnh từ triệu chứng với dữ liệu từ database
         */
        this.predictDiseaseWithDatabase = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { text, top_k = 3, alpha = 0.7 } = req.body;
            // Validate input
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                throw (0, create_error_1.default)(400, 'Vui lòng cung cấp mô tả triệu chứng');
            }
            if (text.length > 1000) {
                throw (0, create_error_1.default)(400, 'Mô tả triệu chứng quá dài (tối đa 1000 ký tự)');
            }
            // Kiểm tra service có sẵn sàng không
            const isReady = yield disease_prediction_services_1.default.isServiceReady();
            if (!isReady) {
                throw (0, create_error_1.default)(503, 'Dịch vụ dự đoán bệnh hiện không khả dụng. Vui lòng thử lại sau.');
            }
            // Thực hiện dự đoán với dữ liệu từ database
            const result = yield disease_prediction_services_1.default.predictDiseaseWithDatabaseData({
                text: text.trim(),
                top_k: Math.min(Math.max(top_k, 1), 10), // Giới hạn từ 1-10
                alpha: Math.min(Math.max(alpha, 0.0), 1.0) // Giới hạn từ 0.0-1.0
            });
            (0, response_1.returnRes)(res, 200, 'Dự đoán bệnh thành công', result);
        }));
        /**
         * Dự đoán bệnh từ triệu chứng (giữ nguyên method cũ)
         */
        this.predictDisease = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { text, top_k = 3, alpha = 0.7 } = req.body;
            // Validate input
            if (!text || typeof text !== 'string' || text.trim().length === 0) {
                throw (0, create_error_1.default)(400, 'Vui lòng cung cấp mô tả triệu chứng');
            }
            if (text.length > 1000) {
                throw (0, create_error_1.default)(400, 'Mô tả triệu chứng quá dài (tối đa 1000 ký tự)');
            }
            // Kiểm tra service có sẵn sàng không
            const isReady = yield disease_prediction_services_1.default.isServiceReady();
            if (!isReady) {
                throw (0, create_error_1.default)(503, 'Dịch vụ dự đoán bệnh hiện không khả dụng. Vui lòng thử lại sau.');
            }
            // Thực hiện dự đoán
            const result = yield disease_prediction_services_1.default.predictDisease({
                text: text.trim(),
                top_k: Math.min(Math.max(top_k, 1), 10), // Giới hạn từ 1-10
                alpha: Math.min(Math.max(alpha, 0.0), 1.0) // Giới hạn từ 0.0-1.0
            });
            (0, response_1.returnRes)(res, 200, 'Dự đoán bệnh thành công', result);
        }));
        /**
         * Lấy danh sách bệnh từ database
         */
        this.getDiseasesFromDatabase = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const result = yield disease_prediction_services_1.default.getSupportedDiseasesFromDatabase(page, limit);
            (0, response_1.returnRes)(res, 200, 'Lấy danh sách bệnh từ database thành công', result);
        }));
        /**
         * Tìm bệnh theo triệu chứng từ database
         */
        // findDiseasesBySymptoms = asyncError(async (req: Request, res: Response) => {
        //   const { symptoms } = req.body;
        //   if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
        //     throw createError(400, 'Vui lòng cung cấp danh sách triệu chứng');
        //   }
        //   const result = await diseasePredictionService.findDiseasesBySymptomsFromDatabase(symptoms.trim());
        //   returnRes(res, 200, 'Tìm bệnh theo triệu chứng thành công', result);
        // });
        /**
         * Lấy chi tiết bệnh từ database
         */
        this.getDiseaseDetail = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id) {
                throw (0, create_error_1.default)(400, 'Vui lòng cung cấp ID bệnh');
            }
            const disease = yield disease_prediction_services_1.default.getDiseaseDetail(id);
            if (!disease) {
                throw (0, create_error_1.default)(404, 'Không tìm thấy bệnh với ID này');
            }
            (0, response_1.returnRes)(res, 200, 'Lấy chi tiết bệnh thành công', disease);
        }));
        /**
         * Kiểm tra trạng thái dịch vụ dự đoán
         */
        this.checkServiceHealth = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const health = yield disease_prediction_services_1.default.checkHealth();
                (0, response_1.returnRes)(res, 200, 'Dịch vụ dự đoán bệnh hoạt động bình thường', health);
            }
            catch (_a) {
                (0, response_1.returnRes)(res, 503, 'Dịch vụ dự đoán bệnh không khả dụng');
            }
        }));
        /**
         * Lấy danh sách các bệnh được hỗ trợ từ FastAPI
         */
        this.getSupportedDiseases = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const diseases = yield disease_prediction_services_1.default.getSupportedDiseases();
            (0, response_1.returnRes)(res, 200, 'Lấy danh sách bệnh thành công', diseases);
        }));
        /**
         * Test endpoint để kiểm tra kết nối
         */
        this.testConnection = (0, error_middleware_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const isReady = yield disease_prediction_services_1.default.isServiceReady();
            (0, response_1.returnRes)(res, 200, 'Kiểm tra kết nối thành công', {
                service_ready: isReady,
                timestamp: new Date().toISOString()
            });
        }));
    }
}
exports.default = new DiseasePredictionController();
