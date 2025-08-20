import dotenv from "dotenv";
dotenv.config();

interface DiseasePredictionConfig {
  FASTAPI_BASE_URL: string;
  FASTAPI_TIMEOUT: number;
  FASTAPI_RETRY_ATTEMPTS: number;
  FASTAPI_RETRY_DELAY: number;
}

const diseasePredictionConfig: DiseasePredictionConfig = {
  // URL của FastAPI service - có thể là localhost hoặc domain khác
  FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL || 'http://localhost:8001',
  
  // Timeout cho request (milliseconds)
  FASTAPI_TIMEOUT: parseInt(process.env.FASTAPI_TIMEOUT || '30000'),
  
  // Số lần retry khi request thất bại
  FASTAPI_RETRY_ATTEMPTS: parseInt(process.env.FASTAPI_RETRY_ATTEMPTS || '3'),
  
  // Delay giữa các lần retry (milliseconds)
  FASTAPI_RETRY_DELAY: parseInt(process.env.FASTAPI_RETRY_DELAY || '1000'),
};

export default diseasePredictionConfig;

