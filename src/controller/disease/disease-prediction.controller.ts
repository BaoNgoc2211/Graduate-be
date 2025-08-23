import { Request, Response } from 'express';
import diseasePredictionService from '../../service/disease-prediction.services';
import createError from '../../util/create-error';
import asyncError from '../../middleware/error.middleware';
import { returnRes } from '../../util/response';

class DiseasePredictionController {
  /**
   * Dự đoán bệnh từ triệu chứng với dữ liệu từ database
   */
  predictDiseaseWithDatabase = asyncError(async (req: Request, res: Response) => {
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

    // Thực hiện dự đoán với dữ liệu từ database
    const result = await diseasePredictionService.predictDiseaseWithDatabaseData({
      text: text.trim(),
      top_k: Math.min(Math.max(top_k, 1), 10), // Giới hạn từ 1-10
      alpha: Math.min(Math.max(alpha, 0.0), 1.0) // Giới hạn từ 0.0-1.0
    });

    returnRes(res, 200, 'Dự đoán bệnh thành công', result);
  });

  /**
   * Dự đoán bệnh từ triệu chứng (giữ nguyên method cũ)
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
   * Lấy danh sách bệnh từ database
   */
  getDiseasesFromDatabase = asyncError(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const result = await diseasePredictionService.getSupportedDiseasesFromDatabase(page, limit);
    
    returnRes(res, 200, 'Lấy danh sách bệnh từ database thành công', result);
  });

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
  getDiseaseDetail = asyncError(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Vui lòng cung cấp ID bệnh');
    }

    const disease = await diseasePredictionService.getDiseaseDetail(id);
    
    if (!disease) {
      throw createError(404, 'Không tìm thấy bệnh với ID này');
    }

    returnRes(res, 200, 'Lấy chi tiết bệnh thành công', disease);
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
   * Lấy danh sách các bệnh được hỗ trợ từ FastAPI
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
