import { Request, Response } from 'express';
import diseasePredictionService from '../../service/disease-prediction.services';
import createError from '../../util/create-error';
import asyncError from '../../middleware/error.middleware';
import { returnRes } from '../../util/response';

class DiseasePredictionController {
  /**
   * Dự đoán bệnh từ triệu chứng
   */
  predictDisease = asyncError(async (req: Request, res: Response) => {
    const { text, top_k = 3, alpha = 0.7 } = req.body;

    // Validate input
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      throw createError(400, 'Vui lòng cung cấp mô tả triệu chứng');
    }

    if (text.length > 1000) {
      throw createError(400, 'Mô tả triệu chứng quá dài (tối đa 1000 ký tự)');
    }

    // Kiểm tra service có sẵn sàng không
    const isReady = await diseasePredictionService.isServiceReady();
    if (!isReady) {
      throw createError(503, 'Dịch vụ dự đoán bệnh hiện không khả dụng. Vui lòng thử lại sau.');
    }

    // Thực hiện dự đoán
    const result = await diseasePredictionService.predictDisease({
      text: text.trim(),
      top_k: Math.min(Math.max(top_k, 1), 10), // Giới hạn từ 1-10
      alpha: Math.min(Math.max(alpha, 0.0), 1.0) // Giới hạn từ 0.0-1.0
    });

    returnRes(res, 200, 'Dự đoán bệnh thành công', result);
  });

  /**
   * Kiểm tra trạng thái dịch vụ dự đoán
   */
  checkServiceHealth = asyncError(async (req: Request, res: Response) => {
    try {
      const health = await diseasePredictionService.checkHealth();
      returnRes(res, 200, 'Dịch vụ dự đoán bệnh hoạt động bình thường', health);
    } catch (error: any) {
          returnRes(res, 503, 'Dịch vụ dự đoán bệnh không khả dụng', { error: error.message });
    }
  });

  /**
   * Lấy danh sách các bệnh được hỗ trợ
   */
  getSupportedDiseases = asyncError(async (req: Request, res: Response) => {
    const diseases = await diseasePredictionService.getSupportedDiseases();
    
    returnRes(res, 200, 'Lấy danh sách bệnh thành công', diseases);
  });

  /**
   * Test endpoint để kiểm tra kết nối
   */
  testConnection = asyncError(async (req: Request, res: Response) => {
    const isReady = await diseasePredictionService.isServiceReady();
    
    returnRes(res, 200, 'Kiểm tra kết nối thành công', {
      service_ready: isReady,
      timestamp: new Date().toISOString()
    });
  });
}

export default new DiseasePredictionController();
