const typeEnum = {
  SPECIALTY_INTERNAL: "Chuyên khoa nội khoa",
  SPECIALTY_SURGERY: "Chuyên khoa ngoại khoa",
  SPECIALTY_OBS_PED_GERI: "Chuyên khoa sản - nhi - lão",
  SPECIALTY_OTHERS: "Chuyên khoa chuyên biệt khác",
  SPECIALTY_LAB: "Chuyên khoa ngành cận lâm sàn",
  SPECIALTY_PREVENTIVE: "Y học dự phòng và quản lý hệ thống y tế",
} as const;
const internalEnum = {
  GENERAL_INTERNAL: "Nội tổng quát",
  CARDIOLOGY: "Nội tim mạch",
  PULMONOLOGY: "Nội hô hấp",
  GASTROENTEROLOGY: "Nội tiêu hóa",
  NEUROLOGY: "Nội thần kinh",
  ENDOCRINOLOGY_DIABETES: "Nội tiết - Đái tháo đường",
  HEMATOLOGY: "Huyết học",
  NEPHROLOGY: "Thận - Tiết niệu",
  IMMUNOLOGY: "Dị ứng - Miễn dịch",
  RHEUMATOLOGY: "Cơ xương khớp",
} as const;
const surgeryEnum = {
  GENERAL_SURGERY: "Ngoại tổng quát",
  NEUROSURGERY: "Ngoại thần kinh",
  CARDIOTHORACIC_SURGERY: "Ngoại tim mạch",
  UROLOGY: "Ngoại tiết niệu",
  ORTHOPEDIC_SURGERY: "Ngoại chấn thương chỉnh hình",
  GI_SURGERY: "Ngoại tiêu hóa",
  THORACIC_SURGERY: "Phẫu thuật lồng ngực",
  VASCULAR_SURGERY: "Phẫu thuật mạch máu",
  PEDIATRIC_SURGERY: "Ngoại nhi",
} as const;
const opgEnum = {
  OBSTETRICS_GYNECOLOGY: "Sản phụ khoa",
  REPRODUCTIVE_MEDICINE: "Hiếm muộn / Hỗ trợ sinh sản",
  PEDIATRICS: "Nhi khoa",
  NEONATOLOGY: "Nhi sơ sinh",
  GERIATRICS: "Lão khoa",
} as const;
const othersEnum = {
  DERMATOLOGY: "Da liễu",
  ENT: "Tai Mũi Họng",
  OPHTHALMOLOGY: "Mắt",
  DENTOMAXILLOFACIAL: "Răng - Hàm - Mặt",
  ONCOLOGY: "Ung bướu",
  TRADITIONAL_MEDICINE: "Y học cổ truyền",
  REHABILITATION: "Phục hồi chức năng",
  NUCLEAR_MEDICINE: "Y học hạt nhân",
  ANESTHESIA_CRITICAL_CARE: "Gây mê - Hồi sức",
  TOXICOLOGY: "Chống độc",
  PSYCHIATRY: "Tâm thần",
  CLINICAL_PSYCHOLOGY: "Tâm lý lâm sàng",
  FORENSIC_MEDICINE: "Pháp y",
  ENDOSCOPY: "Nội soi",
  EMERGENCY_CARE: "Hồi sức cấp cứu",
} as const;
const labEnum = {
  RADIOLOGY: "Chẩn đoán hình ảnh",
  LABORATORY_MEDICINE: "Xét nghiệm",
  PATHOLOGY: "Giải phẫu bệnh",
  MICROBIOLOGY: "Vi sinh",
  MOLECULAR_MEDICINE: "Sinh học phân tử y học",
  PUBLIC_HEALTH: "Y tế công cộng",
  EPIDEMIOLOGY: "Dịch tễ học",
  CLINICAL_NUTRITION: "Dinh dưỡng lâm sàng",
} as const;
const preventiveEnum = {
  PREVENTIVE_MEDICINE: "Y học dự phòng",
  HEALTH_ADMINISTRATION: "Quản lý y tế",
  BIOMEDICAL_ENGINEERING: "Công nghệ y sinh",
} as const;
export type typeEnum = keyof typeof typeEnum;
export type internalEnum = keyof typeof internalEnum;
export type surgeryEnum = keyof typeof surgeryEnum;
export type opgEnum = keyof typeof opgEnum;
export type othersEnum = keyof typeof othersEnum;
export type labEnum = keyof typeof labEnum;
export type preventiveEnum = keyof typeof preventiveEnum;
