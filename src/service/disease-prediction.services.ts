import axios from 'axios';
import diseasePredictionConfig from '../config/disease-prediction.config';

interface DiseasePrediction {
  disease: string;
  confidence: number;
}

interface PredictRequest {
  text: string;
  top_k?: number;
  alpha?: number;
}

interface PredictResponse {
  predictions: DiseasePrediction[];
  processing_time?: number;
}

interface FastAPIHealthResponse {
  status: string;
  model_loaded: boolean;
  tokenizer_loaded: boolean;
  label_encoder_loaded: boolean;
  device: string;
  num_classes: number;
}

class DiseasePredictionService {
  private baseURL: string;
  private timeout: number;
  private retryAttempts: number;
  private retryDelay: number;

  constructor() {
    this.baseURL = diseasePredictionConfig.FASTAPI_BASE_URL;
    this.timeout = diseasePredictionConfig.FASTAPI_TIMEOUT;
    this.retryAttempts = diseasePredictionConfig.FASTAPI_RETRY_ATTEMPTS;
    this.retryDelay = diseasePredictionConfig.FASTAPI_RETRY_DELAY;
  }

  /**
   * Retry logic cho HTTP requests
   */
  private async retryRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await requestFn();
      } catch (error: any) {
        lastError = error;
        
        if (attempt < this.retryAttempts) {
          console.log(`Attempt ${attempt} failed, retrying in ${this.retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        }
      }
    }
    
    throw lastError;
  }

  /**
   * Kiểm tra trạng thái của FastAPI service
   */
  async checkHealth(): Promise<FastAPIHealthResponse> {
    return this.retryRequest(async () => {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: this.timeout,
      });
      return response.data;
    });
  }

  /**
   * Dự đoán bệnh từ triệu chứng
   */
  async predictDisease(request: PredictRequest): Promise<PredictResponse> {
    return this.retryRequest(async () => {
      try {
        const response = await axios.post(`${this.baseURL}/predict`, request, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: this.timeout,
        });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          // FastAPI trả về lỗi
          throw new Error(`Lỗi dự đoán: ${error.response.data.detail || error.response.data}`);
        } else if (error.code === 'ECONNREFUSED') {
          throw new Error(`FastAPI service không khả dụng tại ${this.baseURL}. Vui lòng kiểm tra xem service đã được khởi động chưa.`);
        } else if (error.code === 'ETIMEDOUT') {
          throw new Error('Yêu cầu dự đoán bị timeout. Vui lòng thử lại.');
        } else {
          throw new Error(`Lỗi kết nối: ${error.message}`);
        }
      }
    });
  }

  /**
   * Lấy danh sách tất cả các bệnh được hỗ trợ
   */
  async getSupportedDiseases(): Promise<{ total_diseases: number; diseases: string[] }> {
    return this.retryRequest(async () => {
      try {
        const response = await axios.get(`${this.baseURL}/diseases`, {
          timeout: this.timeout,
        });
        return response.data;
      } catch (error: any) {
        if (error.response) {
          throw new Error(`Lỗi lấy danh sách bệnh: ${error.response.data.detail || error.response.data}`);
        } else {
          throw new Error(`Lỗi kết nối: ${error.message}`);
        }
      }
    });
  }

  /**
   * Kiểm tra xem FastAPI service có sẵn sàng không
   */
  async isServiceReady(): Promise<boolean> {
    try {
      const health = await this.checkHealth();
      return health.status === 'healthy' && health.model_loaded;
    } catch (error) {
      return false;
    }
  }
}

export default new DiseasePredictionService();
