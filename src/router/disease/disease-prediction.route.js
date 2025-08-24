"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const disease_prediction_controller_1 = __importDefault(require("../../controller/disease/disease-prediction.controller"));
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Dự đoán bệnh với dữ liệu từ database (endpoint mới chính)
router.post('/predict-with-database', auth_middleware_1.protect, disease_prediction_controller_1.default.predictDiseaseWithDatabase);
// Dự đoán bệnh từ triệu chứng (giữ nguyên endpoint cũ)
router.post('/predict', auth_middleware_1.protect, disease_prediction_controller_1.default.predictDisease);
// Lấy danh sách bệnh từ database
router.get('/diseases-from-database', auth_middleware_1.protect, disease_prediction_controller_1.default.getDiseasesFromDatabase);
// Tìm bệnh theo triệu chứng từ database
// router.post('/find-by-symptoms', protect, diseasePredictionController.findDiseasesBySymptoms);
// Lấy chi tiết bệnh từ database
router.get('/disease-detail/:id', auth_middleware_1.protect, disease_prediction_controller_1.default.getDiseaseDetail);
// Kiểm tra trạng thái dịch vụ dự đoán
router.get('/health', disease_prediction_controller_1.default.checkServiceHealth);
// Lấy danh sách các bệnh được hỗ trợ từ FastAPI
router.get('/diseases', disease_prediction_controller_1.default.getSupportedDiseases);
// Test kết nối với FastAPI service
router.get('/test', disease_prediction_controller_1.default.testConnection);
exports.default = router;
