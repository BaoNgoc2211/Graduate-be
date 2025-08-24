"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const diseasePredictionConfig = {
    // URL của FastAPI service - có thể là localhost hoặc domain khác
    FASTAPI_BASE_URL: process.env.FASTAPI_BASE_URL || 'http://localhost:8001',
    // Timeout cho request (milliseconds)
    FASTAPI_TIMEOUT: parseInt(process.env.FASTAPI_TIMEOUT || '30000'),
    // Số lần retry khi request thất bại
    FASTAPI_RETRY_ATTEMPTS: parseInt(process.env.FASTAPI_RETRY_ATTEMPTS || '3'),
    // Delay giữa các lần retry (milliseconds)
    FASTAPI_RETRY_DELAY: parseInt(process.env.FASTAPI_RETRY_DELAY || '1000'),
};
exports.default = diseasePredictionConfig;
