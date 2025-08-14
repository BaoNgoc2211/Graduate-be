import { Router } from 'express';
import diseasePredictionController from '../../controller/disease/disease-prediction.controller';
import { protect } from '../../middleware/auth.middleware';

const router = Router();


router.post('/predict', protect, diseasePredictionController.predictDisease);

//Kiểm tra trạng thái dịch vụ dự đoán

router.get('/health', diseasePredictionController.checkServiceHealth);

//Lấy danh sách các bệnh được hỗ trợ

router.get('/diseases', diseasePredictionController.getSupportedDiseases);
//Test kết nối với FastAPI service

router.get('/test', diseasePredictionController.testConnection);

export default router;
