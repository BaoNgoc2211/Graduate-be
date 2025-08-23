# Disease Prediction API với Database Integration

## Tổng quan
API này cung cấp các endpoint để dự đoán bệnh từ triệu chứng với dữ liệu được lấy từ database MongoDB, kết hợp với mô hình AI từ FastAPI service.

## Các Endpoint chính

### 1. Dự đoán bệnh với dữ liệu từ Database
**POST** `/api/disease-prediction/predict-with-database`

Dự đoán bệnh từ triệu chứng và trả về thông tin chi tiết từ database.

**Request Body:**
```json
{
  "text": "Tôi bị sốt cao, ho, đau họng",
  "top_k": 3,
  "alpha": 0.7
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Dự đoán bệnh thành công",
  "data": {
    "predictions": [
      {
        "disease": "viêm_mũi_họng",
        "confidence": 0.85,
        "diseaseData": {
          "_id": "...",
          "name": "Viêm mũi họng",
          "code": "J00",
          "causes": "Do virus hoặc vi khuẩn",
          "diagnosis": "Khám lâm sàng, xét nghiệm",
          "prevention": "Vệ sinh mũi họng, tránh lạnh",
          "severityLevel": "nhẹ",
          "treatmentPlan": "Thuốc kháng sinh, thuốc ho",
          "symptomIds": [...],
          "diseaseCategoryIds": [...],
          "diseaseUsageGroupIds": [...]
        }
      }
    ],
    "processing_time": 0.5,
    "total_diseases_found": 1
  }
}
```

### 2. Lấy danh sách bệnh từ Database
**GET** `/api/disease-prediction/diseases-from-database`

Lấy danh sách tất cả các bệnh có trong database với phân trang.

**Query Parameters:**
- `page`: Số trang (mặc định: 1)
- `limit`: Số lượng item mỗi trang (mặc định: 50)

**Response:**
```json
{
  "status": 200,
  "message": "Lấy danh sách bệnh từ database thành công",
  "data": {
    "total_diseases": 150,
    "diseases": [
      {
        "_id": "...",
        "name": "Viêm mũi họng",
        "code": "J00",
        "causes": "Do virus hoặc vi khuẩn",
        "diagnosis": "Khám lâm sàng, xét nghiệm",
        "prevention": "Vệ sinh mũi họng, tránh lạnh",
        "severityLevel": "nhẹ",
        "treatmentPlan": "Thuốc kháng sinh, thuốc ho",
        "symptomIds": [...],
        "diseaseCategoryIds": [...],
        "diseaseUsageGroupIds": [...]
      }
    ],
    "currentPage": 1,
    "totalPages": 3
  }
}
```

### 3. Tìm bệnh theo triệu chứng từ Database
**POST** `/api/disease-prediction/find-by-symptoms`

Tìm các bệnh có triệu chứng tương ứng trong database.

**Request Body:**
```json
{
  "symptoms": "sốt, ho, đau họng"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Tìm bệnh theo triệu chứng thành công",
  "data": {
    "symptoms_found": ["sốt", "ho", "đau họng"],
    "diseases": [
      {
        "_id": "...",
        "name": "Viêm mũi họng",
        "code": "J00",
        "causes": "Do virus hoặc vi khuẩn",
        "diagnosis": "Khám lâm sàng, xét nghiệm",
        "prevention": "Vệ sinh mũi họng, tránh lạnh",
        "severityLevel": "nhẹ",
        "treatmentPlan": "Thuốc kháng sinh, thuốc ho",
        "symptomIds": [...],
        "diseaseCategoryIds": [...],
        "diseaseUsageGroupIds": [...]
      }
    ],
    "total_diseases": 1
  }
}
```

### 4. Lấy chi tiết bệnh từ Database
**GET** `/api/disease-prediction/disease-detail/:id`

Lấy thông tin chi tiết của một bệnh cụ thể.

**Response:**
```json
{
  "status": 200,
  "message": "Lấy chi tiết bệnh thành công",
  "data": {
    "_id": "...",
    "name": "Viêm mũi họng",
    "code": "J00",
    "nameDiff": "Cảm lạnh",
    "image": "https://example.com/image.jpg",
    "common": "Bệnh phổ biến ở mọi lứa tuổi",
    "riskGroup": ["trẻ_em", "người_già"],
    "causes": "Do virus hoặc vi khuẩn",
    "diagnosis": "Khám lâm sàng, xét nghiệm",
    "prevention": "Vệ sinh mũi họng, tránh lạnh",
    "severityLevel": "nhẹ",
    "treatmentPlan": "Thuốc kháng sinh, thuốc ho",
    "notes": "Cần nghỉ ngơi đầy đủ",
    "status": "active",
    "symptomIds": [
      {
        "_id": "...",
        "name": "Sốt"
      }
    ],
    "diseaseCategoryIds": [
      {
        "_id": "...",
        "name": "Bệnh đường hô hấp"
      }
    ],
    "diseaseUsageGroupIds": [
      {
        "_id": "...",
        "name": "Người lớn"
      }
    ]
  }
}
```

## Các Endpoint phụ trợ

### 5. Kiểm tra trạng thái dịch vụ
**GET** `/api/disease-prediction/health`

### 6. Test kết nối
**GET** `/api/disease-prediction/test`

### 7. Lấy danh sách bệnh từ FastAPI (cũ)
**GET** `/api/disease-prediction/diseases`

### 8. Dự đoán bệnh từ FastAPI (cũ)
**POST** `/api/disease-prediction/predict`

## Lưu ý

1. **Authentication**: Tất cả các endpoint đều yêu cầu authentication (trừ `/health`, `/test`).

2. **Database Integration**: Các endpoint mới sẽ tự động tìm kiếm và bổ sung thông tin từ database MongoDB.

3. **Fallback**: Nếu FastAPI service không khả dụng, các endpoint vẫn có thể hoạt động với dữ liệu từ database.

4. **Performance**: Dữ liệu được populate tự động để giảm số lượng query.

5. **Error Handling**: Tất cả các lỗi đều được xử lý và trả về thông báo rõ ràng bằng tiếng Việt.

## Cấu trúc Database

### Disease Collection
- `name`: Tên bệnh
- `code`: Mã bệnh (ICD-10)
- `nameDiff`: Tên khác của bệnh
- `causes`: Nguyên nhân
- `diagnosis`: Chẩn đoán
- `prevention`: Phòng ngừa
- `severityLevel`: Mức độ nghiêm trọng
- `treatmentPlan`: Kế hoạch điều trị
- `symptomIds`: Danh sách ID triệu chứng
- `diseaseCategoryIds`: Danh sách ID danh mục bệnh
- `diseaseUsageGroupIds`: Danh sách ID nhóm sử dụng

### Symptom Collection
- `name`: Tên triệu chứng
- `kindOf`: Loại triệu chứng
- `symptomGroup`: Nhóm triệu chứng
