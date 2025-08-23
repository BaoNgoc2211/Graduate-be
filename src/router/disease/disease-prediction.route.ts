import { Router } from 'express';
import diseasePredictionController from '../../controller/disease/disease-prediction.controller';
import { protect } from '../../middleware/auth.middleware';

const router = Router();

// Dự đoán bệnh với dữ liệu từ database (endpoint mới chính)
router.post('/predict-with-database', protect, diseasePredictionController.predictDiseaseWithDatabase);

// Dự đoán bệnh từ triệu chứng (giữ nguyên endpoint cũ)
router.post('/predict', protect, diseasePredictionController.predictDisease);

// Lấy danh sách bệnh từ database
router.get('/diseases-from-database', protect, diseasePredictionController.getDiseasesFromDatabase);

// Tìm bệnh theo triệu chứng từ database
// router.post('/find-by-symptoms', protect, diseasePredictionController.findDiseasesBySymptoms);

// Lấy chi tiết bệnh từ database
router.get('/disease-detail/:id', protect, diseasePredictionController.getDiseaseDetail);

// Kiểm tra trạng thái dịch vụ dự đoán
router.get('/health', diseasePredictionController.checkServiceHealth);

// Lấy danh sách các bệnh được hỗ trợ từ FastAPI
router.get('/diseases', diseasePredictionController.getSupportedDiseases);

// Test kết nối với FastAPI service
router.get('/test', diseasePredictionController.testConnection);

export default router;
