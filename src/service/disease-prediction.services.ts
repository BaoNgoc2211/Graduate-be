import axios from 'axios';
import diseasePredictionConfig from '../config/disease-prediction.config';
import diseaseRepository from '../repository/disease/disease.repository';
import symptomRepository from '../repository/disease/symptom.repository';
import { IDisease } from '../interface/disease/disease.interface';

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

interface EnhancedDiseasePrediction {
  disease: string;
  confidence: number;
  diseaseData?: IDisease;
}

interface EnhancedPredictResponse {
  predictions: EnhancedDiseasePrediction[];
  processing_time?: number;
  total_diseases_found: number;
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
   * Tìm bệnh trong database theo tên
   */
  private async findDiseaseByName(diseaseName: string): Promise<IDisease | null> {
    try {
      // Tìm kiếm theo tên chính xác
      let disease = await diseaseRepository.findName(diseaseName);
      
      // Nếu không tìm thấy, tìm kiếm theo tên khác (nameDiff)
      if (!disease) {
        disease = await diseaseRepository.findByNameDiff(diseaseName);
      }
      
      // Nếu vẫn không tìm thấy, tìm kiếm theo tên có chứa từ khóa
      if (!disease) {
        disease = await diseaseRepository.findByNameContains(diseaseName);
      }
      
      return disease;
    } catch (error) {
      console.error('Lỗi khi tìm bệnh trong database:', error);
      return null;
    }
  }

  /**
   * Tìm bệnh theo triệu chứng
   */
  // private async findDiseasesBySymptoms(symptomNames: string[]): Promise<IDisease[]> {
  //   try {
  //     const diseases: IDisease[] = [];
      
  //     for (const symptomName of symptomNames) {
  //       // Tìm symptom trong database
  //       const symptom = await symptomRepository.findName(symptomName);
  //       if (symptom) {
  //         // Tìm các bệnh có triệu chứng này
  //         const diseasesWithSymptom = await diseaseRepository.findBySymptomId(symptom._id);
  //         diseases.push(...diseasesWithSymptom);
  //       }
  //     }
      
  //     // Loại bỏ trùng lặp
  //     const uniqueDiseases = diseases.filter((disease, index, self) => 
  //       index === self.findIndex(d => d._id.toString() === disease._id.toString())
  //     );
      
  //     return uniqueDiseases;
  //   } catch (error) {
  //     console.error('Lỗi khi tìm bệnh theo triệu chứng:', error);
  //     return [];
  //   }
  // }

  /**
   * Dự đoán bệnh từ triệu chứng với dữ liệu từ database
   */
  async predictDiseaseWithDatabaseData(request: PredictRequest): Promise<EnhancedPredictResponse> {
    try {
      // Gọi FastAPI để dự đoán
      const fastApiResponse = await this.predictDisease(request);
      
      // Tăng cường dữ liệu với thông tin từ database
      const enhancedPredictions: EnhancedDiseasePrediction[] = [];
      
      for (const prediction of fastApiResponse.predictions) {
        const diseaseData = await this.findDiseaseByName(prediction.disease);
        
        enhancedPredictions.push({
          disease: prediction.disease,
          confidence: prediction.confidence,
          diseaseData: diseaseData || undefined
        });
      }
      
      return {
        predictions: enhancedPredictions,
        processing_time: fastApiResponse.processing_time,
        total_diseases_found: enhancedPredictions.filter(p => p.diseaseData).length
      };
    } catch (error) {
      console.error('Lỗi khi dự đoán bệnh với dữ liệu database:', error);
      throw error;
    }
  }

  /**
   * Dự đoán bệnh từ triệu chứng (giữ nguyên method cũ)
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
   * Lấy danh sách tất cả các bệnh được hỗ trợ từ database
   */
  async getSupportedDiseasesFromDatabase(page = 1, limit = 50): Promise<{
    total_diseases: number;
    diseases: IDisease[];
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const result = await diseaseRepository.findAll(page, limit);
      return {
        total_diseases: result.totalItems,
        diseases: result.data,
        currentPage: result.currentPage,
        totalPages: result.totalPages
      };
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bệnh từ database:', error);
      throw new Error(`Lỗi lấy danh sách bệnh từ database: ${error}`);
    }
  }

  /**
   * Lấy danh sách tất cả các bệnh được hỗ trợ từ FastAPI
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
   * Tìm bệnh theo triệu chứng từ database
   */
  // async findDiseasesBySymptomsFromDatabase(symptomText: string): Promise<{
  //   symptoms_found: string[];
  //   diseases: IDisease[];
  //   total_diseases: number;
  // }> {
  //   try {
  //     // Tách các triệu chứng từ text
  //     const symptomNames = symptomText.split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0);
      
  //     const diseases = await this.findDiseasesBySymptoms(symptomNames);
      
  //     return {
  //       symptoms_found: symptomNames,
  //       diseases: diseases,
  //       total_diseases: diseases.length
  //     };
  //   } catch (error) {
  //     console.error('Lỗi khi tìm bệnh theo triệu chứng từ database:', error);
  //     throw new Error(`Lỗi tìm bệnh theo triệu chứng: ${error}`);
  //   }
  // }

  /**
   * Lấy chi tiết bệnh từ database
   */
  async getDiseaseDetail(diseaseId: string): Promise<IDisease | null> {
    try {
      return await diseaseRepository.findId(diseaseId);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết bệnh:', error);
      throw new Error(`Lỗi lấy chi tiết bệnh: ${error}`);
    }
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
