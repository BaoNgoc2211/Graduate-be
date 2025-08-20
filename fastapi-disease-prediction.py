import torch.nn.functional as F
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer
from sklearn.preprocessing import LabelEncoder
import numpy as np
import warnings
from pyvi import ViTokenizer
warnings.filterwarnings('ignore')
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import re
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class Config:
    """Configuration class for hyperparameters"""
    model_name = "demdecuong/vihealthbert-base-word"
    max_length = 256
    batch_size = 16
    learning_rate = 2e-5
    weight_decay = 0.01
    num_epochs = 20
    warmup_steps = 100
    dropout_rate = 0.3
    hidden_size = 128
    patience = 5
    gradient_clip = 1.0

# Set random seeds for reproducibility
torch.manual_seed(42)
np.random.seed(42)

from fastapi.middleware.cors import CORSMiddleware

# Thêm vào sau khi tạo app FastAPI
app = FastAPI(
    title="ViHealthBERT Disease Prediction API",
    description="API for predicting diseases from Vietnamese medical text using hybrid approach",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả origins (chỉ dùng cho development)
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả methods
    allow_headers=["*"],  # Cho phép tất cả headers
)

class EnhancedDiseaseClassifier(nn.Module):
    """Enhanced classifier for disease prediction using ViHealthBERT"""

    def __init__(self, pretrained_model, num_labels, config):
        super(EnhancedDiseaseClassifier, self).__init__()
        self.bert = pretrained_model
        self.config = config

        # Freeze embedding layers for better transfer learning
        for param in self.bert.embeddings.parameters():
            param.requires_grad = False

        # Enhanced classifier head with residual connections
        self.dropout1 = nn.Dropout(config.dropout_rate)
        self.fc1 = nn.Linear(self.bert.config.hidden_size, config.hidden_size)
        self.dropout2 = nn.Dropout(config.dropout_rate)
        self.fc2 = nn.Linear(config.hidden_size, config.hidden_size // 2)
        self.dropout3 = nn.Dropout(config.dropout_rate)
        self.classifier = nn.Linear(config.hidden_size // 2, num_labels)

        # Layer normalization for better training stability
        self.layer_norm1 = nn.LayerNorm(config.hidden_size)
        self.layer_norm2 = nn.LayerNorm(config.hidden_size // 2)

        # Initialize weights
        self._init_weights()

    def _init_weights(self):
        """Initialize weights using Xavier normal initialization"""
        for module in [self.fc1, self.fc2, self.classifier]:
            nn.init.xavier_normal_(module.weight)
            nn.init.constant_(module.bias, 0)

    def forward(self, input_ids, attention_mask=None):
        # Get BERT outputs
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        last_hidden_state = outputs.last_hidden_state

        # Mean pooling with attention mask (better than just using CLS token)
        if attention_mask is not None:
            mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
            sum_embeddings = torch.sum(last_hidden_state * mask_expanded, 1)
            sum_mask = torch.clamp(mask_expanded.sum(1), min=1e-9)
            pooled_output = sum_embeddings / sum_mask
        else:
            pooled_output = torch.mean(last_hidden_state, 1)

        # Forward through enhanced classifier
        x = self.dropout1(pooled_output)
        x = F.relu(self.layer_norm1(self.fc1(x)))
        x = self.dropout2(x)
        x = F.relu(self.layer_norm2(self.fc2(x)))
        x = self.dropout3(x)
        logits = self.classifier(x)

        return logits


def preprocess_text(text: str) -> str:
    """Enhanced text preprocessing for Vietnamese medical text"""
    if not isinstance(text, str) or not text.strip():
        return ""
    
    try:
        # Vietnamese word segmentation
        segmented = ViTokenizer.tokenize(text)
        return segmented.strip()
    except Exception as e:
        logger.warning(f"Error in text preprocessing: {e}")
        return text.strip()


def predict_disease(model, tokenizer, label_encoder, text: str, device, max_length: int = 256, top_k: int = 3):
    """Predict disease using the neural model"""
    model.eval()
    processed_text = preprocess_text(text)
    
    if not processed_text:
        raise ValueError("Text is empty after preprocessing")
    
    # Tokenize text
    encoding = tokenizer(
        processed_text,
        add_special_tokens=True,
        max_length=max_length,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt'
    )
    
    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)

    with torch.no_grad():
        logits = model(input_ids, attention_mask)
        probs = F.softmax(logits, dim=1).cpu().numpy()[0]

    # Get top predictions
    top_indices = np.argsort(probs)[::-1][:top_k]
    top_labels = label_encoder.inverse_transform(top_indices)
    top_probs = probs[top_indices]
    
    return top_labels, top_probs, probs


def predict_disease_with_rules(text: str, disease_keywords: dict, label_encoder) -> np.ndarray:
    """Rule-based prediction using keyword matching"""
    input_words = set(preprocess_text(text).lower().split())
    scores = []
    
    for label in label_encoder.classes_:
        keywords = set(disease_keywords.get(label, []))
        if keywords:
            score = len(input_words & keywords) / len(keywords)
        else:
            score = 0.0
        scores.append(score)
    
    return np.array(scores)


def hybrid_predict(model, tokenizer, label_encoder, text: str, device, disease_keywords: dict, 
                  max_length: int = 256, top_k: int = 3, alpha: float = 0.7):
    """Hybrid prediction combining neural model and rule-based approach"""
    # Neural model prediction
    _, _, neural_probs = predict_disease(
        model, tokenizer, label_encoder, text, device, 
        max_length, len(label_encoder.classes_)
    )
    
    # Rule-based prediction
    rule_scores = predict_disease_with_rules(text, disease_keywords, label_encoder)
    
    # Combine predictions with weighted sum
    combined_scores = alpha * neural_probs + (1 - alpha) * rule_scores
    
    # Get top k predictions
    top_indices = np.argsort(combined_scores)[::-1][:top_k]
    top_labels = label_encoder.inverse_transform(top_indices)
    top_scores = combined_scores[top_indices]
    
    return top_labels, top_scores, combined_scores


def beautify_label(label: str) -> str:
    """Convert disease label to natural format"""
    return re.sub(r'_+', ' ', label).strip().title()


# Pydantic models for API
class PredictRequest(BaseModel):
    text: str
    top_k: Optional[int] = 3
    alpha: Optional[float] = 0.7


class DiseasePrediction(BaseModel):
    disease: str
    confidence: float


class PredictResponse(BaseModel):
    predictions: List[DiseasePrediction]
    processing_time: Optional[float] = None


# Global variables
model = None
tokenizer = None
label_encoder = None
disease_keywords = None
device = None


def load_model():
    """Load model and initialize all components"""
    global model, tokenizer, label_encoder, disease_keywords, device
    
    logger.info("Starting model loading...")
    config = Config()

    try:
        # Disease keywords dictionary
        disease_keywords = {
                            'tiêu_chảy': ['da_lạnh', 'khô_da', 'mệt_mỏi', 'phân_có_máu', 'không_có_nước_tiểu', 'đầy_hơi'],
                            'táo_bón': ['vết_nứt_hậu_môn', 'đau_khi_đi_đại_tiện', 'sốt', 'máu_trong_phân', 'chướng_bụng', 'giảm_cân'],
                            'viêm_mũi_họng': ['mắt_ngứa', 'đau', 'đau_khắp_người', 'sốt_nhẹ', 'ho', 'chảy_dịch_mũi_sau'], 
                            'khô_mắt': ['cộm_như_có_hạt_sạn_trong_mắt', 'cảm_giác_khô_rát', 'mắt_bị_đỏ', 'giảm_thị_lực', 'mắt_bị_nóng', 'bị_chảy_nước_mắt'], 
                            'hạ_canxi_máu': ['trầm_cảm', 'rối_loạn_nhịp_tim', 'co_thắt_cơ_(dấu_Trousseau)', 'co_giật', 'rối_loạn_cảm_giác_bàn_tay_bàn_chân', 'chuột_rút'], 
                            'sốt_phát_ban': ['sốt_cao', 'phát_ban', 'viêm_họng', 'hạch_bạch_huyết_sưng_lên', 'chán_ăn', 'sưng_mí_mắt'], 
                            'viêm_xương': ['mạch_đập_nhanh', 'tĩnh_mạch_dưới_da_nổi', 'da_nhợt_nhạt', 'giảm_cơ_năng', 'viêm_khớp_mủ', 'phần_mềm_sưng_nhẹ'], 
                            'viêm_khớp': ['phát_ban', 'đỏ_vùng_da_quanh_khớp', 'viêm_tại_chỗ_khớp', 'đau_khớp', 'khó_thở', 'vận_động_bị_hạn_chế'], 
                            'đau_dạ_dày': ['đầy_hơi', 'hơi_thở_có_mùi_chua', 'đau_âm_ỉ_giữa_bụng', 'nhanh_no', 'hơi_thở_có_mùi_hôi', 'ợ_hơi'], 
                            'viêm_xoang': ['đau_nhức_gò_má', 'chảy_nước_mũi', 'đau_nhức_vùng_trán', 'nghẹt_mũi', 'đau_nhức_thái_dương', 'đau_đầu'], 
                            'viêm_mũi_dị_ứng': ['chảy_nước_mũi', 'đỏ_mắt', 'viêm_họng', 'hắt_xì_liên_tục', 'mệt_mỏi', 'cay_mắt'], 
                            'thiếu_máu': ['da_xanh_xao', 'hoa_mắt', 'ù_tai', 'nhịp_tim_nhanh', 'da_nhợt_nhạt', 'niêm_mạc_xanh_xao'], 
                            'hen_suyễn': ['thở_dốc', 'khó_thở', 'ho', 'rối_loạn_giấc_ngủ', 'thở_nhanh', 'đau_ngực'], 
                            'di_ứng_thực_phẩm': ['sưng_môi', 'chóng_mặt', 'sưng_mặt', 'ngứa_ran_trong_miệng', 'choáng_váng', 'thở_khò_khè'], 
                            'dị_ứng_thời_tiết': ['ngứa_khi_thời_tiết_nóng_hoặc_lạnh', 'sổ_mũi', 'nổi_mề_đay', 'da_bị_sưng_rộp', 'khó_thở', 'đau_đầu'], 
                            'trĩ': ['cảm_giác_có_khối_lồi_hoặc_búi_trĩ_thò_ra', 'khối_trĩ_nhạy_cảm', 'khó_chịu_hậu_môn', 'đau_hậu_môn', 'chảy_máu_khi_đại_tiện', 'đau_khi_sờ_vào'], 
                            'cảm_cúm': ['sốt_trên_38_độ_C', 'mệt_mỏi', 'viêm_họng', 'đau_cơ_bắp', 'đau_đầu', 'ớn_lạnh'], 
                            'viêm_dạ_dày': ['ợ_chua', 'đau_bụng_vùng_thượng_vị', 'chán_ăn', 'mệt_mỏi', 'buồn_nôn'], 
                            'căng_cơ': ['sưng_tấy', 'bầm_tím', 'vùng_cơ_bị_tổn_thương', 'đau_khi_nghỉ_ngơi', 'cơ_bắp_bị_căng_cứng', 'đau_khi_không_vận_động'], 
                            'tắc_ruột': ['chướng_bụng', 'buồn_nôn', 'đau_bụng_từng_cơn', 'mệt_mỏi', 'đau_bụng_dữ_dội', 'nôn_mửa'], 
                            'viêm_gan_b': ['chán_ăn', 'ăn_mất_ngon', 'sốt', 'mệt_mỏi', 'buồn_nôn', 'vàng_da'], 
                            'viêm_phế_quản': ['mệt_mỏi', 'sốt_nhẹ', 'chảy_nước_mũi', 'nghẹt_mũi', 'tắc_nghẽn_vùng_ngực', 'ho_có_đờm'], 
                            'viêm_phổi': ['mệt_mỏi', 'ớn_lạnh', 'ho_có_đờm', 'sốt', 'khó_thở', 'buồn_nôn'], 
                            'viêm_gan_c': ['buồn_nôn', 'nôn_mửa', 'vàng_mắt', 'phù_chân', 'nôn_ra_máu', 'phân_đen'], 
                            'thoái_hoá_cột_sống_lưng': ['đau_âm_ỉ_ở_lưng', 'mất_thăng_bằng', 'sự_phối_hợp_tay_và_chân_kém', 'đau_vùng_gáy', 'tê_căng_tay', 'tê_ngón_tay'], 
                            'thoái_hoá_cột_sống_cổ': ['yếu_cơ', 'ngứa_ran', 'tê_nhức_vai', 'tê_nhức_cánh_tay', 'mất_thăng_bằng', 'đau_xương_bả_vai'], 
                            'sỏi_thận': ['buồn_nôn', 'đau_quặn_thận', 'đau_quằn_quại_ở_thận', 'tiểu_ra_máu', 'tắc_nghẽn_đường_tiểu', 'bí_tiểu'], 
                            'đột_quỵ': ['khó_cầm_nắm', 'nhắc_chân_không_lên', 'nói_đớ', 'không_nói_thành_lời', 'lẫn_lộn', 'mê_sảng'], 
                            'đau_thắt_ngực': ['choáng_váng', 'đổ_mồ_hôi', 'buồn_nôn', 'khó_thở', 'đau_dữ_dội_ở_ngực', 'ngất_xỉu'], 
                            'say_nắng': ['da_nóng', 'đổ_mồ_hôi', 'buồn_nôn', 'choáng_váng', 'da_khô', 'nôn_mửa']
                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
        # Initialize label encoder
        label_encoder = LabelEncoder()
        label_encoder.fit(list(disease_keywords.keys()))
        logger.info(f"Label encoder fitted with {len(label_encoder.classes_)} classes")

        # Download and load model from Hugging Face
        logger.info("Downloading model from Hugging Face...")
        from huggingface_hub import hf_hub_download

        model_path = hf_hub_download(
            repo_id="PhuQuy23/ViHealthBERTRuleBased",
            filename="best_disease_model.pth"
        )

        # Load tokenizer and base model
        logger.info("Loading tokenizer and base model...")
        tokenizer = AutoTokenizer.from_pretrained(config.model_name)
        vihealthbert = AutoModel.from_pretrained(config.model_name)

        # Create enhanced model
        model = EnhancedDiseaseClassifier(vihealthbert, len(label_encoder.classes_), config)

        # Load trained weights
        logger.info("Loading trained weights...")
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        checkpoint = torch.load(model_path, map_location=device)
        model.load_state_dict(checkpoint)
        model.to(device)
        model.eval()

        logger.info(f"Model loaded successfully on device: {device}")

    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise e


# Initialize FastAPI app
app = FastAPI(
    title="ViHealthBERT Disease Prediction API",
    description="API for predicting diseases from Vietnamese medical text using hybrid approach",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)


@app.on_event("startup")
async def startup_event():
    """Load model on startup"""
    try:
        load_model()
        logger.info("API started successfully!")
    except Exception as e:
        logger.error(f"Failed to start API: {e}")
        raise


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "ViHealthBERT Disease Prediction API",
        "status": "running",
        "version": "2.0.0",
        "model": "PhuQuy23/ViHealthBERTRuleBased",
        "base_model": "demdecuong/vihealthbert-base-word",
        "endpoints": {
            "predict": "/predict",
            "health": "/health",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "tokenizer_loaded": tokenizer is not None,
        "label_encoder_loaded": label_encoder is not None,
        "device": str(device) if device else None,
        "num_classes": len(label_encoder.classes_) if label_encoder else 0
    }


@app.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    """Predict disease from Vietnamese medical text symptoms"""
    import time
    start_time = time.time()
    
    try:
        # Validate model is loaded
        if not all([model, tokenizer, label_encoder, disease_keywords]):
            raise HTTPException(status_code=500, detail="Model components not fully loaded")

        # Validate input
        text = request.text.strip()
        if not text:
            raise HTTPException(status_code=400, detail="Input text cannot be empty")

        if len(text) > 1000:
            raise HTTPException(status_code=400, detail="Input text too long (max 1000 characters)")

        # Validate parameters
        top_k = min(max(request.top_k, 1), len(label_encoder.classes_))
        # alpha = max(0.0, min(request.alpha, 1.0))
        alpha = 0.9

        # Make prediction
        top_labels, top_scores, _ = hybrid_predict(
            model=model,
            tokenizer=tokenizer,
            label_encoder=label_encoder,
            text=text,
            device=device,
            disease_keywords=disease_keywords,
            max_length=Config.max_length,
            top_k=top_k,
            alpha=alpha
        )

        # Format predictions
        predictions = [
            DiseasePrediction(
                disease=beautify_label(label),
                confidence=round(float(score), 4)
            )
            for label, score in zip(top_labels, top_scores)
        ]

        processing_time = round(time.time() - start_time, 3)

        return PredictResponse(
            predictions=predictions,
            processing_time=processing_time
        )

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/diseases")
async def list_diseases():
    """Get list of all supported diseases"""
    if not label_encoder:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    diseases = [beautify_label(disease) for disease in label_encoder.classes_]
    return {
        "total_diseases": len(diseases),
        "diseases": sorted(diseases)
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

