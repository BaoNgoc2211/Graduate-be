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
const axios_1 = __importDefault(require("axios"));
const disease_prediction_config_1 = __importDefault(require("../config/disease-prediction.config"));
const disease_repository_1 = __importDefault(require("../repository/disease/disease.repository"));
class DiseasePredictionService {
    constructor() {
        this.baseURL = disease_prediction_config_1.default.FASTAPI_BASE_URL;
        this.timeout = disease_prediction_config_1.default.FASTAPI_TIMEOUT;
        this.retryAttempts = disease_prediction_config_1.default.FASTAPI_RETRY_ATTEMPTS;
        this.retryDelay = disease_prediction_config_1.default.FASTAPI_RETRY_DELAY;
    }
    /**
     * Retry logic cho HTTP requests
     */
    // private async retryRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    //   let lastError: any;
    //   for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
    //     try {
    //       return await requestFn();
    //     } catch  {
    //       lastError = error;
    //       if (attempt < this.retryAttempts) {
    //         console.log(`Attempt ${attempt} failed, retrying in ${this.retryDelay}ms...`);
    //         await new Promise(resolve => setTimeout(resolve, this.retryDelay));
    //       }
    //     }
    //   }
    //   throw lastError;
    // }
    retryRequest(requestFn) {
        return __awaiter(this, void 0, void 0, function* () {
            let lastError;
            for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
                try {
                    return yield requestFn();
                }
                catch (err) {
                    lastError = err;
                    if (attempt < this.retryAttempts) {
                        console.log(`Attempt ${attempt} failed, retrying in ${this.retryDelay}ms...`);
                        yield new Promise(resolve => setTimeout(resolve, this.retryDelay));
                    }
                }
            }
            throw lastError;
        });
    }
    /**
     * Kiểm tra trạng thái của FastAPI service
     */
    checkHealth() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.retryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.get(`${this.baseURL}/health`, {
                    timeout: this.timeout,
                });
                return response.data;
            }));
        });
    }
    /**
     * Tìm bệnh trong database theo tên
     */
    findDiseaseByName(diseaseName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Tìm kiếm theo tên chính xác
                let disease = yield disease_repository_1.default.findName(diseaseName);
                // Nếu không tìm thấy, tìm kiếm theo tên khác (nameDiff)
                if (!disease) {
                    disease = yield disease_repository_1.default.findByNameDiff(diseaseName);
                }
                // Nếu vẫn không tìm thấy, tìm kiếm theo tên có chứa từ khóa
                if (!disease) {
                    disease = yield disease_repository_1.default.findByNameContains(diseaseName);
                }
                return disease;
            }
            catch (error) {
                console.error('Lỗi khi tìm bệnh trong database:', error);
                return null;
            }
        });
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
    predictDiseaseWithDatabaseData(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Gọi FastAPI để dự đoán
                const fastApiResponse = yield this.predictDisease(request);
                // Tăng cường dữ liệu với thông tin từ database
                const enhancedPredictions = [];
                for (const prediction of fastApiResponse.predictions) {
                    const diseaseData = yield this.findDiseaseByName(prediction.disease);
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
            }
            catch (error) {
                console.error('Lỗi khi dự đoán bệnh với dữ liệu database:', error);
                throw error;
            }
        });
    }
    /**
     * Dự đoán bệnh từ triệu chứng (giữ nguyên method cũ)
     */
    // async predictDisease(request: PredictRequest): Promise<PredictResponse> {
    //   return this.retryRequest(async () => {
    //     try {
    //       const response = await axios.post(`${this.baseURL}/predict`, request, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         timeout: this.timeout,
    //       });
    //       return response.data;
    //     } catch (error: any) {
    //       if (error.response) {
    //         // FastAPI trả về lỗi
    //         throw new Error(`Lỗi dự đoán: ${error.response.data.detail || error.response.data}`);
    //       } else if (error.code === 'ECONNREFUSED') {
    //         throw new Error(`FastAPI service không khả dụng tại ${this.baseURL}. Vui lòng kiểm tra xem service đã được khởi động chưa.`);
    //       } else if (error.code === 'ETIMEDOUT') {
    //         throw new Error('Yêu cầu dự đoán bị timeout. Vui lòng thử lại.');
    //       } else {
    //         throw new Error(`Lỗi kết nối: ${error.message}`);
    //       }
    //     }
    //   });
    // }
    predictDisease(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.retryRequest(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const response = yield axios_1.default.post(`${this.baseURL}/predict`, request, {
                        headers: { 'Content-Type': 'application/json' },
                        timeout: this.timeout,
                    });
                    return response.data;
                }
                catch (err) {
                    if (axios_1.default.isAxiosError(err)) {
                        if (err.response) {
                            throw new Error(`Lỗi dự đoán: ${((_a = err.response.data) === null || _a === void 0 ? void 0 : _a.detail) || err.response.data}`);
                        }
                        else if (err.code === 'ECONNREFUSED') {
                            throw new Error(`FastAPI service không khả dụng tại ${this.baseURL}. Vui lòng kiểm tra xem service đã được khởi động chưa.`);
                        }
                        else if (err.code === 'ETIMEDOUT') {
                            throw new Error('Yêu cầu dự đoán bị timeout. Vui lòng thử lại.');
                        }
                        else {
                            throw new Error(`Lỗi kết nối: ${err.message}`);
                        }
                    }
                    throw new Error('Lỗi không xác định khi gọi FastAPI.');
                }
            }));
        });
    }
    /**
     * Lấy danh sách tất cả các bệnh được hỗ trợ từ database
     */
    getSupportedDiseasesFromDatabase() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 50) {
            try {
                const result = yield disease_repository_1.default.findAll(page, limit);
                return {
                    total_diseases: result.totalItems,
                    diseases: result.data,
                    currentPage: result.currentPage,
                    totalPages: result.totalPages
                };
            }
            catch (error) {
                console.error('Lỗi khi lấy danh sách bệnh từ database:', error);
                throw new Error(`Lỗi lấy danh sách bệnh từ database: ${error}`);
            }
        });
    }
    /**
     * Lấy danh sách tất cả các bệnh được hỗ trợ từ FastAPI
     */
    // async getSupportedDiseases(): Promise<{ total_diseases: number; diseases: string[] }> {
    //   return this.retryRequest(async () => {
    //     try {
    //       const response = await axios.get(`${this.baseURL}/diseases`, {
    //         timeout: this.timeout,
    //       });
    //       return response.data;
    //     } catch (error: any) {
    //       if (error.response) {
    //         throw new Error(`Lỗi lấy danh sách bệnh: ${error.response.data.detail || error.response.data}`);
    //       } else {
    //         throw new Error(`Lỗi kết nối: ${error.message}`);
    //       }
    //     }
    //   });
    // }
    getSupportedDiseases() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.retryRequest(() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const response = yield axios_1.default.get(`${this.baseURL}/diseases`, {
                        timeout: this.timeout,
                    });
                    return response.data;
                }
                catch (err) {
                    if (axios_1.default.isAxiosError(err)) {
                        if (err.response) {
                            throw new Error(`Lỗi lấy danh sách bệnh: ${((_a = err.response.data) === null || _a === void 0 ? void 0 : _a.detail) || err.response.data}`);
                        }
                        throw new Error(`Lỗi kết nối: ${err.message}`);
                    }
                    throw new Error('Lỗi không xác định khi gọi FastAPI.');
                }
            }));
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
    getDiseaseDetail(diseaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield disease_repository_1.default.findId(diseaseId);
            }
            catch (error) {
                console.error('Lỗi khi lấy chi tiết bệnh:', error);
                throw new Error(`Lỗi lấy chi tiết bệnh: ${error}`);
            }
        });
    }
    /**
     * Kiểm tra xem FastAPI service có sẵn sàng không
     */
    // async isServiceReady(): Promise<boolean> {
    //   try {
    //     const health = await this.checkHealth();
    //     return health.status === 'healthy' && health.model_loaded;
    //   } catch {
    //     console.log(error);
    //     return false;
    //   }
    // }
    isServiceReady() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const health = yield this.checkHealth();
                return health.status === 'healthy' && health.model_loaded;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.default = new DiseasePredictionService();
